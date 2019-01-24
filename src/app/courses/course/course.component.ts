import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core'
import { FormControl } from '@angular/forms'
import { MatPaginator, MatSort, PageEvent } from '@angular/material'
import { ActivatedRoute } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { combineLatest, Observable, Subject } from 'rxjs'
import {
  debounceTime,
  distinctUntilChanged,
  map,
  mergeMap,
  startWith,
  takeUntil,
  tap
} from 'rxjs/operators'
import { AppState } from '../../store'
import { Course } from '../model/course'
import { LessonsDataSource } from '../services/lessons.datasource'
import { NeedLessonsAction } from '../store/actions/lessons.action'
import { getAllLessons, getLessonsIsLoading } from '../store/selectors/lessons.selector'

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent implements OnInit, AfterViewInit, OnDestroy {
  kill$: Subject<any> = new Subject()
  loading$: Observable<boolean>

  course: Course
  dataSource: LessonsDataSource
  displayedColumns = ['seqNo', 'description', 'duration']
  courseId: number
  filter = new FormControl('')

  @ViewChild('paginator') paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit() {
    this.loading$ = this.store.pipe(select(getLessonsIsLoading))
    this.course = this.route.snapshot.data['course']
    this.courseId = this.course.id

    this.store.dispatch(new NeedLessonsAction({ id: this.courseId }))
    this.dataSource = new LessonsDataSource(this.store)
  }

  ngAfterViewInit() {
    // ReLoad lessons when one of these state changes
    // 1. lessons state changes
    // 2. page state changes
    // 3. sort state changes
    // 4. filter string changes
    combineLatest(
      this.store.pipe(select(getAllLessons(this.courseId))),
      this.paginator.page.pipe(startWith({ pageIndex: 0, pageSize: 5 } as PageEvent)),
      this.sort.sortChange.pipe(
        startWith({ direction: 'asc' }),
        map(sort => sort.direction),
        // reset pageIndex to first page when sorting
        tap(() => (this.paginator.pageIndex = 0))
      ),
      this.filter.valueChanges.pipe(
        startWith(''),
        debounceTime(200),
        distinctUntilChanged(),
        map((filter: string) => filter.toLowerCase()),
        // reset pageIndex to first page when filtering
        tap(() => (this.paginator.pageIndex = 0))
      )
    )
      .pipe(
        mergeMap(([lessons, page, direction, filter]) =>
          this.dataSource.loadLessons(
            this.courseId,
            filter,
            direction,
            this.paginator.pageIndex,
            this.paginator.pageSize,
            this.course.lessonsCount
          )
        ),
        takeUntil(this.kill$)
      )
      .subscribe()
  }

  ngOnDestroy(): void {
    this.kill$.next()
    this.kill$.complete()
  }
}

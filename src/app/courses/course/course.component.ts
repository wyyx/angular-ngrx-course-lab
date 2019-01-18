import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { MatPaginator, MatTableDataSource } from '@angular/material'
import { Course } from '../model/course'
import { CoursesService } from '../services/courses.service'
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay,
  takeUntil
} from 'rxjs/operators'
import { merge, fromEvent, Observable, Subject } from 'rxjs'
import { LessonsDataSource } from '../services/lessons.datasource'
import { Store } from '@ngrx/store'
import { AppState } from '../../store'
import { getCourseById } from '../store/selectors/courses.selectors'
import { LoadCourseAction } from '../store/actions/courses.actions'

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit, OnDestroy {
  course: Course = null
  dataSource: LessonsDataSource
  displayedColumns = ['seqNo', 'description', 'duration']
  courseId: number

  kill$: Subject<any> = new Subject()

  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.courseId = parseInt(this.route.snapshot.paramMap.get('id'))

    this.store
      .select(getCourseById(this.courseId))
      .pipe(takeUntil(this.kill$))
      .subscribe((course) => (this.course = course))

    this.store.dispatch(new LoadCourseAction({ id: this.courseId }))

    this.dataSource = new LessonsDataSource(this.coursesService)
    this.dataSource.loadLessons(this.courseId, 0, 3)
  }

  ngOnDestroy(): void {
    this.kill$.next()
    this.kill$.complete()
  }

  ngAfterViewInit() {
    this.paginator.page.pipe(tap(() => this.loadLessonsPage())).subscribe()
  }

  loadLessonsPage() {
    this.dataSource.loadLessons(this.courseId, this.paginator.pageIndex, this.paginator.pageSize)
  }
}

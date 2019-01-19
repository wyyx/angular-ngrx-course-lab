import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material'
import { ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'
import { Subject, Observable } from 'rxjs'
import { takeUntil, tap } from 'rxjs/operators'
import { AppState } from '../../store'
import { Course } from '../model/course'
import { CoursesService } from '../services/courses.service'
import { LessonsDataSource } from '../services/lessons.datasource'
import { LoadCourseAction } from '../store/actions/courses.actions'
import { getCourseById } from '../store/selectors/courses.selectors'

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit, OnDestroy {
  course$: Observable<Course>
  dataSource: LessonsDataSource
  displayedColumns = ['seqNo', 'description', 'duration']
  courseId: number

  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.courseId = parseInt(this.route.snapshot.paramMap.get('id'))
    this.course$ = this.store.select(getCourseById(this.courseId))
    this.store.dispatch(new LoadCourseAction({ id: this.courseId }))

    this.dataSource = new LessonsDataSource(this.coursesService)
    this.dataSource.loadLessons(this.courseId, 0, 3)
  }

  ngOnDestroy(): void {}

  ngAfterViewInit() {
    this.paginator.page.pipe(tap(() => this.loadLessonsPage())).subscribe()
  }

  loadLessonsPage() {
    this.dataSource.loadLessons(this.courseId, this.paginator.pageIndex, this.paginator.pageSize)
  }
}

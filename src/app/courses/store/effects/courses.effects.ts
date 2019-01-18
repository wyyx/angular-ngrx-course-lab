import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { catchError, map, mergeMap, tap } from 'rxjs/operators'
import { CoursesService } from '../../services/courses.service'
import { AppState } from '../../../store'
import {
  CoursesActions,
  CoursesActionTypes,
  LoadCourseAction,
  LoadCourseSuccessAction,
  CourseLoadedAction,
  LoadCourseFailAction,
  LoadCourseListAction,
  CourseListLoadedAction,
  LoadCourseListSuccessAction,
  LoadCourseListFailAction
} from '../actions/courses.actions'
import { getCourseLoading, getCourseListLoaded } from '../selectors/courses.selectors'

@Injectable()
export class CoursesEffects {
  @Effect()
  loadCourse$: Observable<CoursesActions> = this.actions$.pipe(
    ofType(CoursesActionTypes.LOAD_COURSE),
    mergeMap((action: LoadCourseAction) =>
      this.store
        .select(getCourseLoading(action.payload.id))
        .pipe(
          mergeMap(
            (loaded): Observable<CoursesActions> =>
              loaded
                ? of(new CourseLoadedAction())
                : this.coursesService
                    .findCourseById(action.payload.id)
                    .pipe(map((course) => new LoadCourseSuccessAction(course)))
          )
        )
    ),
    catchError(() => of(new LoadCourseFailAction()))
  )

  @Effect()
  loadCourseList$: Observable<CoursesActions> = this.actions$.pipe(
    ofType(CoursesActionTypes.LOAD_COURSE_LIST),
    mergeMap((action: LoadCourseListAction) =>
      this.store.select(getCourseListLoaded).pipe(
        tap((a) => console.log(a)),
        mergeMap(
          (loaded): Observable<CoursesActions> =>
            loaded
              ? of(new CourseListLoadedAction())
              : this.coursesService
                  .findAllCourses()
                  .pipe(map((courses) => new LoadCourseListSuccessAction(courses)))
        )
      )
    ),
    catchError(() => of(new LoadCourseListFailAction()))
  )

  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private store: Store<AppState>
  ) {}
}

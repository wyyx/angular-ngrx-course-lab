import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { UpdateNum } from '@ngrx/entity/src/models'
import { Store, select } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { catchError, map, mapTo, mergeMap, mergeMapTo, filter, tap } from 'rxjs/operators'
import { AppState } from '../../../store'
import { Course } from '../../model/course'
import { CoursesService } from '../../services/courses.service'
import {
  CoursesActions,
  CoursesActionTypes,
  LoadAllCoursesFailAction,
  LoadAllCoursesSuccessAction,
  LoadCourseAction,
  LoadCourseFailAction,
  LoadCourseSuccessAction,
  UpdateCourseAction,
  UpdateCourseFailAction,
  UpdateCourseSuccessAction,
  NeedOneCourseAction,
  LoadAllCoursesAction
} from '../actions/courses.actions'
import { getCourseIsLoaded, getAllCoursesIsLoaded } from '../selectors/courses.selectors'

@Injectable()
export class CoursesEffects {
  @Effect()
  needCourse$: Observable<CoursesActions> = this.actions$.pipe(
    ofType(CoursesActionTypes.NEED_COURSE),
    map((action: NeedOneCourseAction) => action.payload.id),
    mergeMap(id =>
      this.store.pipe(select(getCourseIsLoaded(id))).pipe(
        filter(loaded => !loaded),
        tap(() => this.store.dispatch(new LoadCourseAction({ id }))),
        mergeMapTo(
          this.coursesService.findCourseById(id).pipe(
            map(course => new LoadCourseSuccessAction(course)),
            catchError(() => of(new LoadCourseFailAction()))
          )
        )
      )
    )
  )

  @Effect()
  needAllCourses$: Observable<CoursesActions> = this.actions$.pipe(
    ofType(CoursesActionTypes.NEED_ALL_COURSES),
    mergeMapTo(this.store.pipe(select(getAllCoursesIsLoaded))),
    filter(loaded => !loaded),
    tap(() => this.store.dispatch(new LoadAllCoursesAction())),
    mergeMapTo(
      this.coursesService.findAllCourses().pipe(
        map(courses => new LoadAllCoursesSuccessAction(courses)),
        catchError(() => of(new LoadAllCoursesFailAction()))
      )
    )
  )

  @Effect()
  updateCourse$: Observable<CoursesActions> = this.actions$.pipe(
    ofType(CoursesActionTypes.UPDATE_COURSE),
    map((action: UpdateCourseAction) => action.payload),
    mergeMap(({ id, changes }: UpdateNum<Course>) =>
      this.coursesService.saveCourse(id, changes).pipe(
        mapTo(new UpdateCourseSuccessAction({ id, changes })),
        catchError(() => of(new UpdateCourseFailAction()))
      )
    )
  )

  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private store: Store<AppState>
  ) {}
}

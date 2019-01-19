import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import {
  catchError,
  map,
  mergeMap,
  tap,
  filter,
  mergeMapTo,
  withLatestFrom,
  mapTo
} from 'rxjs/operators'
import { CoursesService } from '../../services/courses.service'
import { AppState } from '../../../store'
import {
  CoursesActions,
  CoursesActionTypes,
  LoadCourseAction,
  LoadCourseSuccessAction,
  LoadAllCoursesSuccessAction,
  LoadAllCoursesFailAction,
  LoadCourseFailAction,
  UpdateCourseAction,
  UpdateCourseSuccessAction,
  UpdateCourseFailAction
} from '../actions/courses.actions'
import { getCourseIsLoaded, getAllCoursesIsLoaded } from '../selectors/courses.selectors'
import { Update } from '@ngrx/entity'
import { Course } from '../../model/course'
import { UpdateNum } from '@ngrx/entity/src/models'

@Injectable()
export class CoursesEffects {
  @Effect()
  loadCourse$: Observable<CoursesActions> = this.actions$.pipe(
    ofType(CoursesActionTypes.LOAD_COURSE),
    mergeMap((action: LoadCourseAction) =>
      this.store.select(getCourseIsLoaded(action.payload.id)).pipe(
        filter((loaded) => !loaded),
        mergeMapTo(this.coursesService.findCourseById(action.payload.id)),
        map((course) => new LoadCourseSuccessAction(course))
      )
    ),
    catchError(() => of(new LoadCourseFailAction()))
  )

  @Effect()
  loadAllCourses$: Observable<CoursesActions> = this.actions$.pipe(
    ofType(CoursesActionTypes.LOAD_ALL_COURSES),
    withLatestFrom(this.store.select(getAllCoursesIsLoaded)),
    filter(([action, loaded]) => !loaded),
    mergeMapTo(this.coursesService.findAllCourses()),
    map((courses) => new LoadAllCoursesSuccessAction(courses)),
    catchError(() => of(new LoadAllCoursesFailAction()))
  )

  @Effect()
  updateCourse$: Observable<CoursesActions> = this.actions$.pipe(
    ofType(CoursesActionTypes.UPDATE_COURSE),
    map((action: UpdateCourseAction) => action.payload),
    mergeMap(({ id, changes }: UpdateNum<Course>) =>
      this.coursesService
        .saveCourse(id, changes)
        .pipe(mapTo(new UpdateCourseSuccessAction({ id, changes })))
    ),
    catchError(() => of(new UpdateCourseFailAction()))
  )

  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private store: Store<AppState>
  ) {}
}

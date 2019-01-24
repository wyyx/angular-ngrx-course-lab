import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { UpdateNum } from '@ngrx/entity/src/models'
import { Store } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { catchError, map, mapTo, mergeMap, mergeMapTo } from 'rxjs/operators'
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
  UpdateCourseSuccessAction
} from '../actions/courses.actions'

@Injectable()
export class CoursesEffects {
  @Effect()
  loadCourse$: Observable<CoursesActions> = this.actions$.pipe(
    ofType(CoursesActionTypes.LOAD_COURSE),
    map((action: LoadCourseAction) => action.payload.id),
    mergeMap(id =>
      this.coursesService.findCourseById(id).pipe(
        map(course => new LoadCourseSuccessAction(course)),
        catchError(() => of(new LoadCourseFailAction()))
      )
    )
  )

  @Effect()
  loadAllCourses$: Observable<CoursesActions> = this.actions$.pipe(
    ofType(CoursesActionTypes.LOAD_ALL_COURSES),
    mergeMapTo(this.coursesService.findAllCourses()),
    map(courses => new LoadAllCoursesSuccessAction(courses)),
    catchError(() => of(new LoadAllCoursesFailAction()))
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

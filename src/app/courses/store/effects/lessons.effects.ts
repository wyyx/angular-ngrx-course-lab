import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Store, select } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { catchError, filter, map, mergeMap, mergeMapTo, tap, mapTo } from 'rxjs/operators'
import { AppState } from '../../../store'
import { CoursesService } from '../../services/courses.service'
import {
  LessonsActions,
  LessonsActionTypes,
  LoadLessonsFailAction,
  LoadLessonsSuccessAction,
  LoadLessonsAction,
  NeedLessonsAction
} from '../actions/lessons.action'
import { getLessonsIsLoaded } from '../selectors/lessons.selector'

@Injectable()
export class LessonsEffects {
  @Effect()
  needLessons$: Observable<LessonsActions> = this.actions$.pipe(
    ofType(LessonsActionTypes.NEED_LESSONS),
    map((action: NeedLessonsAction) => action.payload.id),
    mergeMap(courseId =>
      this.store.pipe(
        select(getLessonsIsLoaded(courseId)),
        filter(loaded => !loaded),
        tap(() => this.store.dispatch(new LoadLessonsAction({ id: courseId }))),
        mergeMapTo(
          this.coursesService.findAllCourseLessons(courseId).pipe(
            map(lessons => new LoadLessonsSuccessAction({ courseId: courseId, lessons })),
            catchError(() => of(new LoadLessonsFailAction()))
          )
        )
      )
    )
  )

  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private store: Store<AppState>
  ) {}
}

import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { catchError, filter, map, mergeMap, mergeMapTo, tap } from 'rxjs/operators'
import { AppState } from '../../../store'
import { CoursesService } from '../../services/courses.service'
import {
  LessonsActions,
  LessonsActionTypes,
  LoadLessonsFailAction,
  LoadLessonsSuccessAction,
  LoadLessonsAction
} from '../actions/lessons.action'
import { getLessonsIsLoaded } from '../selectors/lessons.selector'

@Injectable()
export class LessonsEffects {
  @Effect()
  loadLessons$: Observable<LessonsActions> = this.actions$.pipe(
    ofType(LessonsActionTypes.LOAD_LESSONS),
    map((action: LoadLessonsAction) => action.payload.id),
    mergeMap(courseId =>
      this.coursesService.findAllCourseLessons(courseId).pipe(
        map(lessons => new LoadLessonsSuccessAction({ id: courseId, lessons })),
        catchError(() => of(new LoadLessonsFailAction()))
      )
    )
  )

  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private store: Store<AppState>
  ) {}
}

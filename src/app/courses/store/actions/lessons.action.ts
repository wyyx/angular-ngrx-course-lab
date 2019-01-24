import { Action } from '@ngrx/store'
import { LessonsContainer } from '../reducers/lessons.reducer'
import { Update } from '@ngrx/entity'

export interface PageQuery {
  pageIndex: number
  pageSize: number
}

export enum LessonsActionTypes {
  // load lessons of one course
  NEED_LESSONS = '[Course] need lessons',
  LOAD_LESSONS = '[Courses] load lessons',
  LOAD_LESSONS_SUCCESS = '[Courses] load lessons success',
  LOAD_LESSONS_FAIL = '[Courses] load lessons fail'
}

export class NeedLessonsAction implements Action {
  readonly type = LessonsActionTypes.NEED_LESSONS

  constructor(public payload: { id: number }) {}
}

export class LoadLessonsAction implements Action {
  readonly type = LessonsActionTypes.LOAD_LESSONS

  constructor(public payload: { id: number }) {}
}

export class LoadLessonsSuccessAction implements Action {
  readonly type = LessonsActionTypes.LOAD_LESSONS_SUCCESS

  constructor(public payload: LessonsContainer) {}
}

export class LoadLessonsFailAction implements Action {
  readonly type = LessonsActionTypes.LOAD_LESSONS_FAIL

  constructor() {}
}

export type LessonsActions =
  | LoadLessonsAction
  | LoadLessonsSuccessAction
  | LoadLessonsFailAction
  | NeedLessonsAction

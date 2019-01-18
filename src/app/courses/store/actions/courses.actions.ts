import { Action } from '@ngrx/store'
import { Course } from '../../model/course'

export enum CoursesActionTypes {
  // course action types
  LOAD_COURSE = '[Courses] load course',
  LOAD_COURSE_SUCCESS = '[Courses] load course success',
  LOAD_COURSE_FAIL = '[Courses] load course fail',
  COURSE_LOADED = '[Courses] course loaded',
  // courses action types
  LOAD_COURSE_LIST = '[Courses] load course-list',
  LOAD_COURSE_LIST_SUCCESS = '[Courses] load course-list success',
  LOAD_COURSE_LIST_FAIL = '[Courses] load course-list fail',
  COURSE_LIST_LOADED = '[Courses] course-list loaded'
}

// course actions
export class LoadCourseAction implements Action {
  readonly type = CoursesActionTypes.LOAD_COURSE

  constructor(public payload: { id: number }) {}
}

export class LoadCourseSuccessAction implements Action {
  readonly type = CoursesActionTypes.LOAD_COURSE_SUCCESS

  constructor(public payload: Course) {}
}

export class LoadCourseFailAction implements Action {
  readonly type = CoursesActionTypes.LOAD_COURSE_FAIL

  constructor() {}
}

export class CourseLoadedAction implements Action {
  readonly type = CoursesActionTypes.COURSE_LOADED
}

// courses actions
export class LoadCourseListAction implements Action {
  readonly type = CoursesActionTypes.LOAD_COURSE_LIST

  constructor() {}
}

export class LoadCourseListSuccessAction implements Action {
  readonly type = CoursesActionTypes.LOAD_COURSE_LIST_SUCCESS

  constructor(public payload: Course[]) {}
}

export class LoadCourseListFailAction implements Action {
  readonly type = CoursesActionTypes.LOAD_COURSE_LIST_FAIL

  constructor() {}
}

export class CourseListLoadedAction implements Action {
  readonly type = CoursesActionTypes.COURSE_LIST_LOADED
}

export type CoursesActions =
  | LoadCourseAction
  | LoadCourseSuccessAction
  | LoadCourseFailAction
  | CourseLoadedAction
  | LoadCourseListAction
  | LoadCourseListSuccessAction
  | LoadCourseListFailAction
  | CourseListLoadedAction

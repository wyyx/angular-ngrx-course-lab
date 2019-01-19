import { Action } from '@ngrx/store'
import { Course } from '../../model/course'
import { Update } from '@ngrx/entity'

export enum CoursesActionTypes {
  // course action types
  LOAD_COURSE = '[Courses] load course',
  LOAD_COURSE_SUCCESS = '[Courses] load course success',
  LOAD_COURSE_FAIL = '[Courses] load course fail',
  UPDATE_COURSE = '[Courses] update course',
  UPDATE_COURSE_SUCCESS = '[update] update course success',
  UPDATE_COURSE_FAIL = '[update] update course fail',
  // courses action types
  LOAD_ALL_COURSES = '[Courses] load all-courses',
  LOAD_ALL_COURSES_SUCCESS = '[Courses] load all-courses success',
  LOAD_ALL_COURSES_FAIL = '[Courses] load all-courses fail'
}

// load course actions
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

// update course actions
export class UpdateCourseAction implements Action {
  readonly type = CoursesActionTypes.UPDATE_COURSE
  constructor(public payload: Update<Course>) {}
}

export class UpdateCourseSuccessAction implements Action {
  readonly type = CoursesActionTypes.UPDATE_COURSE_SUCCESS

  constructor(public payload: Update<Course>) {}
}

export class UpdateCourseFailAction implements Action {
  readonly type = CoursesActionTypes.UPDATE_COURSE_FAIL
}

// courses actions
export class LoadAllCoursesAction implements Action {
  readonly type = CoursesActionTypes.LOAD_ALL_COURSES

  constructor() {}
}

export class LoadAllCoursesSuccessAction implements Action {
  readonly type = CoursesActionTypes.LOAD_ALL_COURSES_SUCCESS

  constructor(public payload: Course[]) {}
}

export class LoadAllCoursesFailAction implements Action {
  readonly type = CoursesActionTypes.LOAD_ALL_COURSES_FAIL

  constructor() {}
}

export type CoursesActions =
  | LoadCourseAction
  | LoadCourseSuccessAction
  | LoadCourseFailAction
  | LoadAllCoursesAction
  | LoadAllCoursesSuccessAction
  | LoadAllCoursesFailAction
  | UpdateCourseAction
  | UpdateCourseSuccessAction
  | UpdateCourseFailAction

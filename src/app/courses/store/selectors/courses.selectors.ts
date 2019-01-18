import { createFeatureSelector, createSelector } from '@ngrx/store'
import { CoursesState, adapter } from '../reducers/courses.reducer'
import { Course } from '../../model/course'

export const getCoursesState = createFeatureSelector<CoursesState>('courses')

export const getCourseLoading = (id: number) =>
  createSelector(
    getCoursesState,
    (state) => !!state.entities[id]
  )

export const getCourseListLoaded = createSelector(
  getCoursesState,
  (state) => state.loaded
)

export const getCourseList = createSelector(
  getCoursesState,
  (coursesState) => {
    const courseList = Object.values(coursesState.entities)
    courseList.sort(sortById)
    return courseList
  }
)

export const getCourseById = (id: number) =>
  createSelector(
    getCoursesState,
    (state) => state.entities[id]
  )

function sortById(e1: Course, e2: Course) {
  return e1.id - e2.id
}

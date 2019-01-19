import { createFeatureSelector, createSelector } from '@ngrx/store'
import { CoursesState, adapter } from '../reducers/courses.reducer'
import { Course } from '../../model/course'
import { state } from '@angular/animations'

export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors()

export const getCoursesState = createFeatureSelector<CoursesState>('courses')

export const getCourseIsLoaded = (id: number) =>
  createSelector(
    getCoursesState,
    (state) => !!state.entities[id]
  )

export const getAllCoursesIsLoaded = createSelector(
  getCoursesState,
  (state) => state.loaded
)

export const getAllCourses = createSelector(
  getCoursesState,
  selectAll
)

export const getBeginnerCourses = createSelector(
  getAllCourses,
  (courses) => courses.filter((c) => c.category === 'BEGINNER')
)

export const getAdvancedCourses = createSelector(
  getAllCourses,
  (courses) => courses.filter((c) => c.category === 'ADVANCED')
)

export const getPromoTotal = createSelector(
  getAllCourses,
  (courses) => courses.filter((c) => c.promo).length
)

export const getCourseById = (id: number) =>
  createSelector(
    getCoursesState,
    (state) => state.entities[id]
  )

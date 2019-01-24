import { createFeatureSelector, createSelector } from '@ngrx/store'
import { adapter, LessonsState } from '../reducers/lessons.reducer'

export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors()

export const getLessonsState = createFeatureSelector<LessonsState>('lessons')

export const getAllLessons = (courseId: number) =>
  createSelector(
    getLessonsState,
    state => state.entities && state.entities[courseId] && state.entities[courseId].lessons
  )

export const getLessons = (
  courseId: number,
  filterStr?: string,
  sortDirection?: string,
  pageIndex?: number,
  pageSize?: number
) =>
  createSelector(
    getLessonsState,
    state =>
      state.entities &&
      state.entities[courseId] &&
      state.entities[courseId].lessons
        .slice()
        .filter(lesson => lesson.description.toLowerCase().includes(filterStr.toLowerCase()))
        .sort((lesson1, lesson2) =>
          sortDirection === 'asc' ? lesson1.seqNo - lesson2.seqNo : lesson2.seqNo - lesson1.seqNo
        )
        .slice(pageIndex * pageSize, pageIndex * pageSize + pageSize)
  )

export const getLessonsIsLoaded = (courseId: number) =>
  createSelector(
    getLessonsState,
    state =>
      !!state.entities &&
      !!state.entities[courseId] &&
      !!state.entities[courseId].lessons &&
      state.entities[courseId].lessons.length > 0
  )

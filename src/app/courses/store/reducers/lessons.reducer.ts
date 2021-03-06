import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { Lesson } from '../../model/lesson'
import { LessonsActions, LessonsActionTypes } from '../actions/lessons.action'

export interface LessonsContainer {
  courseId: number
  lessons: Lesson[]
}

export interface LessonsState extends EntityState<LessonsContainer> {
  loading: boolean
}

export const adapter: EntityAdapter<LessonsContainer> = createEntityAdapter<LessonsContainer>({
  selectId: (lessonsContainer: LessonsContainer) => lessonsContainer.courseId
})

const initialLessonsState = adapter.getInitialState({
  loading: false
})

export function lessonsReducer(state = initialLessonsState, action: LessonsActions): LessonsState {
  switch (action.type) {
    case LessonsActionTypes.LOAD_LESSONS:
      return { ...state, loading: true }
    case LessonsActionTypes.LOAD_LESSONS_SUCCESS:
      return adapter.addOne(action.payload, { ...state, loading: false })
    case LessonsActionTypes.LOAD_LESSONS_FAIL:
      return { ...state, loading: false }
    default:
      return state
  }
}

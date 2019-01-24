import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { Lesson } from '../../model/lesson'
import { LessonsActions, LessonsActionTypes } from '../actions/lessons.action'

export interface LessonsContainer {
  id: number
  lessons: Lesson[]
}

export interface LessonsState extends EntityState<LessonsContainer> {
  loading: boolean
  loaded: boolean
}

export const adapter: EntityAdapter<LessonsContainer> = createEntityAdapter<LessonsContainer>()

const initialLessonsState = adapter.getInitialState({
  loading: false,
  loaded: false
})

export function lessonsReducer(state = initialLessonsState, action: LessonsActions): LessonsState {
  switch (action.type) {
    case LessonsActionTypes.LOAD_LESSONS:
      return state
    case LessonsActionTypes.LOAD_LESSONS_SUCCESS:
      return adapter.addOne(action.payload, state)
    case LessonsActionTypes.LOAD_LESSONS_FAIL:
      return state
    default:
      return state
  }
}

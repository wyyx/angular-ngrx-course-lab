import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { Course } from '../../model/course'
import { CoursesActions, CoursesActionTypes } from '../actions/courses.actions'

export interface CoursesState extends EntityState<Course> {
  loading: boolean
  loaded: boolean
}

export const adapter: EntityAdapter<Course> = createEntityAdapter<Course>()

const initialCoursesState = adapter.getInitialState({
  loading: false,
  loaded: false
})

export function coursesReducer(state = initialCoursesState, action: CoursesActions): CoursesState {
  switch (action.type) {
    case CoursesActionTypes.LOAD_COURSE:
      return { ...state, loading: true }
      break
    case CoursesActionTypes.LOAD_COURSE_SUCCESS:
      const newState1 = adapter.addOne(action.payload, state)
      return {
        ...newState1,
        loading: false,
        loaded: true
      }
      break
    case CoursesActionTypes.LOAD_COURSE_LIST:
      return { ...state, loading: true }
      break
    case CoursesActionTypes.LOAD_COURSE_LIST_SUCCESS:
      const newState2 = adapter.addAll(action.payload, state)
      return { ...newState2, loading: false, loaded: true }
      break
    default:
      return state
      break
  }
}

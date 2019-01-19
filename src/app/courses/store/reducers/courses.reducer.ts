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
      return { ...state }
    case CoursesActionTypes.LOAD_COURSE_SUCCESS:
      return adapter.addOne(action.payload, state)
    case CoursesActionTypes.LOAD_ALL_COURSES:
      return { ...state, loading: true }
    case CoursesActionTypes.LOAD_ALL_COURSES_SUCCESS:
      return adapter.addAll(action.payload, { ...state, loading: false, loaded: true })
    case CoursesActionTypes.LOAD_ALL_COURSES_FAIL:
      return { ...state, loading: false, loaded: false }
    case CoursesActionTypes.UPDATE_COURSE:
      return state
    case CoursesActionTypes.UPDATE_COURSE_SUCCESS:
      return adapter.updateOne(action.payload, state)
    case CoursesActionTypes.UPDATE_COURSE_FAIL:
      return state
    default:
      return state
  }
}

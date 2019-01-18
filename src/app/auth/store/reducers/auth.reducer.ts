import { User } from '../../../model/user.model'
import { AuthActions, AuthActionTypes } from '../actions/auth.actions'
import { createSelector, createFeatureSelector } from '@ngrx/store'

export interface AuthState {
  loggedIn: boolean
  user: User
}

const initialAuthState: AuthState = {
  loggedIn: false,
  user: null
}

export function authReducer(state = initialAuthState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.Login:
      return {
        loggedIn: true,
        user: action.payload.user
      }
      break
    case AuthActionTypes.Logout:
      return {
        loggedIn: false,
        user: null
      }
      break
    default:
      return state
      break
  }
}

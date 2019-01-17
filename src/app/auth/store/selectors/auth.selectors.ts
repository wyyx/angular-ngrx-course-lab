import { createSelector } from '@ngrx/store'
import { getAuthState } from '../reducers/auth.reducer'

export const getLoggedIn = createSelector(
  getAuthState,
  (state) => state.loggedIn
)

export const getLoggedOut = createSelector(
  getLoggedIn,
  (loggedIn) => !loggedIn
)

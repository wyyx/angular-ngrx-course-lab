import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store'
import { environment } from '../../environments/environment'
import { storeFreeze } from 'ngrx-store-freeze'
import { RouterReducerState, routerReducer } from '@ngrx/router-store'
import { RouterStateUrl } from './custom-route-serializer'

export interface AppState {
  router: RouterReducerState<RouterStateUrl>
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [storeFreeze] : []

import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Action } from '@ngrx/store'
import { Actions, Effect, ofType, ROOT_EFFECTS_INIT, OnInitEffects } from '@ngrx/effects'
import { Observable, of, defer } from 'rxjs'
import { catchError, map, mergeMap, tap } from 'rxjs/operators'
import { AuthActionTypes, AuthActions, LoginAction, LogoutAction } from '../actions/auth.actions'
import { Router } from '@angular/router'

@Injectable()
export class AuthEffects implements OnInitEffects {
  @Effect({ dispatch: false })
  login$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.Login),
    tap((action: LoginAction) => {
      if (action.payload) {
        localStorage.setItem('user', JSON.stringify(action.payload.user))
      }
    })
  )

  @Effect({ dispatch: false })
  logout$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.Logout),
    tap(() => {
      localStorage.removeItem('user')
      this.router.navigateByUrl('/login')
    })
  )

  // // 1.
  // @Effect()
  // init$ = defer(
  //   (): Observable<AuthActions> => {
  //     const userData = localStorage.getItem('user')

  //     if (userData) {
  //       return of(new LoginAction({ user: JSON.parse(userData) }))
  //     } else {
  //       return of(new LogoutAction())
  //     }
  //   }
  // )

  constructor(private http: HttpClient, private actions$: Actions, private router: Router) {}

  // 2.
  ngrxOnInitEffects(): Action {
    const userData = localStorage.getItem('user')

    if (userData) {
      return new LoginAction({ user: JSON.parse(userData) })
    } else {
      this.router.navigateByUrl('/login')
      return new LogoutAction()
    }
  }
}

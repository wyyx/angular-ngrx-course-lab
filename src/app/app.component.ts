import { Component, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { AppState } from './store'
import { LogoutAction } from './auth/store/actions/auth.actions'
import { getLoggedIn, getLoggedOut } from './auth/store/selectors/auth.selectors'
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn$: Observable<boolean>
  isLoggedOut$: Observable<boolean>

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    this.isLoggedIn$ = this.store.select(getLoggedIn)
    this.isLoggedOut$ = this.store.select(getLoggedOut)
  }

  logout() {
    this.store.dispatch(new LogoutAction())
  }
}

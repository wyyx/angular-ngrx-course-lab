import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { Store } from '@ngrx/store'

import { AuthService } from '../services/auth.service'
import { tap } from 'rxjs/operators'
import { noop, Subject } from 'rxjs'
import { Router } from '@angular/router'
import { AppState } from '../../store'
import { LoginAction } from '../store/actions/auth.actions'

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup
  kill$: Subject<any> = new Subject()

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.form = fb.group({
      email: ['test@angular-university.io', [Validators.required]],
      password: ['test', [Validators.required]]
    })
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.kill$.next()
    this.kill$.complete()
  }

  login() {
    const val = this.form.value

    this.auth
      .login(val.email, val.password)
      .pipe(
        tap((user) => {
          this.store.dispatch(new LoginAction({ user }))
          this.router.navigateByUrl('/courses')
        })
      )
      .subscribe(noop, () => alert('Login Failed'))
  }
}

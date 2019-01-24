import { Component, OnInit, OnDestroy } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { Observable, Subject } from 'rxjs'
import { AppState } from '../../store'
import { Course } from '../model/course'
import {
  getAdvancedCourses,
  getBeginnerCourses,
  getPromoTotal,
  getAllCoursesIsLoaded
} from '../store/selectors/courses.selectors'
import { LoadAllCoursesAction } from '../store/actions/courses.actions'
import { tap, takeUntil } from 'rxjs/operators'

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  kill$: Subject<any> = new Subject()

  promoTotal$: Observable<number>
  beginnerCourses$: Observable<Course[]>
  advancedCourses$: Observable<Course[]>

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store
      .pipe(
        select(getAllCoursesIsLoaded),
        tap(loaded => !loaded && this.store.dispatch(new LoadAllCoursesAction())),
        takeUntil(this.kill$)
      )
      .subscribe()

    this.beginnerCourses$ = this.store.select(getBeginnerCourses)
    this.advancedCourses$ = this.store.select(getAdvancedCourses)
    this.promoTotal$ = this.store.select(getPromoTotal)
  }

  ngOnDestroy(): void {
    this.kill$.next()
    this.kill$.complete()
  }
}

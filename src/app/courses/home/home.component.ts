import { Component, OnDestroy, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable, Subject } from 'rxjs'
import { AppState } from '../../store'
import { Course } from '../model/course'
import { NeedAllCoursesAction } from '../store/actions/courses.actions'
import {
  getAdvancedCourses,
  getBeginnerCourses,
  getPromoTotal
} from '../store/selectors/courses.selectors'

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
    this.store.dispatch(new NeedAllCoursesAction())
    this.beginnerCourses$ = this.store.select(getBeginnerCourses)
    this.advancedCourses$ = this.store.select(getAdvancedCourses)
    this.promoTotal$ = this.store.select(getPromoTotal)
  }

  ngOnDestroy(): void {
    this.kill$.next()
    this.kill$.complete()
  }
}

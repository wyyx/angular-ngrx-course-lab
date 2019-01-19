import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { AppState } from '../../store'
import { Course } from '../model/course'
import {
  getAdvancedCourses,
  getBeginnerCourses,
  getPromoTotal
} from '../store/selectors/courses.selectors'
import { LoadAllCoursesAction } from '../store/actions/courses.actions'

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  promoTotal$: Observable<number>
  beginnerCourses$: Observable<Course[]>
  advancedCourses$: Observable<Course[]>

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(new LoadAllCoursesAction())

    this.beginnerCourses$ = this.store.select(getBeginnerCourses)
    this.advancedCourses$ = this.store.select(getAdvancedCourses)
    this.promoTotal$ = this.store.select(getPromoTotal)
  }
}

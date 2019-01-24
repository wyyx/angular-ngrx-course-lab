import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { Course } from '../model/course'
import { Observable, of } from 'rxjs'
import { CoursesService } from './courses.service'
import { Store, select } from '@ngrx/store'
import { AppState } from '../../store'
import { getCourseById } from '../store/selectors/courses.selectors'
import { tap, mergeMap, take } from 'rxjs/operators'
import { LoadCourseSuccessAction } from '../store/actions/courses.actions'

@Injectable()
export class CourseResolver implements Resolve<Course> {
  constructor(private coursesService: CoursesService, private store: Store<AppState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {
    const id = parseInt(route.paramMap.get('id'))

    return this.store.pipe(
      select(getCourseById(id)),
      mergeMap(course => (course ? of(course) : this.coursesService.findCourseById(id))),
      tap(course => this.store.dispatch(new LoadCourseSuccessAction(course))),
      take(1)
    )
  }
}

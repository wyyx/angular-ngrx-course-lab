import { CollectionViewer } from '@angular/cdk/collections'
import { DataSource } from '@angular/cdk/table'
import { select, Store } from '@ngrx/store'
import { BehaviorSubject, Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { AppState } from '../../store'
import { Lesson } from '../model/lesson'
import { getLessons } from '../store/selectors/lessons.selector'
import { MatPaginator } from '@angular/material'

export class LessonsDataSource extends DataSource<Lesson> {
  private lessonsSubject$ = new BehaviorSubject<Lesson[]>([])
  paginator: MatPaginator

  constructor(private store: Store<AppState>) {
    super()
  }

  // Reload data
  loadLessons(
    courseId: number,
    filterStr?: string,
    sortDirection?: string,
    pageIndex?: number,
    pageSize?: number,
    totalLessons?: number
  ) {
    return this.store.pipe(
      select(getLessons(courseId, filterStr, sortDirection, pageIndex, pageSize)),
      // tap(v => console.log('lessons', v)),
      map(lessons => (lessons ? lessons : [])),
      tap(lessons => this.lessonsSubject$.next(lessons)),
      // if no filterStr, use total count, otherwise use filtering count
      tap(lessons =>
        filterStr
          ? (this.paginator.length = lessons.length)
          : (this.paginator.length = totalLessons)
      )
    )
  }

  connect(collectionViewer: CollectionViewer): Observable<Lesson[]> {
    return this.lessonsSubject$.asObservable()
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.lessonsSubject$.complete()
  }
}

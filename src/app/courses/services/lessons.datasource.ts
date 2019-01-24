import { CollectionViewer } from '@angular/cdk/collections'
import { DataSource } from '@angular/cdk/table'
import { select, Store } from '@ngrx/store'
import { BehaviorSubject, Observable } from 'rxjs'
import { finalize, map, tap } from 'rxjs/operators'
import { AppState } from '../../store'
import { Lesson } from '../model/lesson'
import { getLessons } from '../store/selectors/lessons.selector'

export class LessonsDataSource extends DataSource<Lesson> {
  private lessonsSubject$ = new BehaviorSubject<Lesson[]>([])
  private loadingSubject$ = new BehaviorSubject<boolean>(true)
  private lessonsCountSubject$ = new BehaviorSubject<number>(0)
  loading$: Observable<boolean> = this.loadingSubject$.asObservable()
  lessonsCount$: Observable<number> = this.lessonsCountSubject$.asObservable()

  constructor(private store: Store<AppState>) {
    super()
  }

  loadLessons(
    courseId: number,
    filterStr?: string,
    sortDirection?: string,
    pageIndex?: number,
    pageSize?: number,
    totalLessons?: number
  ) {
    this.loadingSubject$.next(true)

    return this.store.pipe(
      select(getLessons(courseId, filterStr, sortDirection, pageIndex, pageSize)),
      // tap(v => console.log('lessons', v)),
      map(lessons => (lessons ? lessons : [])),
      tap(lessons => this.lessonsSubject$.next(lessons)),
      // if no filterStr, use total count, otherwise use filtering count
      tap(lessons =>
        filterStr
          ? this.lessonsCountSubject$.next(lessons.length)
          : this.lessonsCountSubject$.next(totalLessons)
      ),
      tap(() => this.loadingSubject$.next(false)),
      finalize(() => this.loadingSubject$.next(false))
    )
  }

  connect(collectionViewer: CollectionViewer): Observable<Lesson[]> {
    return this.lessonsSubject$.asObservable()
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.lessonsSubject$.complete()
    this.loadingSubject$.complete()
  }
}

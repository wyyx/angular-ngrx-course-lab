import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { Store } from '@ngrx/store'
import { AppState } from '../../store'
import { Course } from '../model/course'
import { UpdateCourseAction } from '../store/actions/courses.actions'

@Component({
  selector: 'course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit {
  courseId: number
  form: FormGroup
  description: string
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) course: Course,
    private store: Store<AppState>
  ) {
    this.courseId = course.id
    this.description = course.description
    this.form = fb.group({
      description: [course.description, Validators.required],
      category: [course.category, Validators.required],
      longDescription: [course.longDescription, Validators.required],
      promo: [course.promo, []]
    })
  }
  ngOnInit() {}

  save() {
    const changes = this.form.value
    this.store.dispatch(new UpdateCourseAction({ id: this.courseId, changes }))
    this.dialogRef.close()
  }
  close() {
    this.dialogRef.close()
  }
}

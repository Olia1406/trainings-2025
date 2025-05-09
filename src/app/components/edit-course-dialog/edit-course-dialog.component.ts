import { Component, effect, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { EditCourseDialogData } from "./edit-course-dialog.data.model";
import { CoursesService } from "../../services/courses.service";
import { LoadingComponent } from "../loading/loading.component";
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CourseCategoryComboboxComponent } from "../course-category-combobox/course-category-combobox.component";
import { CourseCategory } from "../../models/course-category.model";
import { first, firstValueFrom } from 'rxjs';
import { Course } from '../../models/course.model';

@Component({
  selector: 'edit-course-dialog',
  standalone: true,
  imports: [
    LoadingComponent,
    ReactiveFormsModule,
    CourseCategoryComboboxComponent
  ],
  templateUrl: './edit-course-dialog.component.html',
  styleUrl: './edit-course-dialog.component.scss'
})
export class EditCourseDialogComponent {

  dialogRef = inject(MatDialogRef);

  data = inject(MAT_DIALOG_DATA);

  fb = inject(FormBuilder);

  coursesService = inject(CoursesService);

  form = this.fb.group({
    title: [''],
    longDescription: [''],
    category: [''],
    iconUrl: ['']
  });

  constructor() {
    this.form.patchValue({
      title: this.data?.course?.title,
      longDescription: this.data?.course?.longDescription,
      category: this.data?.course?.category,
      iconUrl: this.data?.course?.iconUrl
    });
  }

  onClose() {
    this.dialogRef.close();
  }

  async onSave() {
    const courseProps = this.form.value as Partial<Course>;
    if (this.data?.mode === 'update') {
      await this.saveCourse(this.data.course!.id, courseProps);
    } else if (this.data?.mode === 'create') {
      await this.createCourse(courseProps);
    }
  }

  async saveCourse(courseId: string, changes: Partial<Course>) {
    try {
      const course = await this.coursesService.saveCourse(courseId, changes);
      this.dialogRef.close(course);
    }
    catch (error) {
      console.error('Error saving course', error);
      alert('Error saving course. Please try again later.');
    }
  }

  async createCourse(course: Partial<Course>) {
    try {
      const newCourse = await this.coursesService.createCourse(course);
      this.dialogRef.close(newCourse);
    }
    catch (error) {
      console.error('Error creating course', error);
      alert('Error creating course. Please try again later.');
    }
  }
}

export async function openEditCourseDialog(dialog: MatDialog, data: EditCourseDialogData) {
  const config = new MatDialogConfig();
  config.data = data;
  config.width = '400px';
  config.disableClose = true;
  config.autoFocus = true;

  const close$ = dialog.open(EditCourseDialogComponent, config).afterClosed()

  return firstValueFrom(close$)
}
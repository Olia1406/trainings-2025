import { Component, computed, inject, signal } from '@angular/core';
import { MatTab, MatTabGroup } from "@angular/material/tabs";
import { CoursesCardListComponent } from "../courses-card-list/courses-card-list.component";
import { Course, sortCoursesBySeqNo } from '../../models/course.model';
import { CoursesService } from '../../services/courses.service';
import { openEditCourseDialog } from '../edit-course-dialog/edit-course-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MessagesService } from '../messages/messages.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatTabGroup,
    MatTab,
    CoursesCardListComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  // Note: here he uses # to mark private properties, which is a new feature in TypeScript 4.4+
  #courses = signal<Course[]>([]);
  begginerCourses = computed(() => this.#courses().filter(course => course.category === 'BEGINNER'));
  advancedCourses = computed(() => this.#courses().filter(course => course.category === 'ADVANCED'));

  coursesService = inject(CoursesService);
  messagesService = inject(MessagesService);

  dialog = inject(MatDialog);

  constructor() {
    this.loadCourses().then(() => {
      console.log("Courses loaded", this.#courses());
    })
  }

  async loadCourses() {
    try {
      const courses = await this.coursesService.loadAllCourses();
      this.#courses.set(courses.sort(sortCoursesBySeqNo));
    }
    catch (error) {
      this.messagesService.showMessage("Error loading courses", "error");
      // Optionally, you can log the error to the console or handle it in a different way
      console.error("Error loading courses", error);
    }
  }

  onCourseUpdate(updatedCourse: Course) {
    const courses = this.#courses();
    const newCourses = courses.map(course => course.id === updatedCourse.id ? updatedCourse : course);
    this.#courses.set(newCourses);
  }

  async onCourseDelete(courseId: string) {
    try {
      await this.coursesService.deleteCourse(courseId);
      const courses = this.#courses();
      const newCourses = courses.filter(course => course.id !== courseId);
      this.#courses.set(newCourses);
    } catch (error) {
      console.error("Error deleting course", error);
    }
  }

  async onAddCourse() {
    const newCourse = await openEditCourseDialog(this.dialog, {
      mode: 'create',
      title: 'Create New Course'
    });

    if (!newCourse) {
      return;
    }
    
    const newCourses = [...this.#courses(), newCourse];
    this.#courses.set(newCourses);
  }

}

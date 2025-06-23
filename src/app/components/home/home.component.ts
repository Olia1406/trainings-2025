import { Component, computed, effect, inject, Injector, signal } from '@angular/core';
import { MatTab, MatTabGroup } from "@angular/material/tabs";
import { CoursesCardListComponent } from "../courses-card-list/courses-card-list.component";
import { Course, sortCoursesBySeqNo } from '../../models/course.model';
import { CoursesService } from '../../services/courses.service';
import { openEditCourseDialog } from '../edit-course-dialog/edit-course-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MessagesService } from '../messages/messages.service';

import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, from, interval, startWith } from 'rxjs';

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

  // courses$ = toObservable(this.#courses);

  constructor() {
    // this.courses$.subscribe(courses => {
    //   console.log("Courses from observable", courses);
    // });

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

  injector = inject(Injector)

  onToObservableExample() {
    // const courses$ = toObservable(this.#courses, { injector: this.injector });
    // courses$.subscribe(courses => {
    //   console.log("Courses from observable", courses);
    // });

    const numbers = signal(0);
    numbers.set(1);
    numbers.set(2);
    numbers.set(3);

    const numbers$ = toObservable(numbers, { injector: this.injector });
    numbers.set(4);

    numbers$.subscribe(value => {
      console.log("Numbers from observable", value);
    });
    numbers.set(5);
  }

  // courses$ = from(this.coursesService.loadAllCourses())

  onToSignalExample() {
    // const courses = toSignal(this.courses$, { injector: this.injector });

    // effect(() => {
    //   console.log("Courses from signal", courses());
    // }, {
    //   injector: this.injector
    // });


    // NOTE: Example of using toSignal with an observable that needs initialValue
    //   const numbers$ = interval(1000).pipe(
    //     startWith(0)
    //   );
    //   const numbers = toSignal(numbers$, {
    //     injector: this.injector,
    //     // initialValue: 0,
    //     requireSync: true
    //   });

    //   effect(() => {
    //     console.log("Numbers from signal", numbers());
    //   }, {
    //     injector: this.injector
    //   });


    // NOTE: Example of using toSignal with an observable that throws an error
    try {
      const courses$ = from(this.coursesService.loadAllCourses()).
        pipe(
          catchError(error => {
            console.error("Error caught in catchError", error);
            // return of([]); // Return an empty array on error
            throw error; // Rethrow the error to be caught in the catch block
          })
        );
      const courses = toSignal(courses$, { injector: this.injector, rejectErrors: true });

      effect(() => {
        console.log("Courses from signal", courses());
      }, {
        injector: this.injector
      });
    } catch (error) {
      console.log('Error in catch block:', error);
    }

  }

}
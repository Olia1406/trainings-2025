import { Component, inject, signal } from '@angular/core';
import { MatTab, MatTabGroup } from "@angular/material/tabs";
import { CoursesCardListComponent } from "../courses-card-list/courses-card-list.component";
import { Course } from '../../models/course.model';
import { CoursesService } from '../../services/courses.service';
import { CoursesServiceWithFetch } from '../../services/courses-fetch.service';

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

  courses = signal<Course[]>([]);

  coursesService = inject(CoursesServiceWithFetch);

  constructor() {
    this.loadCourses().then(() => {
      console.log("Courses loaded", this.courses());
    })
  }

  async loadCourses() {
    try {
      const courses = await this.coursesService.loadAllCourses();
      this.courses.set(courses);
    }
    catch (error) {
      console.error("Error loading courses", error);
    }


  }

}

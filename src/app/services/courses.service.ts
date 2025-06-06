import { Injectable } from "@angular/core";
import { HttpClient, HttpContext } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Course } from "../models/course.model";
import { GetCoursesResponse } from "../models/get-courses.response";
import { firstValueFrom } from "rxjs";
import { SkipLoading } from "../components/loading/skip-loading.components";


@Injectable({
  providedIn: "root"
})
export class CoursesService {
  constructor(private http: HttpClient) { }

  apiUrl = environment.apiRoot + "/courses";

  async loadAllCourses(): Promise<Course[]> {
    const cousrse$ = this.http
      .get<GetCoursesResponse>(this.apiUrl, {
        context: new HttpContext().set(SkipLoading, true)
      });

    // The firstValueFrom operator is used to convert an observable into a promise.
    // It takes the first value emitted by the observable and resolves the promise with that value.
    const response = await firstValueFrom(cousrse$);
    return response.courses;
  }

  async getCourseById(courseId: string): Promise<Course | null> {
    const course$ = this.http
      .get<Course>(`${this.apiUrl}/${courseId}`);

    return firstValueFrom(course$)
  }

  async createCourse(course: Partial<Course>): Promise<Course> {
    const course$ = this.http
      .post<Course>(this.apiUrl, course);

    return firstValueFrom(course$);
  }

  async saveCourse(courseId: string, changes: Partial<Course>): Promise<Course> {
    const course$ = this.http
      .put<Course>(`${this.apiUrl}/${courseId}`, changes);

    return firstValueFrom(course$);
  }

  async deleteCourse(courseId: string): Promise<any> {
    const course$ = this.http
      .delete<Course>(`${this.apiUrl}/${courseId}`);

    return firstValueFrom(course$);
  }
}

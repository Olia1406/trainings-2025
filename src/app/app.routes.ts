import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { isUserAuthenticated } from './guards/auth.guard';
import { CourseComponent } from './components/course/course.component';
import { courseResolver } from './components/course/course-resolver';
import { courseLessonsResolver } from './components/course/course-lessons-resolver';
import { LessonsComponent } from './components/lessons/lessons.component';
import { ResourceDemoComponent } from './components/resource-demo/resource-demo.component';
import { LinkedSignalDemoComponent } from './components/linked-signal-demo/linked-signal-demo.component';


export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [isUserAuthenticated]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "lessons",
    component: LessonsComponent
  },
  {
    path:"shopping-cart",
    component: LinkedSignalDemoComponent
  },
  {
    path: "resource-demo",
    component: ResourceDemoComponent
  },
  {
    path: 'courses/:courseId',
    component: CourseComponent,
    canActivate: [isUserAuthenticated],
    resolve: {
      course: courseResolver,
      lessons: courseLessonsResolver
    },
    title: 'Course Details'
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { isUserAuthenticated } from './guards/auth.guard';
import { CourseComponent } from './components/course/course.component';
import { courseResolver } from './components/course/course-resolver';
import { courseLessonsResolver } from './components/course/course-lessons-resolver';


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
  // {
  //   path: "lessons",
  //   component: LessonsComponent
  // },
  // {
  //   path:"shopping-cart",
  //   component: LinkedSignalDemoComponent
  // },
  // {
  //   path: "resource-demo",
  //   component: ResourceDemoComponent
  // },
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

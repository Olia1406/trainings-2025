import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';


export const routes: Routes = [
    {
      path: '',
      component: HomeComponent
    },
    // {
    //   path: "login",
    //   component: LoginComponent
    // },
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
      path: '**',
      redirectTo: '/'
    }
  ];

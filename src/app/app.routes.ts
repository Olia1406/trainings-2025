import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { isUserAuthenticated } from './guards/auth.guard';


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
      path: '**',
      redirectTo: '/'
    }
  ];

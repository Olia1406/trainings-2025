import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {MatSidenav, MatSidenavContainer} from "@angular/material/sidenav";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIconButton} from "@angular/material/button";
import {LoadingComponent} from "./components/loading/loading.component";
import { MessagesComponent } from './components/messages/messages.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, MatSidenavContainer, MatSidenav, MatNavList, MatListItem, MatIcon, RouterLink, MatToolbar,
    MatIconButton, LoadingComponent, MessagesComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-training-25';

  authService = inject(AuthService);

  isLoggedIn = this.authService.isLoggedIn;

  onLogout() {
    this.authService.logout();
  }
}

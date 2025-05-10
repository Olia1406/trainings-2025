import { Component, inject } from '@angular/core';
import { LoadingService } from './loading.service';
import { MatProgressSpinner } from "@angular/material/progress-spinner"

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [MatProgressSpinner],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {

  loadingService = inject(LoadingService);

  loading = this.loadingService.loading;
}

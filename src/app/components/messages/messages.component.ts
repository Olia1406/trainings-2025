import { Component, inject } from '@angular/core';
import { MessagesService } from './messages.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [NgClass],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent {

  messageService = inject(MessagesService);

  message = this.messageService.message;

  onClose() {
    this.messageService.clear();
  }

}

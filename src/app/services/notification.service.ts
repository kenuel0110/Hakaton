import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private container: HTMLElement;

  constructor() {
    this.container = document.getElementById('notification-container')!;
  }

  showNotification(message: string) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    this.container.appendChild(notification);

    setTimeout(() => {
      this.container.removeChild(notification);
    }, 5000);
  }
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { NotificationService } from './services/notification.service';
import { filter } from 'rxjs/operators';
import { FirebaseAuthService } from './services/firebase-auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = '';
  role: string = '';
  isLoggedIn: boolean = false;
  subscription: Subscription;

  constructor(private titleService: Title, private router: Router, private notificationService: NotificationService, private firebaseAuthService: FirebaseAuthService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(async () => {
      const root = this.router.routerState.root;
      const route = root.firstChild;
      if (route) {
        const data = await route.data.toPromise();
        const title = data && data['title'];
        this.titleService.setTitle(title);
        this.title = title;
      }
    });

    this.subscription = this.firebaseAuthService.isLoggedIn().subscribe((authState) => {
      this.isLoggedIn = authState.loggedIn;
      this.role = authState.role;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  signOut(): void {
    this.firebaseAuthService.signOut();
    this.router.navigate(['/']);
    this.notificationService.showNotification('Вы вышли из аккаунта');
  }

  get currentUrlGetter(): string {
    return this.router.url;
  }
}
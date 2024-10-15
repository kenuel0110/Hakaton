import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { filter } from 'rxjs/operators';
import { FirebaseAuthService } from './services/firebase-auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule], // Add CommonModule here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = '';
  isLoggedIn: Promise<boolean>;
  currentUrl: string;

  constructor(private titleService: Title, private router: Router, private firebaseAuthService: FirebaseAuthService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const root = this.router.routerState.root;
      const route = root.firstChild;
      if (route) {
        route.data.subscribe(data => {
          const title = data && data['title'];
          this.titleService.setTitle(title);
          this.title = title;
        });
      }
    });

    this.isLoggedIn = this.firebaseAuthService.isLoggedIn();
    this.currentUrl = this.router.url;
  }

  signOut(): void {
    this.firebaseAuthService.signOut();
    this.router.navigate(['/']);
  }

  get currentUrlGetter(): string {
    return this.router.url;
  }
}
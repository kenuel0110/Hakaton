import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseAuthService } from '../../services/firebase-auth.service';

@Component({
  selector: 'app-auth-component',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  form: FormGroup;
  isLoading: boolean = false;

  constructor(private firebaseAuthService: FirebaseAuthService, private notificationService: NotificationService, private router: Router, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.valid) {
      this.isLoading = true;
      this.firebaseAuthService.signInWithEmailAndPassword(this.form.get('email')?.value, this.form.get('password')?.value)
        .then((userCredential) => {
          if (userCredential) {
            this.router.navigate(['/']);
            this.notificationService.showNotification('Вход выполнен');
          } else {
            this.notificationService.showNotification('Ошибка входа');
          }
        })
        .catch((error) => {
          this.notificationService.showNotification('Ошибка входа: ' + error.message);
        })
        .finally(() => {
          this.isLoading = false;
        });
    } else {
      this.form.markAllAsTouched();
      this.notificationService.showNotification('Пожалуйста, заполните все поля корректно.');
    }
  }

  goToPage(): void {
    this.router.navigate(['/']);
  }
}
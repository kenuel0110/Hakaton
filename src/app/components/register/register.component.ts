import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseAuthService } from '../../services/firebase-auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({}); // инициализируем форму
  isLoading = false;

  constructor(private firebaseAuthService: FirebaseAuthService, private notificationService: NotificationService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', Validators.required),
  confirmPassword: new FormControl('', Validators.required)
}, { validators: this.mustMatch('password', 'confirmPassword') });
  }

  mustMatch(password: string, confirmPassword: string) {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const formGroup = control as FormGroup;
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];
  
      if (passwordControl.value !== confirmPasswordControl.value) {
        return { mustMatch: true };
      } else {
        return null;
      }
    };
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.isLoading = true;
      const email = this.form.get('email')?.value;
      const password = this.form.get('password')?.value;
      this.firebaseAuthService.createUserWithEmailAndPassword(email, password).then(() => {
        this.firebaseAuthService.signOut();
        this.isLoading = false;
        // Send email verification
        this.firebaseAuthService.sendEmailVerification();
        this.notificationService.showNotification('Пользователь создан успешно!');
        this.router.navigate(['/email-check']);
      }).catch((error: any) => {
        this.isLoading = false;
        console.error('Error creating user:', error);
        this.notificationService.showNotification('Ошибка создания пользователя!');
      });
    }
  }
}
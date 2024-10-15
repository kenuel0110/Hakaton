import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseAuthService } from '../../services/firebase-auth.service';
import { NotificationService } from '../../services/notification.service';
import { FirebaseService } from '../../services/firebase.service';
import { User } from '../../models/user.model';



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

  constructor(private firebaseAuthService: FirebaseAuthService, private notificationService: NotificationService, private router: Router, private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      fullname: new FormControl('', Validators.required), // добавлен контрол fullname
      owner: new FormControl('', Validators.required), // добавлен контрол owner
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
      const fullname = this.form.get('fullname')?.value;
      const owner = this.form.get('owner')?.value;
  
      if (owner === undefined || owner === null) {
        this.notificationService.showNotification('Ошибка создания пользователя! Пожалуйста, заполните поле "Название организации"');
        return;
      }
  
      this.firebaseAuthService.createUserWithEmailAndPassword(email, password).then((userCredential) => {
        const uuid = userCredential.user.uid;
        const user: User = {
          uuid,
          email,
          owner,
          fullname,
          role: 'user' // по умолчанию роль пользователя
        };
  
        this.firebaseService.writeData(`users/${uuid}`, user).then(() => {
          this.firebaseAuthService.signOut();
          this.isLoading = false;
          // Send email verification
          this.firebaseAuthService.sendEmailVerification();
          this.notificationService.showNotification('Пользователь создан успешно!');
          this.router.navigate(['/email-check']);
        }).catch((error) => {
          console.error('Error writing user data:', error);
        });
      }).catch((error) => {
        this.isLoading = false;
        console.error('Error creating user:', error);
        this.notificationService.showNotification('Ошибка создания пользователя!');
      });
    }
  }
}
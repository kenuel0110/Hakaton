import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Event } from '../../models/event.model';
import { NotificationService } from '../../services/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-choose-room',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './choose-room.component.html',
  styleUrls: ['./choose-room.component.css']
})
export class ChooseRoom implements OnInit {
  form: FormGroup;
  isLoading: boolean = false;

  constructor(private firebaseService: FirebaseService, private notificationService: NotificationService, private router: Router, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      cityTitle: ['', Validators.required],
      cityDescription: ['', Validators.required],
      cityLink: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    this.firebaseService.getData('cities').then((cities) => {
      const newCityId = cities ? cities.length : 0;
      /*const city: Event = {
        id: newCityId,
        name: this.form.get('cityTitle')?.value,
        description: this.form.get('cityDescription')?.value,
        image: this.form.get('cityLink')?.value,
        favorite: false
      };*/
      this.firebaseService.writeData('cities/' + newCityId, Event).then(() => {
        this.notificationService.showNotification("Город добавлен");
        this.router.navigate(['/']);
      }).catch((error) => {
        console.error(error);
        this.notificationService.showNotification(error);
      }).finally(() => {
        this.isLoading = false;
      });
    });
  }

  goToPage(): void {
    this.router.navigate(['/']);
  }
}
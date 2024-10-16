import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Request } from '../../models/request.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {RequestModel} from "../../models/RequestModel.model";
import {RequestService} from "../../models/request.model";
import {FirebaseService} from "../../services/firebase.service";

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css'],
})
export class RoomDetailsComponent implements OnInit {
  request: Request | undefined;

  constructor(private route: ActivatedRoute, private firestore: FirebaseService, private requestService: RequestService, private fb: FormBuilder, private router: Router) {
    this.route.paramMap.subscribe(params => {
      const requestId = parseInt(params.get('id') || '', 10);
      this.request = this.requestService.getRequestById(requestId);
    });
  }

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      owner: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      special_quest: ['', Validators.required],
      equipment: ['', Validators.required],
      owner_equipment: ['', Validators.required],
      comments: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      fullname: ['', Validators.required],
      post: ['', Validators.required],
      tel: ['', Validators.required],
    });
    this.form.updateValueAndValidity();
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      console.log(formData); // Temporary check


      const requestModel: RequestModel = {
        userEmail: this.request?.email,
        adminEmail: 'nesterkov02@gmail.com',
        request: this.request
      };

      // Пример URL, на который отправляется запрос
      const url = 'https://sobirator.energy-rust.ru/Notification/notification';

      // Отправка POST запроса
      /*this.http.post(url, requestModel).subscribe({
        next: (response) => {
          console.log('Успешный ответ от сервера:', response);
          // Добавление в Firebase
          this.firestore.writeData('request', this.request)
            .then(() => {
              console.log('Данные успешно добавлены в Firebase');
              this.form.reset();
              this.router.navigate(['/main']);
            })
            .catch((error) => {
              console.error('Ошибка при добавлении данных в Firebase:', error);
            });
          this.form.reset();
          this.router.navigate(['/main']);
        },
        error: (error) => {
          console.error('Ошибка при отправке данных:', error);
          // Обработка ошибок
        }
      });*/
    } else {
      console.log('Форма не валидна');
    }
  }

  goBackPage() {
    this.router.navigate(['/main']);  // Переход на маршрут 'ar'
  }
}

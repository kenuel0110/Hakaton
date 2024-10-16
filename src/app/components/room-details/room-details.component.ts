import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from "../../services/firebase.service";
import { DomSanitizer } from '@angular/platform-browser'; // Импортируем DomSanitizer

import { Room } from "../../models/roomnew.model"; // Import the Room interface

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css'],
})
export class RoomDetailsComponent implements OnInit {
  roomId: number | undefined;
  roomData: Room | undefined;
  arModelHtml: any; // Для хранения HTML-кода
  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private firestore: FirebaseService,
    private fb: FormBuilder,
    private router: Router,
    private sanitizer: DomSanitizer // Инжектируем DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.roomId = parseInt(params.get('id') || '', 10);
      this.firestore.getData('room').then((data: Room[] | null) => {
        if (data) {
          this.roomData = data.find((room: Room) => room.id === this.roomId);
          if (this.roomData) {
            // Сохраняем HTML-код
            this.arModelHtml = this.sanitizer.bypassSecurityTrustHtml(this.roomData.ar_link);
          }
        } else {
          console.log('No data available');
        }
      }).catch(error => {
        console.error('Error fetching data:', error);
      });
    });

    // Инициализация формы
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
  }

  onSubmit() {
    if (this.form.valid && this.roomData) {
      const formData = this.form.value;

      const requestModel = {
        id: this.roomData.id,
        title: formData.title,
        description: formData.description,
        fullname: formData.fullname,
        comments: formData.comments,
        count_people: 0, // Укажите нужное значение
        id_room: this.roomData.id,
        owner: formData.owner,
        equipment: formData.equipment,
        owner_equipment: formData.owner_equipment,
        post: formData.post,
        special_guest: formData.special_quest,
        start_date: formData.start_date,
        end_date: formData.end_date,
        status: 'pending' // Устанавливаем статус по умолчанию
      };

      // Отправка данных в Firebase
      this.firestore.writeData(`requests/${requestModel.id}`, requestModel)
        .then(() => {
          console.log('Данные успешно добавлены в Firebase');
          this.form.reset();
          this.router.navigate(['/main']);
        })
        .catch((error) => {
          console.error('Ошибка при добавлении данных в Firebase:', error);
        });
    } else {
      console.log('Форма не валидна или данные о комнате не найдены');
    }
  }

  goBackPage() {
    this.router.navigate(['/main']);  // Переход на маршрут 'main'
  }
}
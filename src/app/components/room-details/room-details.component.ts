import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirebaseService } from "../../services/firebase.service";
import { DomSanitizer } from '@angular/platform-browser';
import { Room } from "../../models/roomnew.model";

@Component({
  selector: 'app-room-details',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css'],
})
export class RoomDetailsComponent implements OnInit {
  roomId: number | undefined;
  roomData: Room | undefined;
  arModelHtml: any; // Для хранения HTML-кода
  form!: FormGroup;
  countPeopleError: boolean = false;
  dateError: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private firestore: FirebaseService,
    private fb: FormBuilder,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      count_people: ['', [Validators.required, Validators.min(1)]],
      special_quest: ['', Validators.required],
      equipment: ['', Validators.required],
      owner_equipment: ['', Validators.required],
      comments: ['', Validators.required],
      start_arenda: ['', Validators.required],
      end_arenda: ['', Validators.required],
      post: ['', Validators.required],
    });

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
  }

  onSubmit() {
    this.countPeopleError = false;
    this.dateError = false;

    if (this.form.valid && this.roomData) {
      const formData = this.form.value;

      // Проверка количества людей
      if (formData.count_people > this.roomData.max_count) {
        this.countPeopleError = true;
        return; // Прекращаем выполнение, если ошибка
      }

      // Проверка дат
      const startDate = new Date(formData.start_arenda);
      const endDate = new Date(formData.end_arenda);
      if (startDate > endDate) {
        this.dateError = true;
        return; // Прекращаем выполнение, если ошибка
      }

      const requestModel = {
        id: this.roomData.id,
        title: formData.title,
        description: formData.description,
        fullname: '', // Подтяните из БД, если необходимо
        comments: formData.comments,
        count_people: formData.count_people,
        id_room: this.roomData.id,
        owner: '', // Подтяните из БД, если необходимо
        equipment: formData.equipment,
        owner_equipment: formData.owner_equipment,
        post: formData.post,
        special_guest: formData.special_quest,
        start_date: formData.start_arenda,
        end_date: formData.end_arenda,
        status: 'pending' // Устанавливаем статус по умолчанию
      };

      // Отправка данных в Firebase
      this.firestore.writeData(`request/${requestModel.id}`, requestModel)
        .then(() => {
          console.log('Данные успешно добавлены в Firebase');
          this.form.reset();
          this.router.navigate(['/main']);
        })
        .catch((error) => {
          console.error('Ошибка при добавлении данных в Firebase:', error);
        });
    } else {
      
      console.log('Форма не валидна', this.form.errors);
    }
  }

  goBackPage() {
    this.router.navigate(['/main']);  // Переход на маршрут 'main'
  }
}
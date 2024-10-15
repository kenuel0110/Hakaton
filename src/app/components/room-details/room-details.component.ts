import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService, Request } from '../../models/request.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css'],
})
export class RoomDetailsComponent implements OnInit {
  request: Request | undefined;

  constructor(private route: ActivatedRoute, private requestService: RequestService, private fb: FormBuilder, private router: Router) {
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
      start_arenda: ['', Validators.required],
      end_arenda: ['', Validators.required],
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
      this.form.reset();
    } else {
      console.log('Форма не валидна');
    }
  }

  goBackPage() {
    this.router.navigate(['/main']);  // Переход на маршрут 'ar'
  }
}
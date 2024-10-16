import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Room } from '../../models/roomnew.model';
import { NotificationService } from '../../services/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-create-new',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './create-new.component.html',
  styleUrls: ['./create-new.component.css']
})
export class CreateNewComponent implements OnInit {
  isLoading: boolean = false;
  rooms: Room[] = [];

  constructor(private firebaseService: FirebaseService, private notificationService: NotificationService, private router: Router, private formBuilder: FormBuilder) {
    
  }

  ngOnInit(): void {
    this.getRooms();
  }

  async getRooms(): Promise<void> {
    try {
      const data = await this.firebaseService.getData('room');
      if (data) {
        this.rooms = data;
      }
    } catch (error) {
      console.error('Error getting rooms:', error);
    }
  }

  onSubmit(): void {
  

    this.isLoading = true;
    
  }

  goToPage(): void {
    this.router.navigate(['/']);
  }

  goToRoom(room: Room): void {
    this.router.navigate(['/main', room.id]);
  }
}
import { AppRoutingModule } from './../../app.routes.module';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Room } from '../../models/roomnew.model';
import { Request } from '../../models/request.model';
import { NotificationService } from '../../services/notification.service';
import { RoomService} from '../../services/room.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})

export class MainComponent implements OnInit {
  categories: any[] = [];
  requests: Request[] = [];
  rooms: Room[] = [];
  selectedButton: string = 'grid';
  isLoading: boolean = true;

  elements: Request[] = []; // массив элементов
  selectedCategory: any = null; // текущая выбранная категория

  constructor(private firebaseService: FirebaseService, private notificationService: NotificationService, private router: Router, private roomService: RoomService) {
    
  }

  ngOnInit(): void {
    this.getCategories();
    this.getRequests();
    this.getRooms();
  }

  async getCategories(): Promise<void> {
    try {
      const categories = await this.firebaseService.getData('/category');
      if (categories) {
        this.categories = Object.keys(categories).map((key) => categories[key]);
      } else {
        console.log('No categories available');
      }
    } catch (error) {
      console.error('Error getting categories:', error);
    } finally {
      this.isLoading = false;
    }
  }
  
  async getRequests(): Promise<void> {
    try {
      const requests = await this.firebaseService.getData('/request');
      if (requests) {
        this.requests = Object.keys(requests).map((key) => requests[key]);
      } else {
        console.log('No requests available');
      }
    } catch (error) {
      console.error('Error getting requests:', error);
    } finally {
      this.isLoading = false;
    }
  }
  
  async getRooms(): Promise<void> {
    try {
      const rooms = await this.firebaseService.getData('/room');
      if (rooms) {
        this.rooms = Object.keys(rooms).map((key) => rooms[key]);
      } else {
        console.log('No rooms available');
      }
    } catch (error) {
      console.error('Error getting rooms:', error);
    } finally {
      this.isLoading = false;
    }
  }

  isSelectedCategory(category: any): boolean {
    return this.selectedCategory === category;
  }

  getRoomTitle(id_room: number): string {
    const room = this.rooms.find((room) => room.id === id_room);
    return room ? room.title : 'Комната не найдена';
  }

  isAllSelected(): boolean {
    return this.selectedCategory === null;
  }

  selectCategory(category: string | null): void {
    this.selectedCategory = category;
  }

  isRequestVisible(request: Request): boolean {
    if (this.selectedCategory === null) {
      // Show all approved requests
      return request.status === 'approved';
    } else {
      // Filter by room tag
      const room = this.rooms.find((room) => room.id === request.id_room);
      if (room) {
        return room.tag === this.selectedCategory.title;
      } else {
        return false;
      }
    }
  }
}
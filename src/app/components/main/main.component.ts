import { AppRoutingModule } from './../../app.routes.module';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FirebaseAuthService } from '../../services/firebase-auth.service';
import { Event } from '../../models/event.model';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})

export class MainComponent implements OnInit {
  //cities: City[] = [];
  selectedButton: string = 'grid';
  isLoggedIn: Promise<boolean>;
  isLoading: boolean = true;

  constructor(private firebaseService: FirebaseService, private notificationService: NotificationService, private router: Router, private firebaseAuthService: FirebaseAuthService) {
    this.isLoggedIn = this.firebaseAuthService.isLoggedIn();
  }

  ngOnInit(): void {
    this.loadCities();
  }

  async loadCities() {
    try {
      const data = await this.firebaseService.getData('cities');
      if (data) {
        //this.cities = data;
      } else {
        console.log("Данные не найдены");
        this.notificationService.showNotification("Данные не найдены");
      }
    } catch (error: any) {
      console.error(error);
      this.notificationService.showNotification(error);
    }finally {
      this.isLoading = false;
    }
  
  }

  selectButton(button: string) {
    this.selectedButton = button;
  }

  async toggleFavorite(city: Event) {
    //city.favorite = !city.favorite;
    //if (city.id != undefined) {
    //  try {
    //    await this.firebaseService.update(`cities/${city.id}`, { favorite: city.favorite });
    //  } catch (error) {
    //    console.error("Ошибка при обновлении избранного:", error);
    //    city.favorite = !city.favorite;
    //  }
    //}
  }

  

  goToPage(): void {
    this.router.navigate(['/new']);
  }
}
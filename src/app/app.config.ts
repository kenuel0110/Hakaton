import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
    providers: [
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideRouter(routes),
      provideFirebaseApp(() => initializeApp({
        "projectId": "hackaton-86cea",
        "appId": "1:1068733895258:web:a82e9874737ea4d710fe63",
        "databaseURL": "https://hackaton-86cea-default-rtdb.europe-west1.firebasedatabase.app/",
        "storageBucket": "hackaton-86cea.appspot.com",
        "apiKey": "AIzaSyCICqPx8KKGgt3fbpjMHY1d7PRKKphp1Xw",
        "authDomain": "hackaton-86cea.firebaseapp.com",
        "messagingSenderId": "G-FJ95J6ZKS2"
      })),
      provideAuth(() => getAuth()),
      provideDatabase(() => getDatabase())
    ]
  };
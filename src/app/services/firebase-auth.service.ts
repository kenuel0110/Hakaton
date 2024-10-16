import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { FirebaseService } from './firebase.service';
import { User } from '../models/user.model';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification, onAuthStateChanged } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(private auth: Auth, private firebaseService: FirebaseService) { }

  async createUserWithEmailAndPassword(email: string, password: string): Promise<any> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      console.log('User  created successfully!');
      return userCredential;
    } catch (error) {
      console.error('Error creating user:', error);
      return null;
    }
  }

  async isEmailVerified(): Promise<boolean> {
    const user = this.auth.currentUser;
    if (user) {
      return user.emailVerified;
    } else {
      return false;
    }
  }

  async signInWithEmailAndPassword(email: string, password: string): Promise<any> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      console.log('User  signed in successfully!');
      return userCredential;
    } catch (error) {
      console.error('Error signing in:', error);
      return null;
    }
  }

  async sendEmailVerification(): Promise<void> {
    const user = this.auth.currentUser;
    if (user) {
      try {
        await sendEmailVerification(user);
        console.log('Email verification sent!');
      } catch (error) {
        console.error('Error sending email verification:', error);
      }
    } else {
      console.log('No user signed in');
    }
  }

  async signOut(): Promise<void> {
    try {
      await signOut(this.auth);
      console.log('User  signed out successfully!');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  isLoggedIn(): Observable<{ role: string, loggedIn: boolean }> {
    return new Observable((observer) => {
      onAuthStateChanged(this.auth, async (user) => {
        if (user) {
          const userData = await this.getUserData(user.uid);
          const role = userData.role;
          observer.next({ role, loggedIn: true });
        } else {
          observer.next({ role: '', loggedIn: false }); // return an empty string as default role
        }
      });
    });
  }

  getUserDataById(): Promise<any> {
    return new Promise((resolve) => {
      onAuthStateChanged(this.auth, async (user) => {
        if (user) {
          const userData = await this.getUserData(user.uid);
          resolve(userData);
        } else {
          resolve(null);
        }
      });
    });
  }

  private async getUserData(uid: string): Promise<User> {
    const userData = await this.firebaseService.getData(`users/${uid}`);
    return userData as User;
  }
}
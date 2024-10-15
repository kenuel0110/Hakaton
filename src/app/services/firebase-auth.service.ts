import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification, onAuthStateChanged } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(private auth: Auth) { }

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

  isLoggedIn(): Observable<boolean> {
    return new Observable((observer) => {
      onAuthStateChanged(this.auth, (user) => {
        observer.next(!!user);
      });
    });
  }
}
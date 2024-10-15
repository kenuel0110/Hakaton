import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification, onAuthStateChanged } from 'firebase/auth';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  private isLoggedInPromise: Promise<boolean>;
  private authStateSubject: Subject<any> = new Subject();

  constructor(private auth: Auth) {
    this.isLoggedInPromise = new Promise((resolve, reject) => {
      onAuthStateChanged(this.auth, (user) => {
        resolve(!!user);
      });
    });

    onAuthStateChanged(this.auth, (user) => {
      this.authStateSubject.next(user);
    });
  }

  async createUserWithEmailAndPassword(email: string, password: string): Promise<any> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      console.log('User    created successfully!');
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
      console.log('User    signed in successfully!');
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
      console.log('User signed out successfully!');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  async isLoggedIn(): Promise<boolean> {
    return this.isLoggedInPromise;
  }

  authStateChanges(): Observable<any> {
    return this.authStateSubject.asObservable();
  }
}
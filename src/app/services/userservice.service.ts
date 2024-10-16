import { Injectable } from '@angular/core';
import { FirebaseAuthService } from './firebase-auth.service';
import { FirebaseService } from './firebase.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firebaseAuthService: FirebaseAuthService, private firebaseService: FirebaseService) { }

  async getUserData(uuid: string): Promise<User> {
    const userData = await this.firebaseService.getData(`users/${uuid}`);
    return userData as User;
  }

  async getRequestOwnerData(request: any): Promise<{ email: string, fullname: string, owner: string }> {
    const uuid = request.owner_uuid; // assuming the request has an owner_uuid property
    const userData = await this.getUserData(uuid);
    return {
      email: userData.email,
      fullname: userData.fullname,
      owner: userData.owner
    };
  }
}
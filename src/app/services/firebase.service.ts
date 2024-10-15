import { Injectable } from '@angular/core';
import { Database, ref, get, set, update, child } from '@angular/fire/database';
import { Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(@Inject(Database) private db: Database) {}

  async getData(path: string): Promise<any> {
    try {
      const snapshot = await get(child(ref(this.db), path));
      if (snapshot.exists()) {
        console.log('Successful get data!');
        return snapshot.val();
      } else {
        console.log('No data available');
        return null;
      }
    } catch (error) {
      console.error('Error getting data:', error);
      return null;
    }
  }

  async writeData(path: string, data: any): Promise<void> {
    try {
      await set(ref(this.db, path), data);
      console.log('Data written successfully!');
    } catch (error) {
      console.error('Error writing data:', error);
    }
  }

  async update(path: string, data: any): Promise<void> {
    try {
      await update(ref(this.db, path), data);
      console.log('Data updated successfully!');
    } catch (error) {
      console.error('Error updating data:', error);
    }
  }
}
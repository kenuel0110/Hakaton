import { Injectable } from '@angular/core';

export interface Room {
  id: number;
  title: string;
  max_count: number;
  AR_link: string;
}

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private rooms: Room[] = [
    // Заполните этот массив данными о помещениях
    { id: 1, title: 'Комната 1', max_count: 20, AR_link: 'https://example.com/room1' },
    { id: 2, title: 'Комната 2', max_count: 10, AR_link: 'https://example.com/room2' },
    { id: 3, title: 'Комната 3', max_count: 30, AR_link: 'https://example.com/room3' },
  ];

  constructor() { }

  // Метод для получения всех помещений
  getRooms(): Room[] {
    return this.rooms;
  }

  // Метод для получения помещения по ID
  getRoomById(id: number): Room | undefined {
    return this.rooms.find(room => room.id === id);
  }
}
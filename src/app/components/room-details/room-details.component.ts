import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomService, Room } from '../../services/room.service';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent {

  room: Room | undefined;

  constructor(private route: ActivatedRoute, private roomService: RoomService) {
    this.route.paramMap.subscribe(params => {
      const roomId = parseInt(params.get('id') || '', 10);
      this.room = this.roomService.getRoomById(roomId);
    });
  }
}
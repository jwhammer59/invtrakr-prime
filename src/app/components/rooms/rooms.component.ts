import { Component, OnInit } from '@angular/core';

import { Room } from 'src/app/models/Room';
import { RoomsService } from 'src/app/services/rooms.service';

import { RoomLevel } from 'src/app/models/RoomLevel';
import { ROOM_LEVELS } from 'src/app/data/room-level-data';

import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})
export class RoomsComponent implements OnInit {
  roomDialog: boolean = false;
  submitted: boolean = false;

  roomLevels: RoomLevel[] = ROOM_LEVELS;

  rooms: Room[] = [];

  id?: string = '';

  room: Room = {
    roomName: '',
    roomLevel: '',
  };

  constructor(
    private roomsService: RoomsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig
  ) {
    this.roomsService.getRooms().subscribe((rooms) => (this.rooms = rooms));
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  newRoom() {
    this.submitted = false;
    this.roomDialog = true;
  }

  onSubmit(val: Room, id: string) {
    this.submitted = true;

    if (this.room.roomName.trim()) {
      if (this.room.id) {
        this.roomsService.updateRoom(val, id);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Room Updated',
          life: 3000,
        });
      } else {
        this.roomsService.addRoom(val);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Room Added!',
          life: 3000,
        });
      }
      this.hideDialog();
      this.resetForm();
    }
  }

  deleteRoom(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Room Deleted!!',
        });
        this.roomsService.deleteRoom(id);
        this.confirmationService.close();
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'You have rejected Room deletion.',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled Room deletion.',
            });
            break;
        }
        this.confirmationService.close();
      },
    });
  }

  hideDialog() {
    this.roomDialog = false;
    this.submitted = false;
  }

  editRoom(room: Room) {
    this.room = { ...room };
    this.id = this.room.id;
    this.roomDialog = true;
  }

  resetForm() {
    this.room.id = '';
    this.room.roomName = '';
    this.room.roomLevel = '';
  }
}

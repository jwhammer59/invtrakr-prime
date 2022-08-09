import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { Room } from '../models/Room';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  roomCollection!: AngularFirestoreCollection<Room>;
  roomDoc!: AngularFirestoreDocument<Room>;
  rooms!: Observable<Room[]>;
  room!: Observable<any>;

  dbPath: string = 'prime-inv-room';

  constructor(private afs: AngularFirestore) {
    this.roomCollection = afs.collection<Room>(`${this.dbPath}`);
  }

  getRooms() {
    this.rooms = this.roomCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Room;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
    return this.rooms;
  }

  getRoom(id: string): Observable<Room> {
    this.roomDoc = this.afs.doc<Room>(`${this.dbPath}/${id}`);
    this.room = this.roomDoc.snapshotChanges().pipe(
      map((action) => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as Room;
          data.id = action.payload.id;
          return data;
        }
      })
    );
    return this.room;
  }

  addRoom(room: Room) {
    this.roomCollection.add(room);
  }

  updateRoom(room: Room, id: string) {
    this.roomDoc = this.afs.doc(`${this.dbPath}/${id}`);
    this.roomDoc.update(room);
  }

  deleteRoom(room: Room['id']) {
    this.roomDoc = this.afs.doc(`${this.dbPath}/${room}`);
    this.roomDoc.delete();
  }
}

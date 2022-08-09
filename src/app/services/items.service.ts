import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { Item } from '../models/Item';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  itemCollection!: AngularFirestoreCollection<Item>;
  itemDoc!: AngularFirestoreDocument<Item>;
  items!: Observable<Item[]>;
  item!: Observable<any>;

  dbPath: string = 'prime-inv-item';

  constructor(private afs: AngularFirestore) {
    this.itemCollection = afs.collection<Item>(`${this.dbPath}`);
  }

  getItems() {
    this.items = this.itemCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Item;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
    return this.items;
  }

  getItem(id: string): Observable<Item> {
    this.itemDoc = this.afs.doc<Item>(`${this.dbPath}/${id}`);
    this.item = this.itemDoc.snapshotChanges().pipe(
      map((action) => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as Item;
          data.id = action.payload.id;
          return data;
        }
      })
    );
    return this.item;
  }

  addItem(item: Item) {
    this.itemCollection.add(item);
  }

  updateItem(item: Item, id: string) {
    this.itemDoc = this.afs.doc(`${this.dbPath}/${id}`);
    this.itemDoc.update(item);
  }

  deleteItem(item: Item['id']) {
    this.itemDoc = this.afs.doc(`${this.dbPath}/${item}`);
    this.itemDoc.delete();
  }
}

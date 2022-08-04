import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { Store } from 'src/app/models/Store';

@Injectable({
  providedIn: 'root',
})
export class StoresService {
  storeCollection!: AngularFirestoreCollection<Store>;
  storeDoc!: AngularFirestoreDocument<Store>;
  stores!: Observable<Store[]>;
  store!: Observable<any>;

  dbPath: string = 'prime-inv-store';

  constructor(private afs: AngularFirestore) {
    this.storeCollection = afs.collection<Store>(`${this.dbPath}`);
  }

  getStores() {
    this.stores = this.storeCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Store;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
    return this.stores;
  }

  getStore(id: string): Observable<Store> {
    this.storeDoc = this.afs.doc<Store>(`${this.dbPath}/${id}`);
    this.store = this.storeDoc.snapshotChanges().pipe(
      map((action) => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as Store;
          data.id = action.payload.id;
          return data;
        }
      })
    );
    return this.store;
  }

  addStore(store: Store) {
    this.storeCollection.add(store);
  }

  updateStore(store: Store, id: string) {
    this.storeDoc = this.afs.doc(`${this.dbPath}/${id}`);
    this.storeDoc.update(store);
  }

  deleteStore(store: Store['id']) {
    this.storeDoc = this.afs.doc(`${this.dbPath}/${store}`);
    this.storeDoc.delete();
  }
}

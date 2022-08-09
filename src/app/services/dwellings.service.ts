import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { Dwelling } from '../models/Dwelling';

@Injectable({
  providedIn: 'root',
})
export class DwellingsService {
  dwellingCollection!: AngularFirestoreCollection<Dwelling>;
  dwellingDoc!: AngularFirestoreDocument<Dwelling>;
  dwellings!: Observable<Dwelling[]>;
  dwelling!: Observable<any>;

  dbPath: string = 'prime-inv-dwelling';

  constructor(private afs: AngularFirestore) {
    this.dwellingCollection = afs.collection<Dwelling>(`${this.dbPath}`);
  }

  getDwellings() {
    this.dwellings = this.dwellingCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Dwelling;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
    return this.dwellings;
  }

  getDwelling(id: string): Observable<Dwelling> {
    this.dwellingDoc = this.afs.doc<Dwelling>(`${this.dbPath}/${id}`);
    this.dwelling = this.dwellingDoc.snapshotChanges().pipe(
      map((action) => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as Dwelling;
          data.id = action.payload.id;
          return data;
        }
      })
    );
    return this.dwelling;
  }

  addDwelling(dwelling: Dwelling) {
    this.dwellingCollection.add(dwelling);
  }

  updateDwelling(dwelling: Dwelling, id: string) {
    this.dwellingDoc = this.afs.doc(`${this.dbPath}/${id}`);
    this.dwellingDoc.update(dwelling);
  }

  deleteDwelling(dwelling: Dwelling['id']) {
    this.dwellingDoc = this.afs.doc(`${this.dbPath}/${dwelling}`);
    this.dwellingDoc.delete();
  }
}

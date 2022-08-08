import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { PaymentType } from '../models/PaymentType';

@Injectable({
  providedIn: 'root',
})
export class PaymentTypesService {
  paymentTypeCollection!: AngularFirestoreCollection<PaymentType>;
  paymentTypeDoc!: AngularFirestoreDocument<PaymentType>;
  paymentTypes!: Observable<PaymentType[]>;
  paymentType!: Observable<any>;

  dbPath: string = 'prime-inv-payment';

  constructor(private afs: AngularFirestore) {
    this.paymentTypeCollection = afs.collection<PaymentType>(`${this.dbPath}`);
  }

  getPaymentTypes() {
    this.paymentTypes = this.paymentTypeCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as PaymentType;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
    return this.paymentTypes;
  }

  getPaymentType(id: string): Observable<PaymentType> {
    this.paymentTypeDoc = this.afs.doc<PaymentType>(`${this.dbPath}/${id}`);
    this.paymentType = this.paymentTypeDoc.snapshotChanges().pipe(
      map((action) => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as PaymentType;
          data.id = action.payload.id;
          return data;
        }
      })
    );
    return this.paymentType;
  }

  addPaymentType(paymentType: PaymentType) {
    this.paymentTypeCollection.add(paymentType);
  }

  updatePaymentType(paymentType: PaymentType, id: string) {
    this.paymentTypeDoc = this.afs.doc(`${this.dbPath}/${id}`);
    this.paymentTypeDoc.update(paymentType);
  }

  deletePaymentType(paymentType: PaymentType['id']) {
    this.paymentTypeDoc = this.afs.doc(`${this.dbPath}/${paymentType}`);
    this.paymentTypeDoc.delete();
  }
}

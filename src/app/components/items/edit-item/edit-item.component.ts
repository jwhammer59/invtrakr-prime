import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Item } from 'src/app/models/Item';
import { ItemsService } from 'src/app/services/items.service';

import { Room } from 'src/app/models/Room';
import { RoomsService } from 'src/app/services/rooms.service';

import { Store } from 'src/app/models/Store';
import { StoresService } from 'src/app/services/stores.service';

import { PaymentType } from 'src/app/models/PaymentType';
import { PaymentTypesService } from 'src/app/services/payment-types.service';

import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css'],
})
export class EditItemComponent implements OnInit {
  submitted: boolean = false;

  editItemForm!: FormGroup;
  id!: string;
  userRef: any;

  paymentTypes$!: Observable<PaymentType[]>;
  paymentTypesArray: PaymentType[] = [];
  paymentTypesNameArray: String[] = [];

  rooms$!: Observable<Room[]>;
  roomsArray: Room[] = [];
  roomsNameArray: String[] = [];

  stores$!: Observable<Store[]>;
  storesArray: Store[] = [];
  storesNameArray: String[] = [];

  constructor(
    private itemsService: ItemsService,
    private roomsService: RoomsService,
    private storesService: StoresService,
    private paymentTypesService: PaymentTypesService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig
  ) {
    this.editItemForm = fb.group({
      itemOwnerID: this.id,
      itemDwellingName: '',
      itemName: ['', Validators.required],
      itemDesc: ['', Validators.required],
      itemMfg: '',
      itemModelNum: '',
      itemSerialNum: '',
      itemQty: ['', Validators.required],
      itemExtWarranty: false,
      itemPurchaseDate: ['', Validators.required],
      itemPurchasePrice: '',
      itemVendor: '',
      itemPaymentType: '',
      itemRoom: [{ roomName: '', roomLevel: '' }, Validators.required],
      itemNote: '',
    });
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.id = this.route.snapshot.params['id'];

    this.itemsService.getItem(this.id).subscribe((res) => {
      this.userRef = res;

      this.editItemForm = this.fb.group({
        itemOwnerID: [this.userRef.itemOwnerID],
        itemDwellingName: [this.userRef.itemDwellingName],
        itemName: [this.userRef.itemName],
        itemDesc: [this.userRef.itemDesc],
        itemMfg: [this.userRef.itemMfg],
        itemModelNum: [this.userRef.itemModelNum],
        itemSerialNum: [this.userRef.itemSerialNum],
        itemQty: [this.userRef.itemQty],
        itemExtWarranty: [this.userRef.itemExtWarranty],
        itemPurchaseDate: [this.userRef.itemPurchaseDate],
        itemPurchasePrice: [this.userRef.itemPurchasePrice],
        itemVendor: [this.userRef.itemVendor],
        itemPaymentType: [this.userRef.itemPaymentType],
        itemRoom: [this.userRef.itemRoom],
        itemNote: [this.userRef.itemNote],
      });
    });

    this.paymentTypes$ = this.paymentTypesService.getPaymentTypes();
    this.paymentTypes$.subscribe((data) => {
      this.paymentTypesArray = data;
      this.getPaymentTypesName(this.paymentTypesArray);
    });

    this.rooms$ = this.roomsService.getRooms();
    this.rooms$.subscribe((data) => {
      this.roomsArray = data;
      this.getRoomsName(this.roomsArray);
    });

    this.stores$ = this.storesService.getStores();
    this.stores$.subscribe((data) => {
      this.storesArray = data;
      this.getStoresName(this.storesArray);
    });
  }

  getPaymentTypesName(data: PaymentType[]) {
    this.paymentTypesNameArray = [];
    data.map((el) => {
      let pTypeToStore = '';
      pTypeToStore = el.paymentTypeName;
      this.paymentTypesNameArray.push(pTypeToStore);
    });
  }

  getRoomsName(data: Room[]) {
    this.roomsNameArray = [];
    data.map((el) => {
      let roomToStore = '';
      roomToStore = el.roomName;
      this.roomsNameArray.push(roomToStore);
    });
  }

  getStoresName(data: Store[]) {
    this.storesNameArray = [];
    data.map((el) => {
      let storeToStore = '';
      storeToStore = el.storeName;
      this.storesNameArray.push(storeToStore);
    });
  }

  onSubmit({ value, valid }: { value: Item; valid: boolean }) {
    this.submitted = true;
    let tempID = this.id;

    if (!valid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Form Is Invalid',
        detail: 'Check form for errors!',
        life: 3000,
      });
    } else {
      this.itemsService.updateItem(value, tempID);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Item Updated!',
        life: 3000,
      });
      this.submitted = false;
      setTimeout(() => {
        this.router.navigate(['/items']);
      }, 2000);
    }
  }
}

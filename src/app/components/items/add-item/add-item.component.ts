import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Item } from 'src/app/models/Item';
import { ItemsService } from 'src/app/services/items.service';

import { Dwelling } from 'src/app/models/Dwelling';
import { DwellingsService } from 'src/app/services/dwellings.service';

import { Room } from 'src/app/models/Room';
import { RoomsService } from 'src/app/services/rooms.service';

import { Store } from 'src/app/models/Store';
import { StoresService } from 'src/app/services/stores.service';

import { PaymentType } from 'src/app/models/PaymentType';
import { PaymentTypesService } from 'src/app/services/payment-types.service';

import { MessageService, PrimeNGConfig } from 'primeng/api';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit {
  submitted: boolean = false;

  addItemForm!: FormGroup;

  paymentTypes$!: Observable<PaymentType[]>;
  paymentTypesArray: PaymentType[] = [];
  paymentTypesNameArray: String[] = [];

  rooms$!: Observable<Room[]>;
  roomsArray: Room[] = [];
  roomsNameArray: String[] = [];

  stores$!: Observable<Store[]>;
  storesArray: Store[] = [];
  storesNameArray: String[] = [];

  id: string = '';
  dwelling: Dwelling = {
    dwellingName: '',
    dwellingAddress1: '',
    dwellingAddress2: '',
    dwellingCity: '',
    dwellingState: '',
    dwellingZipcode: 0,
  };

  constructor(
    private itemsService: ItemsService,
    private dwellingsService: DwellingsService,
    private roomsService: RoomsService,
    private storesService: StoresService,
    private paymentTypesService: PaymentTypesService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig
  ) {
    this.addItemForm = fb.group({
      itemOwnerID: this.id,
      itemDwellingName: 'Dwelling Name!',
      itemName: ['', Validators.required],
      itemDesc: ['', Validators.required],
      itemMfg: '',
      itemModelNum: '',
      itemSerialNum: '',
      itemQty: [0, Validators.required],
      itemExtWarranty: false,
      itemPurchaseDate: ['', Validators.required],
      itemPurchasePrice: '',
      itemVendor: '',
      itemPaymentType: '',
      itemRoom: ['', Validators.required],
      itemNote: '',
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.primengConfig.ripple = true;
    this.dwellingsService
      .getDwelling(this.id)
      .subscribe((dwelling) => (this.dwelling = dwelling));

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

  loadDwellingNameAndId() {
    this.addItemForm.controls['itemDwellingName'].patchValue(
      this.dwelling.dwellingName
    );
    this.addItemForm.controls['itemOwnerID'].patchValue(this.id);
    console.log(this.id, this.dwelling.dwellingName);
  }

  onSubmit({ value, valid }: { value: Item; valid: boolean }) {
    this.submitted = true;

    if (!valid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Form Is Invalid',
        detail: 'Check form for errors!',
        life: 3000,
      });
    } else {
      this.itemsService.addItem(value);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Item Added!',
        life: 3000,
      });
      this.submitted = false;
      setTimeout(() => {
        this.router.navigate(['/dwellings']);
      }, 2000);
    }
  }
}

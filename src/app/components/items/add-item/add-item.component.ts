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

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit {
  submitted: boolean = false;

  addItemForm!: FormGroup;

  paymentTypes: PaymentType[] = [];
  rooms: Room[] = [];
  stores: Store[] = [];

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
      itemPurchaseDate: '',
      itemPurchasePrice: '',
      itemVendor: '',
      itemPaymentType: '',
      itemRoom: [{ roomName: '', roomLevel: '' }, Validators.required],
      itemNote: '',
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.primengConfig.ripple = true;
    this.dwellingsService
      .getDwelling(this.id)
      .subscribe((dwelling) => (this.dwelling = dwelling));
    this.roomsService.getRooms().subscribe((rooms) => (this.rooms = rooms));
    this.paymentTypesService
      .getPaymentTypes()
      .subscribe((paymentTypes) => (this.paymentTypes = paymentTypes));
    this.storesService
      .getStores()
      .subscribe((stores) => (this.stores = stores));
  }

  loadDwellingNameAndId() {
    this.addItemForm.controls['itemDwellingName'].patchValue(
      this.dwelling.dwellingName
    );
    this.addItemForm.controls['itemOwnerID'].patchValue(this.dwelling.id);
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

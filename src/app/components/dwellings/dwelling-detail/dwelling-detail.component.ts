import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Dwelling } from 'src/app/models/Dwelling';
import { DwellingsService } from 'src/app/services/dwellings.service';

import { Item } from 'src/app/models/Item';
import { ItemsService } from 'src/app/services/items.service';

import { PrimeNGConfig } from 'primeng/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-dwelling-detail',
  templateUrl: './dwelling-detail.component.html',
  styleUrls: ['./dwelling-detail.component.css'],
})
export class DwellingDetailComponent implements OnInit {
  id: string = '';

  items: Item[] = [];
  allItems$!: Observable<Item[]>;
  itemsByDwelling$!: Observable<any>;

  dwelling: Dwelling = {
    dwellingName: '',
    dwellingAddress1: '',
    dwellingAddress2: '',
    dwellingCity: '',
    dwellingState: '',
    dwellingZipcode: '',
  };

  item: Item = {
    itemOwnerID: '',
    itemDwellingName: '',
    itemName: '',
    itemDesc: '',
    itemMfg: '',
    itemModelNum: '',
    itemSerialNum: '',
    itemQty: '',
    itemExtWarranty: false,
    itemPurchaseDate: '',
    itemPurchasePrice: '',
    itemVendor: '',
    itemPaymentType: '',
    itemRoom: { roomName: '', roomLevel: '' },
    itemNote: '',
  };

  constructor(
    private dwellingsService: DwellingsService,
    private itemsService: ItemsService,
    private route: ActivatedRoute,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.primengConfig.ripple = true;
    this.dwellingsService.getDwelling(this.id).subscribe((dwelling) => {
      this.dwelling = dwelling;
    });

    // Get all itmes, then filter by Dwelling ID
    this.allItems$ = this.itemsService.getItems();
    this.itemsByDwelling$ = this.allItems$.pipe(
      map((items) => items.filter((item) => item.itemOwnerID === this.id))
    );

    // Subscribe to all events by Dwelling ID
    this.itemsByDwelling$.subscribe((itemData) => {
      this.items = itemData;
    });
  }
}

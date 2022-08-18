import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Item } from 'src/app/models/Item';
import { ItemsService } from 'src/app/services/items.service';

import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css'],
})
export class ItemDetailComponent implements OnInit {
  id: string = '';

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
    itemRoom: '',
    itemNote: '',
  };

  constructor(
    private itemsService: ItemsService,
    private route: ActivatedRoute,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.primengConfig.ripple = true;
    this.itemsService.getItem(this.id).subscribe((item) => {
      this.item = item;
    });
  }
}

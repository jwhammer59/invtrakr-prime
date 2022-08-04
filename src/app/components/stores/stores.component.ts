import { Component, OnInit } from '@angular/core';

import { PrimeNGConfig } from 'primeng/api';

import { Store } from 'src/app/models/Store';
import { StoresService } from 'src/app/services/stores.service';

import { State } from 'src/app/models/State';
import { STATES } from 'src/app/data/state-data';

import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from 'primeng/api';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css'],
})
export class StoresComponent implements OnInit {
  storeDialog: boolean = false;
  submitted: boolean = false;

  states: State[] = STATES;

  stores: Store[] = [];

  id?: string = '';

  store: Store = {
    id: '',
    storeName: '',
    storeCity: '',
    storeState: '',
  };

  constructor(
    private storesService: StoresService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig
  ) {
    this.storesService
      .getStores()
      .subscribe((stores) => (this.stores = stores));
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  newStore() {
    this.submitted = false;
    this.storeDialog = true;
  }

  onSubmit(val: Store, id: string) {
    this.submitted = true;

    if (this.store.storeName.trim()) {
      if (this.store.id) {
        this.storesService.updateStore(val, id);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Store Updated',
          life: 3000,
        });
      } else {
        this.storesService.addStore(val);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Store Added!',
          life: 3000,
        });
      }
      this.hideDialog();
      this.resetForm();
    }
  }

  deleteStore(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Store Deleted!!',
        });
        this.storesService.deleteStore(id);
        this.confirmationService.close();
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'You have rejected Store deletion.',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled Store deletion.',
            });
            break;
        }
        this.confirmationService.close();
      },
    });
  }

  hideDialog() {
    this.storeDialog = false;
    this.submitted = false;
  }

  editStore(store: Store) {
    this.store = { ...store };
    this.id = this.store.id;
    this.storeDialog = true;
  }

  resetForm() {
    this.store.id = '';
    this.store.storeCity = '';
    this.store.storeName = '';
    this.store.storeState = '';
  }
}

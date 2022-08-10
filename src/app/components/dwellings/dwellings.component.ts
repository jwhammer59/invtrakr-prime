import { Component, OnInit } from '@angular/core';

import { Dwelling } from 'src/app/models/Dwelling';
import { DwellingsService } from 'src/app/services/dwellings.service';

import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';

@Component({
  selector: 'app-dwellings',
  templateUrl: './dwellings.component.html',
  styleUrls: ['./dwellings.component.css'],
})
export class DwellingsComponent implements OnInit {
  dwellings: Dwelling[] = [];

  constructor(
    private dwellingsService: DwellingsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig
  ) {
    this.dwellingsService
      .getDwellings()
      .subscribe((dwellings) => (this.dwellings = dwellings));
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  deleteDwelling(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Dwelling Deleted!!',
        });
        this.dwellingsService.deleteDwelling(id);
        this.confirmationService.close();
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'You have rejected Dwelling deletion.',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled Dwelling deletion.',
            });
            break;
        }
        this.confirmationService.close();
      },
    });
  }
}

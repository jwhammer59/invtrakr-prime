import { Component, OnInit } from '@angular/core';

import { PaymentType } from 'src/app/models/PaymentType';
import { PaymentTypesService } from 'src/app/services/payment-types.service';

import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';

@Component({
  selector: 'app-payment-types',
  templateUrl: './payment-types.component.html',
  styleUrls: ['./payment-types.component.css'],
})
export class PaymentTypesComponent implements OnInit {
  paymentTypeDialog: boolean = false;
  submitted: boolean = false;

  paymentTypes: PaymentType[] = [];

  id?: string = '';

  paymentType: PaymentType = {
    id: '',
    paymentTypeName: '',
    paymentTypeIssuedBy: '',
  };

  constructor(
    private paymentTypesService: PaymentTypesService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig
  ) {
    this.paymentTypesService
      .getPaymentTypes()
      .subscribe((paymentTypes) => (this.paymentTypes = paymentTypes));
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  newPaymentType() {
    this.submitted = false;
    this.paymentTypeDialog = true;
  }

  onSubmit(val: PaymentType, id: string) {
    this.submitted = true;

    if (this.paymentType.paymentTypeName.trim()) {
      if (this.paymentType.id) {
        this.paymentTypesService.updatePaymentType(val, id);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Store Updated',
          life: 3000,
        });
      } else {
        this.paymentTypesService.addPaymentType(val);
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

  deletePaymentType(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Payment Type Deleted!!',
        });
        this.paymentTypesService.deletePaymentType(id);
        this.confirmationService.close();
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'You have rejected Payment Type deletion.',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled Payment Type deletion.',
            });
            break;
        }
        this.confirmationService.close();
      },
    });
  }

  hideDialog() {
    this.paymentTypeDialog = false;
    this.submitted = false;
  }

  editPaymentType(paymentType: PaymentType) {
    this.paymentType = { ...paymentType };
    this.id = this.paymentType.id;
    this.paymentTypeDialog = true;
  }

  resetForm() {
    this.paymentType.id = '';
    this.paymentType.paymentTypeName = '';
    this.paymentType.paymentTypeIssuedBy = '';
  }
}

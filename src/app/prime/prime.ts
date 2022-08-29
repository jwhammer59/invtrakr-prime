import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Container Modules
import { MenubarModule } from 'primeng/menubar';
import { SlideMenuModule } from 'primeng/slidemenu';
import { PanelModule } from 'primeng/panel';
import { AccordionModule } from 'primeng/accordion';

import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PasswordModule } from 'primeng/password';
import { InputMaskModule } from 'primeng/inputmask';
import { KeyFilterModule } from 'primeng/keyfilter';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { BadgeModule } from 'primeng/badge';

import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';

import { StyleClassModule } from 'primeng/styleclass';

import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

const prime = [
  ButtonModule,
  MenubarModule,
  SlideMenuModule,
  InputTextModule,
  InputTextareaModule,
  InputMaskModule,
  KeyFilterModule,
  PasswordModule,
  DropdownModule,
  CalendarModule,
  BadgeModule,
  CheckboxModule,
  PanelModule,
  AccordionModule,
  ToastModule,
  ToolbarModule,
  TableModule,
  CardModule,
  TabViewModule,
  MessagesModule,
  MessageModule,
  ConfirmDialogModule,
  DialogModule,
  StyleClassModule,
  RippleModule,
  TooltipModule,
  ProgressSpinnerModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, prime],
  exports: [prime],
})
export class PrimeModule {}

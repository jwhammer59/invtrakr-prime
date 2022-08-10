import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PrimeModule } from './prime/prime';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';

// Angular Fire Modules
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';

// Component Imports
import { HomeComponent } from './components/common/home/home.component';
import { NavComponent } from './components/common/nav/nav.component';
import { LoginComponent } from './components/auth/login/login.component';

// Prime NG Message Modules
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { StoresComponent } from './components/stores/stores.component';

// Auth Imports
import { AuthService } from './services/auth.service';
import { AuthGuard } from './components/auth/auth-guard';
import { PaymentTypesComponent } from './components/payment-types/payment-types.component';
import { DwellingsComponent } from './components/dwellings/dwellings.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ItemsComponent } from './components/items/items.component';
import { AddItemComponent } from './components/items/add-item/add-item.component';
import { EditItemComponent } from './components/items/edit-item/edit-item.component';
import { ItemDetailComponent } from './components/items/item-detail/item-detail.component';
import { AddDwellingComponent } from './components/dwellings/add-dwelling/add-dwelling.component';
import { EditDwellingComponent } from './components/dwellings/edit-dwelling/edit-dwelling.component';
import { DwellingDetailComponent } from './components/dwellings/dwelling-detail/dwelling-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    LoginComponent,
    StoresComponent,
    PaymentTypesComponent,
    DwellingsComponent,
    RoomsComponent,
    DashboardComponent,
    ItemsComponent,
    AddItemComponent,
    EditItemComponent,
    ItemDetailComponent,
    AddDwellingComponent,
    EditDwellingComponent,
    DwellingDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  exports: [PrimeModule],
  providers: [MessageService, ConfirmationService, AuthGuard, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}

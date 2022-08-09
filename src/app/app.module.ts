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

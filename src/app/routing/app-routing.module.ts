import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../components/auth/auth-guard';
import { LoginComponent } from '../components/auth/login/login.component';
import { HomeComponent } from '../components/common/home/home.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { DwellingsComponent } from '../components/dwellings/dwellings.component';
import { PaymentTypesComponent } from '../components/payment-types/payment-types.component';
import { RoomsComponent } from '../components/rooms/rooms.component';
import { StoresComponent } from '../components/stores/stores.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dwellings',
    component: DwellingsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'rooms',
    component: RoomsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'stores',
    component: StoresComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'payment-types',
    component: PaymentTypesComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

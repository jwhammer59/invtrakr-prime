import { compileClassMetadata } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../components/auth/auth-guard';
import { LoginComponent } from '../components/auth/login/login.component';
import { HomeComponent } from '../components/common/home/home.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { AddDwellingComponent } from '../components/dwellings/add-dwelling/add-dwelling.component';
import { DwellingDetailComponent } from '../components/dwellings/dwelling-detail/dwelling-detail.component';
import { DwellingsComponent } from '../components/dwellings/dwellings.component';
import { EditDwellingComponent } from '../components/dwellings/edit-dwelling/edit-dwelling.component';
import { AddItemComponent } from '../components/items/add-item/add-item.component';
import { EditItemComponent } from '../components/items/edit-item/edit-item.component';
import { ItemDetailComponent } from '../components/items/item-detail/item-detail.component';
import { ItemsComponent } from '../components/items/items.component';
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
    path: 'items',
    component: ItemsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-item/:id',
    component: AddItemComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-item/:id',
    component: EditItemComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'item-detail/:id',
    component: ItemDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dwellings',
    component: DwellingsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-dwelling',
    component: AddDwellingComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-dwelling/:id',
    component: EditDwellingComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dwelling-detail/:id',
    component: DwellingDetailComponent,
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

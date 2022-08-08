import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../components/auth/auth-guard';
import { LoginComponent } from '../components/auth/login/login.component';
import { HomeComponent } from '../components/common/home/home.component';
import { PaymentTypesComponent } from '../components/payment-types/payment-types.component';
import { StoresComponent } from '../components/stores/stores.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
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

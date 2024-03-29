import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignupComponent} from "./auth/signup/signup.component";
import {HomepageComponent} from "./utils/homepage/homepage.component";
import {SigninComponent} from "./auth/signin/signin.component";
import {UserHomepageComponent} from "./utils/user-homepage/user-homepage.component";
import {ProfileComponent} from "./profile/profile.component";
import {HistoryComponent} from "./history/history/history.component";
import {PaymentServicesComponent} from "./user-payment-services/payment-services/payment-services.component";
import {PaymentComponent} from "./choose-payment/payment/payment.component";
import {PaymentServiceManagerComponent} from "./admin/payment-service-manager/payment-service-manager.component";
import {UserManagerComponent} from "./admin/user-manager/user-manager.component";
import {PaymentResultComponent} from "./choose-payment/payment-result/payment-result/payment-result.component";
import {
  PaymentResultEmptyComponent
} from "./choose-payment/payment-result/payment-result-empty/payment-result-empty.component";
import {AuthGuard} from "./auth.guard";
import {ConfirmAccountComponent} from "./confirm-account/confirm-account.component";

const routes: Routes = [
  {path: '', component: HomepageComponent, canActivate: [AuthGuard], data: {authorizedAccess: []}},
  {
    path: 'home',
    component: UserHomepageComponent,
    canActivate: [AuthGuard],
    data: {authorizedAccess: ['ROLE_ADMIN', 'ROLE_USER']}
  },
  {
    path: 'user-manager',
    component: UserManagerComponent,
    canActivate: [AuthGuard],
    data: {authorizedAccess: ['ROLE_ADMIN']}},
  {
    path: 'signup',
    component: SignupComponent},
  {
    path: 'signin',
    component: SigninComponent},
  {
    path: 'payment-services',
    component: PaymentServicesComponent,
    canActivate: [AuthGuard],
    data: {authorizedAccess: ['ROLE_USER']}},
  {
    path: 'payment-service-manager',
    component: PaymentServiceManagerComponent,
    canActivate: [AuthGuard],
    data: {authorizedAccess: ['ROLE_ADMIN']}
  },
  {
    path: 'history',
    component: HistoryComponent,
    canActivate: [AuthGuard],
    data: {authorizedAccess: ['ROLE_USER']}},
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: {authorizedAccess: ['ROLE_ADMIN', 'ROLE_USER']}},
  {
    path: 'confirm-account/:token',
    component: ConfirmAccountComponent},
  {
    path: 'payment',
    component: PaymentResultEmptyComponent,
    children: [
      {path: 'success', component: PaymentResultComponent},
      {path: 'fail', component: PaymentResultComponent},
      {path: 'error', component: PaymentResultComponent},
      {path: ':id', component: PaymentComponent},
    ]
  },
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      scrollPositionRestoration: 'enabled',
      onSameUrlNavigation: 'reload',
      anchorScrolling: 'enabled'
    })
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}


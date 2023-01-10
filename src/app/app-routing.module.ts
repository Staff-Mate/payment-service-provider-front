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

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'user', component: UserHomepageComponent},
  {path: 'user-manager', component: UserManagerComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'payment-services', component: PaymentServicesComponent},
  {path: 'payment-service-manager', component: PaymentServiceManagerComponent},
  {path: 'history', component: HistoryComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'payment',
    component:PaymentResultEmptyComponent,
  children:[
    {path:'success', component: PaymentResultComponent},
    {path:'fail', component: PaymentResultComponent},
    {path:'error', component: PaymentResultComponent},
    {path:':id', component: PaymentComponent},
  ]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

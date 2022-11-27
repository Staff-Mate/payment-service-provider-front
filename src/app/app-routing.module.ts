import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignupComponent} from "./auth/signup/signup.component";
import {HomepageComponent} from "./utils/homepage/homepage.component";
import {SigninComponent} from "./auth/signin/signin.component";
import {UserHomepageComponent} from "./utils/user-homepage/user-homepage.component";
import {ProfileComponent} from "./profile/profile/profile.component";
import {HistoryComponent} from "./history/history/history.component";
import {PaymentServicesComponent} from "./payment-services/payment-services/payment-services.component";

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'user', component: UserHomepageComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'payment-services', component: PaymentServicesComponent},
  {path: 'history', component: HistoryComponent},
  {path: 'profile', component: ProfileComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

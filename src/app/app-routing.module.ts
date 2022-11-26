import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignupComponent} from "./auth/signup/signup.component";
import {HomepageComponent} from "./utils/homepage/homepage.component";
import {SigninComponent} from "./auth/signin/signin.component";
import {UserHomepageComponent} from "./utils/user-homepage/user-homepage.component";
import {DevelopersComponent} from "./developers/developers/developers.component";
import {ProfileComponent} from "./profile/profile/profile.component";
import {HistoryComponent} from "./history/history/history.component";
import {ServicesComponent} from "./services/services/services.component";

const routes: Routes = [
  {path:'',component:HomepageComponent},
  {path:'user',component:UserHomepageComponent},
  {path: 'signup', component:SignupComponent},
  {path: 'signin', component:SigninComponent},
  {path: 'services', component:ServicesComponent},
  {path: 'history', component:HistoryComponent},
  {path: 'profile', component:ProfileComponent},
  {path: 'developers', component:DevelopersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

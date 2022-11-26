import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignupComponent} from "./auth/signup/signup.component";
import {HomepageComponent} from "./utils/homepage/homepage.component";
import {SigninComponent} from "./auth/signin/signin.component";

const routes: Routes = [
  {path:'',component:HomepageComponent},
  {path: 'signup', component:SignupComponent},
  {path: 'signin', component:SigninComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

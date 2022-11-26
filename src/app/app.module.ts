import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './utils/header/header.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomepageComponent } from './utils/homepage/homepage.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {GeoService} from "./utils/service/geo.service";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { SigninComponent } from './auth/signin/signin.component';
import { UserHomepageComponent } from './utils/user-homepage/user-homepage.component';
import { ServicesComponent } from './services/services/services.component';
import { HistoryComponent } from './history/history/history.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { DevelopersComponent } from './developers/developers/developers.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    HomepageComponent,
    SigninComponent,
    UserHomepageComponent,
    ServicesComponent,
    HistoryComponent,
    ProfileComponent,
    DevelopersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatAutocompleteModule,
  ],
  providers: [GeoService],
  bootstrap: [AppComponent]
})
export class AppModule { }

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
import { PaymentServicesComponent } from './payment-services/payment-services/payment-services.component';
import { HistoryComponent } from './history/history/history.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { DevelopersComponent } from './developers/developers/developers.component';
import {MatListModule} from "@angular/material/list";
import {PaymentServicesService} from "./payment-services/services/payment-services.service";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    HomepageComponent,
    SigninComponent,
    UserHomepageComponent,
    PaymentServicesComponent,
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
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule
  ],
  providers: [GeoService,PaymentServicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }

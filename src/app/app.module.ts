import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from './utils/header/header.component';
import {SignupComponent} from './auth/signup/signup.component';
import {HomepageComponent} from './utils/homepage/homepage.component';
import {MatIconModule} from "@angular/material/icon";
import {ReactiveFormsModule} from "@angular/forms";
import {SigninComponent} from './auth/signin/signin.component';
import {UserHomepageComponent} from './utils/user-homepage/user-homepage.component';
import {PaymentServicesComponent} from './user-payment-services/payment-services/payment-services.component';
import {HistoryComponent} from './history/history/history.component';
import {ProfileComponent} from './profile/profile.component';
import {MatSortModule} from "@angular/material/sort";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {PaymentComponent} from './choose-payment/payment/payment.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {PaymentServiceManagerComponent} from './admin/payment-service-manager/payment-service-manager.component';
import {UserManagerComponent} from './admin/user-manager/user-manager.component';
import {FooterComponent} from './utils/footer/footer.component';
import {AuthInterceptor} from "./auth/auth.interceptor";
import {
  MAT_LEGACY_SNACK_BAR_DEFAULT_OPTIONS as MAT_SNACK_BAR_DEFAULT_OPTIONS
} from "@angular/material/legacy-snack-bar";
import {PaymentResultComponent} from './choose-payment/payment-result/payment-result/payment-result.component';
import {
  PaymentResultEmptyComponent
} from './choose-payment/payment-result/payment-result-empty/payment-result-empty.component';
import {
  EnablePaymentMethodDialogComponent
} from './user-payment-services/enable-paymeny-method-dialog/enable-payment-method-dialog.component';
import {COMMA, SPACE} from "@angular/cdk/keycodes";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatListModule} from "@angular/material/list";
import {MAT_CHIPS_DEFAULT_OPTIONS, MatChipsModule} from "@angular/material/chips";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatTableModule} from "@angular/material/table";
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from "@angular/material/dialog";
import {MatCardModule} from "@angular/material/card";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatButtonModule} from "@angular/material/button";
import {
  NewPaymentServiceDialogComponent
} from './admin/new-payment-service-dialog/new-payment-service-dialog.component';

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
    PaymentComponent,
    PaymentServiceManagerComponent,
    UserManagerComponent,
    FooterComponent,
    PaymentResultComponent,
    PaymentResultEmptyComponent,
    EnablePaymentMethodDialogComponent,
    NewPaymentServiceDialogComponent
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
    HttpClientModule,
    MatGridListModule,
    MatTooltipModule,
    MatCardModule,
    MatProgressBarModule,
    MatDialogModule,
    MatSnackBarModule,
    MatChipsModule,
  ],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {hasBackdrop: true}
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {duration: 2500}
    },
    {
      provide: MAT_CHIPS_DEFAULT_OPTIONS,
      useValue: {
        separatorKeyCodes: [COMMA, SPACE]
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

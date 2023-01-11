import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from './utils/header/header.component';
import {SignupComponent} from './auth/signup/signup.component';
import {HomepageComponent} from './utils/homepage/homepage.component';
import {MatLegacyFormFieldModule as MatFormFieldModule} from "@angular/material/legacy-form-field";
import {MatLegacyInputModule as MatInputModule} from "@angular/material/legacy-input";
import {MatIconModule} from "@angular/material/icon";
import {MatLegacySelectModule as MatSelectModule} from "@angular/material/legacy-select";
import {ReactiveFormsModule} from "@angular/forms";
import {MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";
import {MatLegacyAutocompleteModule as MatAutocompleteModule} from "@angular/material/legacy-autocomplete";
import {SigninComponent} from './auth/signin/signin.component';
import {UserHomepageComponent} from './utils/user-homepage/user-homepage.component';
import {PaymentServicesComponent} from './user-payment-services/payment-services/payment-services.component';
import {HistoryComponent} from './history/history/history.component';
import {ProfileComponent} from './profile/profile.component';
import {MatLegacyListModule as MatListModule} from "@angular/material/legacy-list";
import {MatLegacyTableModule as MatTableModule} from "@angular/material/legacy-table";
import {MatLegacyPaginatorModule as MatPaginatorModule} from "@angular/material/legacy-paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {PaymentComponent} from './choose-payment/payment/payment.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {PaymentServiceManagerComponent} from './admin/payment-service-manager/payment-service-manager.component';
import {UserManagerComponent} from './admin/user-manager/user-manager.component';
import {MatLegacyTooltipModule as MatTooltipModule} from "@angular/material/legacy-tooltip";
import {FooterComponent} from './utils/footer/footer.component';
import {MatLegacyCardModule as MatCardModule} from "@angular/material/legacy-card";
import {AuthInterceptor} from "./auth/auth.interceptor";
import {MAT_LEGACY_SNACK_BAR_DEFAULT_OPTIONS as MAT_SNACK_BAR_DEFAULT_OPTIONS, MatLegacySnackBarModule as MatSnackBarModule} from "@angular/material/legacy-snack-bar";
import {MAT_LEGACY_DIALOG_DEFAULT_OPTIONS as MAT_DIALOG_DEFAULT_OPTIONS, MatLegacyDialog as MatDialog, MatLegacyDialogModule as MatDialogModule} from "@angular/material/legacy-dialog";
import {PaymentResultComponent} from './choose-payment/payment-result/payment-result/payment-result.component';
import {
  PaymentResultEmptyComponent
} from './choose-payment/payment-result/payment-result-empty/payment-result-empty.component';
import {MatLegacyProgressBarModule as MatProgressBarModule} from "@angular/material/legacy-progress-bar";
import { NewPaymentMethodDialogComponent } from './user-payment-services/new-paymeny-method-dialog/new-payment-method-dialog.component';
import {MAT_LEGACY_CHIPS_DEFAULT_OPTIONS as MAT_CHIPS_DEFAULT_OPTIONS, MatLegacyChip as MatChip, MatLegacyChipsModule as MatChipsModule} from "@angular/material/legacy-chips";
import {COMMA, SPACE} from "@angular/cdk/keycodes";
import {MatLegacyChipListboxHarness as MatChipListboxHarness} from "@angular/material/legacy-chips/testing";

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
    NewPaymentMethodDialogComponent
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

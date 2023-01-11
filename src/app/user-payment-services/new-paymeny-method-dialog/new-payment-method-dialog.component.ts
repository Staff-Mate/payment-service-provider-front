import {Component, Inject, OnInit} from '@angular/core';
import {MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef} from "@angular/material/legacy-dialog";
import {PaymentMethod} from "../dto/payment-method.model";
import {FormControl, FormGroup} from "@angular/forms";
import {PaymentMethodsService} from "../services/payment-methods.service";
import {MatLegacySnackBar as MatSnackBar} from "@angular/material/legacy-snack-bar";

@Component({
  selector: 'app-new-payment-method-dialog',
  templateUrl: './new-payment-method-dialog.component.html',
  styleUrls: ['./new-payment-method-dialog.component.scss', '../../styles/signform.component.scss']
})
export class NewPaymentMethodDialogComponent implements OnInit {
  hide: boolean;
  form: FormGroup;
  secret: FormControl;
  id: FormControl;
  paymentMethod: FormControl;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { paymentService: PaymentMethod }, private paymentMethodService: PaymentMethodsService, private dialogRef: MatDialogRef<NewPaymentMethodDialogComponent>, private _snackBar: MatSnackBar) {
    this.hide = true;
  }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {

    this.id = new FormControl('');
    this.secret = new FormControl('')
    this.paymentMethod = new FormControl(this.data.paymentService)

    this.form = new FormGroup({
      userId: this.id,
      userSecret: this.secret,
      paymentMethod: this.paymentMethod
    })
  }

  enablePaymentService() {
    this.paymentMethodService.enablePaymentService(this.form.value).subscribe({
      next: (response) => {
        this.dialogRef.close({activeServices: response})
      }, error: () => {
        this._snackBar.open("Something went wrong. Please try again!", 'X', {
          duration: 2000
        });
      }
    })
  }
}
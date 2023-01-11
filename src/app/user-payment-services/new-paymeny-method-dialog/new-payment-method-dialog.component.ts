import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PaymentMethod} from "../dto/payment-method.model";
import {UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {PaymentMethodsService} from "../services/payment-methods.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-new-payment-method-dialog',
  templateUrl: './new-payment-method-dialog.component.html',
  styleUrls: ['./new-payment-method-dialog.component.scss', './../../styles/signform.component.scss']
})
export class NewPaymentMethodDialogComponent implements OnInit {
  hide: boolean;
  form: UntypedFormGroup;
  secret: UntypedFormControl;
  id: UntypedFormControl;
  paymentMethod: UntypedFormControl;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { paymentService: PaymentMethod }, private paymentMethodService: PaymentMethodsService, private dialogRef: MatDialogRef<NewPaymentMethodDialogComponent>, private _snackBar: MatSnackBar) {
    this.hide = true;
  }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {

    this.id = new UntypedFormControl('');
    this.secret = new UntypedFormControl('')
    this.paymentMethod = new UntypedFormControl(this.data.paymentService)

    this.form = new UntypedFormGroup({
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

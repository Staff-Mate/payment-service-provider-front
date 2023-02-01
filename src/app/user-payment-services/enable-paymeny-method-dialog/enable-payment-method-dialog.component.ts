import {Component, Inject, OnInit} from '@angular/core';

import {PaymentMethodDto} from "../dto/payment-method.dto";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-enable-payment-method-dialog',
  templateUrl: './enable-payment-method-dialog.component.html',
  styleUrls: ['./enable-payment-method-dialog.component.scss', '../../styles/signform.component.scss']
})
export class EnablePaymentMethodDialogComponent implements OnInit {
  hide: boolean;
  form: FormGroup;
  secret: FormControl;
  id: FormControl;
  paymentMethod: FormControl;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { paymentService: PaymentMethodDto }, private userService: UserService, private dialogRef: MatDialogRef<EnablePaymentMethodDialogComponent>, private _snackBar: MatSnackBar) {
    this.hide = true;
  }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {

    this.id = new FormControl('', this.data.paymentService.requiresCredentialsId ? Validators.required : {});
    this.secret = new FormControl('', this.data.paymentService.requiresCredentialsSecret ? Validators.required : {})
    this.paymentMethod = new FormControl(this.data.paymentService)

    this.form = new FormGroup({
      userId: this.id,
      userSecret: this.secret,
      paymentMethod: this.paymentMethod
    })
  }

  enablePaymentService() {
    this.userService.enablePaymentService(this.form.value).subscribe({
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

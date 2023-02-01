import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PaymentMethodService} from "../services/payment-method.service";
import {PaymentMethodDto} from "../../user-payment-services/dto/payment-method.dto";

@Component({
  selector: 'app-new-payment-service-dialog',
  templateUrl: './new-payment-service-dialog.component.html',
  styleUrls: ['./new-payment-service-dialog.component.scss', '../../styles/signform.component.scss']
})
export class NewPaymentServiceDialogComponent {
  hide: boolean;
  form: FormGroup;
  id: FormControl;
  name: FormControl;
  imagePath: FormControl;
  serviceName: FormControl;
  description: FormControl;
  requiresCredentialsId: FormControl;
  requiresCredentialsSecret: FormControl;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { paymentService: PaymentMethodDto }, private paymentMethodService: PaymentMethodService, private dialogRef: MatDialogRef<NewPaymentServiceDialogComponent>, private _snackBar: MatSnackBar) {
    this.hide = true;
  }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    console.log(this.data)
    if (this.data) {
      this.id = new FormControl(this.data.paymentService.id);
      this.name = new FormControl(this.data.paymentService.name, Validators.required);
      this.imagePath = new FormControl(this.data.paymentService.imagePath);
      this.serviceName = new FormControl(this.data.paymentService.serviceName, Validators.required);
      this.description = new FormControl(this.data.paymentService.description, Validators.required);
      this.requiresCredentialsId = new FormControl(this.data.paymentService.requiresCredentialsId);
      this.requiresCredentialsSecret = new FormControl(this.data.paymentService.requiresCredentialsSecret);
    } else {
      this.id = new FormControl('');
      this.name = new FormControl('', Validators.required);
      this.imagePath = new FormControl('https://cdn-icons-png.flaticon.com/512/40/40058.png');
      this.serviceName = new FormControl('', Validators.required);
      this.description = new FormControl('', Validators.required);
      this.requiresCredentialsId = new FormControl(true);
      this.requiresCredentialsSecret = new FormControl(true);
    }

    this.form = new FormGroup({
      id: this.id,
      name: this.name,
      imagePath: this.imagePath,
      serviceName: this.serviceName,
      description: this.description,
      requiresCredentialsId: this.requiresCredentialsId,
      requiresCredentialsSecret: this.requiresCredentialsSecret
    })
  }

  newEditPaymentService() {
    if (this.data) {
      this.paymentMethodService.updatePaymentService(this.form.value).subscribe({
        next: (response) => {
          this.dialogRef.close({editedPaymentMethod: response})
        }, error: () => {
          this._snackBar.open("Something went wrong. Please try again!", 'X', {
            duration: 2000
          });
        }
      })
    } else {
      console.log(this.form.value)
      this.paymentMethodService.addPaymentService(this.form.value).subscribe({
        next: (response) => {
          this.dialogRef.close({newPaymentMethod: response})
        }, error: () => {
          this._snackBar.open("Something went wrong. Please try again!", 'X', {
            duration: 2000
          });
        }
      })
    }
  }

}

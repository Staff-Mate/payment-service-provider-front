import {Component, OnInit} from '@angular/core';
import {PaymentMethodDto} from "../dto/payment-method.dto";
import {UserService} from "../services/user.service";
import {EnabledPaymentMethodDto} from "../dto/enabled-payment-method.dto";
import {EnablePaymentMethodDialogComponent} from "../enable-paymeny-method-dialog/enable-payment-method-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PaymentMethodService} from "../../admin/services/payment-method.service";


@Component({
  selector: 'app-payment-services',
  templateUrl: './payment-services.component.html',
  styleUrls: ['../../styles/sections.style.scss']
})
export class PaymentServicesComponent implements OnInit {
  activeServices: Array<EnabledPaymentMethodDto> = new Array<EnabledPaymentMethodDto>();
  allPaymentServices: Array<PaymentMethodDto> = new Array<PaymentMethodDto>();

  constructor(private userService: UserService, private paymentMethodService: PaymentMethodService, private dialog: MatDialog, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.userService.getEnabledPaymentServices().subscribe((response) => {
      this.activeServices = response;
    });
    this.paymentMethodService.getAllPaymentServices().subscribe((response) => {
      this.allPaymentServices = response;
    })
  }

  checkIfActivated(service: PaymentMethodDto) {
    return this.activeServices.map(value => value.paymentMethod.serviceName).includes(service.serviceName);
  }

  openDialog(service: PaymentMethodDto) {
    this.dialog.open(EnablePaymentMethodDialogComponent, {
      panelClass: 'enable-payment-method-panel',
      data: {paymentService: service}
    }).afterClosed().subscribe(response => {
      if (response) {
        this.activeServices = response.activeServices;
      }
    });
  }

  removePaymentService(service: EnabledPaymentMethodDto) {
    this.userService.disablePaymentService(service).subscribe({
      next: (response) => {
        this.activeServices = response;
      }, error: () => {
        this._snackBar.open("Something went wrong. Please try again!", 'X', {
          duration: 2000
        });
      }
    })
  }
}

import {Component, OnInit} from '@angular/core';
import {PaymentMethod} from "../dto/payment-method.model";
import {UserService} from "../services/user.service";
import {EnabledPaymentMethodDto} from "../dto/enabled-payment-method.dto";
import {NewPaymentMethodDialogComponent} from "../new-paymeny-method-dialog/new-payment-method-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-payment-services',
  templateUrl: './payment-services.component.html',
  styleUrls: ['../../styles/sections.style.scss']
})
export class PaymentServicesComponent implements OnInit {
  activeServices: Array<EnabledPaymentMethodDto> = new Array<EnabledPaymentMethodDto>();
  allPaymentServices: Array<PaymentMethod> = new Array<PaymentMethod>();

  constructor(private userService: UserService, private dialog: MatDialog, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.userService.getEnabledPaymentServices().subscribe((response) => {
      this.activeServices = response;
    });
    this.userService.getAllPaymentServices().subscribe((response) => {
      this.allPaymentServices = response;
    })
  }

  checkIfActivated(service: PaymentMethod) {
    return this.activeServices.map(value => value.paymentMethod.serviceName).includes(service.serviceName);
  }

  openDialog(service: PaymentMethod) {
    this.dialog.open(NewPaymentMethodDialogComponent, {
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

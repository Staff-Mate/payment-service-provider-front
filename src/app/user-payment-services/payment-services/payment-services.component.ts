import {Component, OnInit} from '@angular/core';
import {PaymentMethod} from "../dto/payment-method.model";
import {PaymentMethodsService} from "../services/payment-methods.service";
import {EnabledPaymentMethodDto} from "../dto/enabled-payment-method.dto";
import {NewPaymentMethodDialogComponent} from "../new-paymeny-method-dialog/new-payment-method-dialog.component";
import {MatLegacyDialog as MatDialog} from "@angular/material/legacy-dialog";
import {MatLegacySnackBar as MatSnackBar} from "@angular/material/legacy-snack-bar";


@Component({
  selector: 'app-payment-services',
  templateUrl: './payment-services.component.html',
  styleUrls: ['../../styles/sections.style.scss']
})
export class PaymentServicesComponent implements OnInit {
  activeServices: Array<EnabledPaymentMethodDto> = new Array<EnabledPaymentMethodDto>();
  allPaymentServices: Array<PaymentMethod> = new Array<PaymentMethod>();

  constructor(private paymentService: PaymentMethodsService, private dialog: MatDialog, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.paymentService.getEnabledPaymentServices().subscribe((response) => {
      console.log(response)
      this.activeServices = response;
    });
    this.paymentService.getAllPaymentServices().subscribe((response) => {
      this.allPaymentServices = response;
      console.log(this.allPaymentServices)
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
      console.log(response)
      if(response){
        this.activeServices = response.activeServices;
      }
    });
  }

  removePaymentService(service: EnabledPaymentMethodDto) {
    this.paymentService.disablePaymentService(service).subscribe({
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

import {Component, OnInit} from '@angular/core';
import {PaymentMethodDto} from "../../user-payment-services/dto/payment-method.dto";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PaymentMethodService} from "../services/payment-method.service";
import {NewPaymentServiceDialogComponent} from "../new-payment-service-dialog/new-payment-service-dialog.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-payment-service-manager',
  templateUrl: './payment-service-manager.component.html',
  styleUrls: ['./payment-service-manager.component.scss', '../../styles/sections.style.scss']
})
export class PaymentServiceManagerComponent implements OnInit {
  allPaymentServices: Array<PaymentMethodDto>;

  constructor(private paymentMethodService: PaymentMethodService, private dialog: MatDialog, private _snackBar: MatSnackBar, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.paymentMethodService.getAllPaymentServices().subscribe((response) => {
      this.allPaymentServices = response;
    })
  }

  onNew() {
    this.dialog.open(NewPaymentServiceDialogComponent, {
      panelClass: 'new-payment-method-panel'
    }).afterClosed().subscribe(response => {
      if (response) {
        this.allPaymentServices.push(response.newPaymentMethod);
        setTimeout(() => {
          let x = document.querySelector("#id" + response.newPaymentMethod.id);
          if (x) {
            x.scrollIntoView({behavior: 'smooth'});
            this._snackBar.open("You have successfully added new service with name \"" + response.newPaymentMethod.name + "\".", 'X', {
              duration: 2000
            });
          }
        }, 100)

      }
    });
  }

  onEdit(service: PaymentMethodDto) {
    this.dialog.open(NewPaymentServiceDialogComponent, {
      panelClass: 'new-payment-method-panel',
      data: {paymentService: service}
    }).afterClosed().subscribe(response => {
      if (response) {
        let index = this.allPaymentServices.indexOf(service);
        this.allPaymentServices[index] = response.editedPaymentMethod;
        this._snackBar.open("You have successfully updated service with name \"" + service.name + "\".", 'X', {
          duration: 2000
        });
      }
    });
  }

  onDelete(service: PaymentMethodDto) {
    this.paymentMethodService.deletePaymentService(service).subscribe({
      next: (response) => {
        this.allPaymentServices = response
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
        this._snackBar.open("You have successfully deleted service with name \"" + service.name + "\".", 'X', {
          duration: 2000
        });
      },
      error: () => {
        this._snackBar.open("Something went wrong. Please try again!", 'X', {
          duration: 2000
        });
      }
    })
  }
}

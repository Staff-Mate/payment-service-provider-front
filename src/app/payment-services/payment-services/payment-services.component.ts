import {Component, OnInit} from '@angular/core';
import {PaymentService} from "../dto/payment-service.model";
import {PaymentServicesService} from "../services/payment-services.service";


@Component({
  selector: 'app-payment-services',
  templateUrl: './payment-services.component.html',
  styleUrls: ['../../styles/sections.style.scss']
})
export class PaymentServicesComponent implements OnInit {
  activeServices: Array<PaymentService> = new Array<PaymentService>();
  allPaymentServices: Array<PaymentService> = new Array<PaymentService>();

  constructor(private paymentService: PaymentServicesService) {
  }

  ngOnInit(): void {
    this.activeServices = this.paymentService.getActiveServices();
    this.allPaymentServices = this.paymentService.getAllPaymentServices()
  }

}

import { Component, OnInit } from '@angular/core';
import {PaymentService} from "../../payment-services/dto/payment-service.model";
import {PaymentServicesService} from "../../payment-services/services/payment-services.service";

@Component({
  selector: 'app-payment-service-manager',
  templateUrl: './payment-service-manager.component.html',
  styleUrls: ['./payment-service-manager.component.scss', '../../styles/sections.style.scss']
})
export class PaymentServiceManagerComponent implements OnInit {
  allPaymentServices: Array<PaymentService>;

  constructor(private paymentService: PaymentServicesService) { }

  ngOnInit(): void {
    this.allPaymentServices = this.paymentService.getAllPaymentServices()
  }

}

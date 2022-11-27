import { Component, OnInit } from '@angular/core';
import {PaymentServicesService} from "../../payment-services/services/payment-services.service";
import {Payment} from "../../history/history/history.component";
import {PaymentService} from "../../payment-services/dto/payment-service.model";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss', '../../styles/sections.style.scss']
})
export class PaymentComponent implements OnInit {

  allPaymentService: Array<PaymentService>

  constructor(private paymentService: PaymentServicesService) { }

  ngOnInit(): void {
    this.allPaymentService = this.paymentService.getAllPaymentServices()
  }

}

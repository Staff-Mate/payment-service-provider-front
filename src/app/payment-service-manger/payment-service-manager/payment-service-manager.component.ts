import { Component, OnInit } from '@angular/core';
import {PaymentMethod} from "../../payment-services/dto/payment-method.model";
import {PaymentMethodsService} from "../../payment-services/services/payment-methods.service";

@Component({
  selector: 'app-payment-service-manager',
  templateUrl: './payment-service-manager.component.html',
  styleUrls: ['./payment-service-manager.component.scss', '../../styles/sections.style.scss']
})
export class PaymentServiceManagerComponent implements OnInit {
  allPaymentServices: Array<PaymentMethod>;

  constructor(private paymentService: PaymentMethodsService) { }

  ngOnInit(): void {
    this.paymentService.getAllPaymentServices().subscribe((response)=>{
      this.allPaymentServices = response;
    })
  }

}

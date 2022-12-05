import {Component, OnInit} from '@angular/core';
import {PaymentMethod} from "../dto/payment-method.model";
import {PaymentMethodsService} from "../services/payment-methods.service";
import {ActivatedRoute} from "@angular/router";
import {EnabledPaymentMethodDto} from "../dto/enabledPaymentMethodDto";


@Component({
  selector: 'app-payment-services',
  templateUrl: './payment-services.component.html',
  styleUrls: ['../../styles/sections.style.scss']
})
export class PaymentServicesComponent implements OnInit {
  activeServices: Array<EnabledPaymentMethodDto> = new Array<EnabledPaymentMethodDto>();
  allPaymentServices: Array<PaymentMethod> = new Array<PaymentMethod>();

  constructor(private paymentService: PaymentMethodsService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.paymentService.getEnabledPaymentServices().subscribe((response)=>{
      console.log(response)
      this.activeServices = response;
    });
    this.paymentService.getAllPaymentServices().subscribe((response)=>{
      this.allPaymentServices = response;
      console.log(this.allPaymentServices)
    })
  }

  checkIfActivated(service: PaymentMethod) {
    return this.activeServices.map(value => value.paymentMethod.serviceName).includes(service.serviceName);
  }
}

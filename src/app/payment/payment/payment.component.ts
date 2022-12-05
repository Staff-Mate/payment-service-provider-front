import { Component, OnInit } from '@angular/core';
import {PaymentMethodsService} from "../../payment-services/services/payment-methods.service";
import {Payment} from "../../history/history/history.component";
import {PaymentMethod} from "../../payment-services/dto/payment-method.model";
import {ActivatedRoute, Router} from "@angular/router";
import {EnabledPaymentMethodDto} from "../../payment-services/dto/enabledPaymentMethodDto";
import {PaymentService} from "../../payment-services/services/payment.service";
import {NewPaymentDto} from "../../payment-services/dto/newPayment.dto";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss', '../../styles/sections.style.scss']
})
export class PaymentComponent implements OnInit {

  enabledPaymentService: Array<EnabledPaymentMethodDto>
  companyApiKey: string;

  constructor(private paymentMethodsService: PaymentMethodsService, private route: ActivatedRoute, private router: Router, private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.companyApiKey = this.route.snapshot.params['id']
    this.paymentMethodsService.getEnabledPaymentServicesByApiKey(this.companyApiKey).subscribe((response)=>{
      this.enabledPaymentService = response;
    })
  }

  onChooseMethod(paymentMethodId: string) {
    this.paymentService.createPayment(new NewPaymentDto(this.companyApiKey,10000,paymentMethodId)).subscribe((response)=>{
      console.log(response)
      window.location.href = response;
    });

  }
}

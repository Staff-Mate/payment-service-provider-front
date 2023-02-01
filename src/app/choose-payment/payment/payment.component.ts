import {Component, OnInit} from '@angular/core';
import {UserService} from "../../user-payment-services/services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EnabledPaymentMethodDto} from "../../user-payment-services/dto/enabled-payment-method.dto";
import {PaymentService} from "../service/payment.service";
import {NewPaymentDto} from "../dto/new-payment.dto";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss', '../../styles/sections.style.scss']
})
export class PaymentComponent implements OnInit {

  enabledPaymentService: Array<EnabledPaymentMethodDto>
  paymentAttemptId: string;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private paymentService: PaymentService) {
  }

  ngOnInit(): void {
    this.paymentAttemptId = this.route.snapshot.params['id']
    this.userService.getEnabledPaymentServicesByPaymentAttemptId(this.paymentAttemptId).subscribe((response) => {
      this.enabledPaymentService = response;
    })
  }

  onChooseMethod(paymentMethodId: string) {
    this.paymentService.createPayment(new NewPaymentDto(this.paymentAttemptId, paymentMethodId)).subscribe((response) => {
      window.location.href = response;
    });

  }
}

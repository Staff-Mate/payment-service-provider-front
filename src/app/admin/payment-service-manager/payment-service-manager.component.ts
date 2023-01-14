import {Component, OnInit} from '@angular/core';
import {PaymentMethodDto} from "../../user-payment-services/dto/payment-method.dto";
import {UserService} from "../../user-payment-services/services/user.service";

@Component({
  selector: 'app-payment-service-manager',
  templateUrl: './payment-service-manager.component.html',
  styleUrls: ['./payment-service-manager.component.scss', '../../styles/sections.style.scss']
})
export class PaymentServiceManagerComponent implements OnInit {
  allPaymentServices: Array<PaymentMethodDto>;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getAllPaymentServices().subscribe((response) => {
      this.allPaymentServices = response;
    })
  }

}

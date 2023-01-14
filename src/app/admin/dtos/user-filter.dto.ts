import {PaymentMethodDto} from "../../user-payment-services/dto/payment-method.dto";

export class UserFilterDto {
  private search: string;
  private service: PaymentMethodDto;

  constructor(search: string, service: PaymentMethodDto) {
    this.search = search;
    this.service = service;
  }
}

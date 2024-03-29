import {User} from "./user.model";
import {PaymentMethodDto} from "../../user-payment-services/dto/payment-method.dto";
import {BankDto} from "./bank.dto";

export class Client extends User {
  firstName: string;
  lastName: string;
  country: string;
  state: string;
  city: string;
  errorUrl: string;
  failedUrl: string;
  successUrl: string;
  apiKey: string;
  bank: BankDto;
  paymentMethods: PaymentMethodDto[] = [];


  constructor(email: string, displayName: string, firstName: string, lastName: string, country: string, state: string, city: string) {
    super(email, displayName);
    this.firstName = firstName;
    this.lastName = lastName;
    this.country = country;
    this.state = state;
    this.city = city;
  }
}

import {BankDto} from "../../dto/bank.dto";

export class RegisterDto {
  email: string;
  companyName: string;
  password: string;
  firstName: string;
  lastName: string;
  country: string;
  state: string;
  city: string;
  errorUrl: string;
  successUrl: string;
  failedUrl: string;
  bank: BankDto;


  constructor(email: string, companyName: string, password: string, firstName: string, lastName: string, country: string, state: string, city: string, errorUrl: string, successUrl: string, failedUrl: string, bank: BankDto) {
    this.email = email;
    this.companyName = companyName;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.country = country;
    this.state = state;
    this.city = city;
    this.errorUrl = errorUrl;
    this.successUrl = successUrl;
    this.failedUrl = failedUrl;
    this.bank = bank;
  }
}

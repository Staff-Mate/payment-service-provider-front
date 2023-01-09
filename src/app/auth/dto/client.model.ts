import {User} from "./user.model";

export class Client extends User{
  firstName: string = "";
  lastName: string = "";
  country: string = "";
  state: string = "";
  city: string = "";
  paymentService: string[] = ['qr','card'];


  constructor(email: string, displayName: string, firstName: string, lastName: string, country: string, state: string, city: string) {
    super(email, displayName);
    this.firstName = firstName;
    this.lastName = lastName;
    this.country = country;
    this.state = state;
    this.city = city;
  }
}

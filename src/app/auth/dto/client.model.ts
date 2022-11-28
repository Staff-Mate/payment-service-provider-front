import {User} from "../service/user.service";

export class Client extends User{
  firstName: string = "";
  lastName: string = "";
  country: string = "";
  state: string = "";
  city: string = "";
  paymentService: string[] = ['qr','card'];


  constructor(email: string, displayName: string, password: string, firstName: string, lastName: string, country: string, state: string, city: string) {
    super(email, displayName, password);
    this.firstName = firstName;
    this.lastName = lastName;
    this.country = country;
    this.state = state;
    this.city = city;
  }
}

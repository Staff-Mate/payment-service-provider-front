export class Client {
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  company: string = "";
  country: string = "";
  state: string = "";
  city: string = "";


  constructor(firstName: string, lastName: string, email: string, company: string, country: string, state: string, city: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.company = company;
    this.country = country;
    this.state = state;
    this.city = city;
  }
}

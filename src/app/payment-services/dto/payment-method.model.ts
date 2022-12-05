export class PaymentMethod {
  id: string;
  imagePath: string = "";
  name: string = "";
  serviceName: string = "";
  description: string = "";
  code: string = "";
  api: string = "";
  dateAdded: Date = new Date();


  constructor(imagePath: string, fullName: string, description: string, code: string, api: string, dateAdded: Date) {
    this.imagePath = imagePath;
    this.name = fullName;
    this.description = description;
    this.code = code;
    this.api = api;
    this.dateAdded = dateAdded;
  }
}

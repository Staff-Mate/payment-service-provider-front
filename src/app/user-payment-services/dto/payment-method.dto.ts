export class PaymentMethodDto {
  id: string;
  imagePath: string = "";
  name: string = "";
  serviceName: string = "";
  description: string = "";


  constructor(imagePath: string, fullName: string, description: string) {
    this.imagePath = imagePath;
    this.name = fullName;
    this.description = description;
  }
}

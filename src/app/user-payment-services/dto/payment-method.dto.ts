export class PaymentMethodDto {
  id: string;
  imagePath: string = "";
  name: string = "";
  serviceName: string = "";
  description: string = "";
  requiresCredentialsSecret: string;
  requiresCredentialsId: string;


  constructor(id: string, imagePath: string, name: string, serviceName: string, description: string, requiresCredentialSecret: string, requiresCredentialId: string) {
    this.id = id;
    this.imagePath = imagePath;
    this.name = name;
    this.serviceName = serviceName;
    this.description = description;
    this.requiresCredentialsSecret = requiresCredentialSecret;
    this.requiresCredentialsId = requiresCredentialId;
  }
}

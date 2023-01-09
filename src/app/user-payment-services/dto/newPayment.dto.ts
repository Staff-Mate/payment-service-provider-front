export class NewPaymentDto{

  private apiKey: string;
  private amount: number;
  private paymentMethodId:string;


  constructor(apiKey: string, amount: number, paymentMethodId: string) {
    this.apiKey = apiKey;
    this.amount = amount;
    this.paymentMethodId = paymentMethodId;
  }
}

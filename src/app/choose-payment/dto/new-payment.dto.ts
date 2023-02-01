export class NewPaymentDto {
  private paymentAttemptId: string;
  private paymentMethodId: string;


  constructor(paymentAttemptId: string, paymentMethodId: string) {
    this.paymentAttemptId = paymentAttemptId;
    this.paymentMethodId = paymentMethodId;
  }
}

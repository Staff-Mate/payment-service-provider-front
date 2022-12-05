import {PaymentMethod} from "./payment-method.model";

export class EnabledPaymentMethodDto {
  id: string
  paymentMethod: PaymentMethod
  userId: string
  userSecret: string
  dateAdded: Date
}

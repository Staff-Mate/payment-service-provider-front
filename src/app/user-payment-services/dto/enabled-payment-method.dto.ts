import {PaymentMethodDto} from "./payment-method.dto";

export class EnabledPaymentMethodDto {
  id: string
  paymentMethod: PaymentMethodDto
  userId: string
  userSecret: string
  dateAdded: Date
}

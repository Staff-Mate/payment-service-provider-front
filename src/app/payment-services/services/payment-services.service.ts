import {Injectable} from '@angular/core';
import {PaymentService} from "../dto/payment-service.model";

@Injectable()
export class PaymentServicesService {

  activeServices: Array<PaymentService> = new Array<PaymentService>(
    new PaymentService('https://d18fuqpnk61mcc.cloudfront.net/build/images/prepaid-cards/track-prepaid-card-spend-decentro.svg', 'Card', 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable.', 'card', 'card', new Date()),
    new PaymentService('https://d18fuqpnk61mcc.cloudfront.net/build/images/payments/static-dynamic-qr-codes-payments-api.svg', 'QR', 'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.', 'qr', 'qr', new Date()))
  // activeServices: Array<PaymentService> = new Array<PaymentService>()

  paymentServices: Array<PaymentService> = new Array<PaymentService>(
    new PaymentService('https://d18fuqpnk61mcc.cloudfront.net/build/images/prepaid-cards/track-prepaid-card-spend-decentro.svg', 'Card', 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable.', 'card', 'card', new Date()),
    new PaymentService('https://d18fuqpnk61mcc.cloudfront.net/build/images/payments/static-dynamic-qr-codes-payments-api.svg', 'QR', 'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.', 'qr', 'qr', new Date()),
    new PaymentService('https://d18fuqpnk61mcc.cloudfront.net/build/images/neobanks/onboard-users-to-your-neobanking-platform.svg', 'PayPal', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ', 'paypal', 'pay-pal', new Date()),
    new PaymentService('https://d18fuqpnk61mcc.cloudfront.net/build/images/crypto-exchanges-nft-platforms/banner.svg', 'Bitcoin', 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy.', 'bitcoin', 'bitcoin', new Date()),
    new PaymentService('https://d18fuqpnk61mcc.cloudfront.net/build/images/payments/static-dynamic-qr-codes-payments-api.svg', 'New', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', 'qr', 'qr', new Date()))

  getActiveServices() {
    return this.activeServices;
  }

  getAllPaymentServices() {
    return this.paymentServices;
  }
}

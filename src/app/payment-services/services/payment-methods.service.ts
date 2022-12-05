import {Injectable} from '@angular/core';
import {PaymentMethod} from "../dto/payment-method.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {EnabledPaymentMethodDto} from "../dto/enabledPaymentMethodDto";

@Injectable({providedIn: 'root'})
export class PaymentMethodsService {

  activeServices: Array<PaymentMethod> = new Array<PaymentMethod>(
    new PaymentMethod('https://d18fuqpnk61mcc.cloudfront.net/build/images/prepaid-cards/track-prepaid-card-spend-decentro.svg', 'Card', 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable.', 'card', 'card', new Date()),
    new PaymentMethod('https://d18fuqpnk61mcc.cloudfront.net/build/images/payments/static-dynamic-qr-codes-payments-api.svg', 'QR', 'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.', 'qr', 'qr', new Date()))
  // activeServices: Array<PaymentService> = new Array<PaymentService>()

  paymentServices: Array<PaymentMethod> = new Array<PaymentMethod>(
    new PaymentMethod('https://d18fuqpnk61mcc.cloudfront.net/build/images/prepaid-cards/track-prepaid-card-spend-decentro.svg', 'Card', 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable.', 'card', 'card', new Date()),
    new PaymentMethod('https://d18fuqpnk61mcc.cloudfront.net/build/images/payments/static-dynamic-qr-codes-payments-api.svg', 'QR', 'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.', 'qr', 'qr', new Date()),
    new PaymentMethod('https://d18fuqpnk61mcc.cloudfront.net/build/images/neobanks/onboard-users-to-your-neobanking-platform.svg', 'PayPal', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ', 'paypal', 'pay-pal', new Date()),
    new PaymentMethod('https://d18fuqpnk61mcc.cloudfront.net/build/images/crypto-exchanges-nft-platforms/banner.svg', 'Bitcoin', 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy.', 'bitcoin', 'bitcoin', new Date()))

  constructor(private _http: HttpClient) {
  }

  getActiveServices() {
    return this.activeServices;
  }

  getAllPaymentServices() {
    return this._http.get<Array<PaymentMethod>>(environment.apiUrl + "/auth-service/payment-methods/");
  }

  getEnabledPaymentServices() {
    return this._http.get<Array<EnabledPaymentMethodDto>>(environment.apiUrl + "/auth-service/users/payment-method");
  }

  getEnabledPaymentServicesByApiKey(apiKey: string) {
    return this._http.get<Array<EnabledPaymentMethodDto>>(environment.apiUrl + "/auth-service/users/payment-method/" + apiKey);
  }
}

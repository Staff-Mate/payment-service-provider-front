import {Injectable} from '@angular/core';
import {PaymentMethod} from "../dto/payment-method.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {EnabledPaymentMethodDto} from "../dto/enabled-payment-method.dto";

@Injectable({providedIn: 'root'})
export class PaymentMethodsService {

  constructor(private _http: HttpClient) {
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

  enablePaymentService(enablePaymentMethod: EnabledPaymentMethodDto) {
    return this._http.post<Array<EnabledPaymentMethodDto>>(environment.apiUrl + "/auth-service/users/payment-method", enablePaymentMethod);
  }

  disablePaymentService(service: EnabledPaymentMethodDto) {
    return this._http.delete<Array<EnabledPaymentMethodDto>>(environment.apiUrl + "/auth-service/users/payment-method/" + service.id);
  }
}

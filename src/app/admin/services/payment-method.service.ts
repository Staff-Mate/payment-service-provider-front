import {PaymentMethodDto} from "../../user-payment-services/dto/payment-method.dto";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class PaymentMethodService {

  constructor(private _http: HttpClient) {
  }

  getAllPaymentServices() {
    return this._http.get<Array<PaymentMethodDto>>(environment.apiUrl + "/auth-service/payment-methods/");
  }

  addPaymentService(paymentMethodDto: PaymentMethodDto) {
    return this._http.post<PaymentMethodDto>(environment.apiUrl + "/auth-service/payment-methods/", paymentMethodDto);
  }

  deletePaymentService(paymentMethodDto: PaymentMethodDto) {
    return this._http.delete<Array<PaymentMethodDto>>(environment.apiUrl + "/auth-service/payment-methods/" + paymentMethodDto.id);
  }

  updatePaymentService(paymentMethodDto: PaymentMethodDto) {
    return this._http.put<PaymentMethodDto>(environment.apiUrl + "/auth-service/payment-methods/", paymentMethodDto);
  }
}

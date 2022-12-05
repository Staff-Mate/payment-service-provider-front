import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {NewPaymentDto} from "../dto/newPayment.dto";
import {HttpResponseDto} from "../dto/HttpResponse.dto";

@Injectable({providedIn: 'root'})
export class PaymentService{

  constructor(private _http: HttpClient) {
  }

  createPayment(newPaymentDto: NewPaymentDto){
    return this._http.post(environment.apiUrl + "/auth-service/payments/", newPaymentDto,{ responseType: 'text' });
  }

}

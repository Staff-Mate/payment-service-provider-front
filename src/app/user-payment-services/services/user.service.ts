import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {EnabledPaymentMethodDto} from "../dto/enabled-payment-method.dto";
import {InfoDto} from "../dto/infoDto";
import {Client} from "../../auth/dto/client.model";
import {UserFilterDto} from "../../admin/dtos/user-filter.dto";

@Injectable({providedIn: 'root'})
export class UserService {

  constructor(private _http: HttpClient) {
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

  editProfile(infoDto: InfoDto) {
    return this._http.put(environment.apiUrl + "/auth-service/users/", infoDto);
  }

  getFilteredUsers(userFilterDto: UserFilterDto) {
    return this._http.post<Array<Client>>(environment.apiUrl + "/auth-service/users/", userFilterDto);
  }

}

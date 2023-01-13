import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PaymentMethod} from "../../user-payment-services/dto/payment-method.model";
import {environment} from "../../../environments/environment";
import {FilterDto} from "../dto/filter.dto";
import {TransactionDto} from "../dto/transaction.dto";
import {Page} from "../../utils/page/page";

@Injectable({providedIn: 'root'})
export class HistoryService{

  constructor(private _http: HttpClient) {
  }

  getFilteredHistory(filterDto: FilterDto) {
    console.log(filterDto)
    return this._http.post<Page<TransactionDto>>(environment.apiUrl + "/auth-service/history/", filterDto);
  }

  getFilteredActiveTransactions(filterDto: FilterDto) {
    console.log(filterDto)
    return this._http.post<Page<TransactionDto>>(environment.apiUrl + "/auth-service/history/active", filterDto);
  }
}

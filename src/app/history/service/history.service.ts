import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {FilterDto} from "../dto/filter.dto";
import {TransactionDto} from "../dto/transaction.dto";
import {Page} from "../../utils/page/page";

@Injectable({providedIn: 'root'})
export class HistoryService {

  constructor(private _http: HttpClient) {
  }

  getFilteredHistory(filterDto: FilterDto) {
    return this._http.post<Page<TransactionDto>>(environment.apiUrl + "/auth-service/history/", filterDto);
  }

  getFilteredActiveTransactions(filterDto: FilterDto) {
    return this._http.post<Page<TransactionDto>>(environment.apiUrl + "/auth-service/history/active", filterDto);
  }
}

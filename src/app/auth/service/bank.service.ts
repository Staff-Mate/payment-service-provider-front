import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BankDto} from "../dto/bank.dto";

@Injectable({
  providedIn: 'root'
})
export class BankService{
  constructor(private _http: HttpClient) {
  }

  getAllBanks(){
    return this._http.get<Array<BankDto>>(environment.apiUrl + "/auth-service/bank-service/");
  }
}

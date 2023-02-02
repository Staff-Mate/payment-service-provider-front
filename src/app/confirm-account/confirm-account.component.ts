import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.scss']
})
export class ConfirmAccountComponent {

  public token: string | null = "";
  public isSuccess: boolean = false;

  constructor(private _route: ActivatedRoute, private _router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.token = this._route.snapshot.paramMap.get('token');
    if (this.token === null) {
      this.token = ""
    }
    console.log(this.token)


    this.http.get<boolean>(environment.apiUrl + "/auth-service/auth/confirm-account?token="+this.token).subscribe((response2) => {
          console.log(response2);
          this.isSuccess = response2;
        })


  }

}

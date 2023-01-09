import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {TokenStorageService} from "./tokenStorage.service";
import {LoginDto} from "../dto/login.dto";
import {TokenDto} from "../dto/token.dto";
import {RegisterDto} from "../dto/register.dto";
import {User} from "../dto/user.model";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public logInUserChanged: Subject<any> = new Subject<any>();
  public errorResponse: Subject<any> = new Subject<any>();

  constructor(private _http: HttpClient, private router: Router, private _tokenService: TokenStorageService) {
  }

  logInUser(loginUserDto: LoginDto) {
    this._http.post<TokenDto>(environment.apiUrl + "/auth-service/auth/login", loginUserDto).subscribe(
      {
        next: (response) => {
          console.log("AUTH SERVICE: " + response)
          this.errorResponse.next(null);
          this._tokenService.saveToken(response.accessToken);
          // this._tokenService.saveRefreshToken(response.refresh_token)
          this.logInUserChanged.next(response);
          this.router.navigate(['/user']).then()
        },
        error: (error: HttpErrorResponse) => {
          if (error.error.status == 400) {
            this.errorResponse.next(error.error.message);
          }else{
            this.errorResponse.next("Something went wrong. Pleas try again.");
          }
          console.log(error)
        }
      })
  }

  logout() {
    this._tokenService.signOut()
    this.router.navigate(['/']).then()
    this.logInUserChanged.next(true);
  }

  refreshToken(token: string) {
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + token)
    };
    return this._http.get(environment.apiUrl + '/auth/refresh', header);
  }

  verifyUser(token: string) {
    return this._http.get<string>(environment.apiUrl + "/auth/verify", {params: {token: token}});
  }

  signUpUser(user: RegisterDto){
    console.log(user)
    return this._http.post(environment.apiUrl + "/auth-service/auth/register",user);
  }

  getLoggedInUser(){
    return this._http.get<User>(environment.apiUrl + "/auth-service/auth/");
  }
}

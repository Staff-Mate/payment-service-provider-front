import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {TokenStorageService} from "./tokenStorage.service";
import {LoginDto} from "../signin/dto/login.dto";
import {TokenDto} from "../dto/token.dto";
import {RegisterDto} from "../signup/dto/register.dto";
import {Client} from "../dto/client.model";
import {PasswordDto} from "../dto/password.dto";

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
          this.errorResponse.next(null);
          this._tokenService.saveToken(response.accessToken);
          this.logInUserChanged.next(response);
          this.router.navigate(['/user']).then()
        },
        error: (error: HttpErrorResponse) => {
          if (error.status == 400) {
            this.errorResponse.next(error.error.message);
          } else {
            this.errorResponse.next("Something went wrong. Please try again.");
          }
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

  signUpUser(user: RegisterDto) {
    return this._http.post(environment.apiUrl + "/auth-service/auth/register", user);
  }

  getLoggedInUser() {
    return this._http.get<Client>(environment.apiUrl + "/auth-service/auth/");
  }

  changePassword(passwordDto: PasswordDto) {
    return this._http.put(environment.apiUrl + "/auth-service/auth/password", passwordDto);
  }
}

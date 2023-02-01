import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {TokenStorageService} from "./auth/service/tokenStorage.service";
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private tokenService: TokenStorageService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let isLoggedIn = this.tokenService.getToken();
    let role = ""
    if(isLoggedIn){
      const tokenInfo = jwt_decode(isLoggedIn)
      // @ts-ignore
      role = tokenInfo.role
      console.log(role)
    }
    let authorizedAccess = next.data["authorizedAccess"] as Array<string>;
    if (authorizedAccess.length == 0) {
      if (isLoggedIn) {
        this.router.navigate(['/home']).then()
        return false;
      }
      return true;
    }else{
      if(authorizedAccess.includes(role)){
        return true;
      }else{
        this.router.navigate(['/home']).then()
      }
    }
    if (!isLoggedIn) {
      this.router.navigate(['/']).then()
    }
    return isLoggedIn != null;
  }

}

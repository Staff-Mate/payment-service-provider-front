import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {TokenStorageService} from "./auth/service/tokenStorage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private tokenService: TokenStorageService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const isLoggedIn = this.tokenService.getToken();
    let authorizedAccess = next.data["authorizedAccess"] as Array<string>;
    if (authorizedAccess.length == 0) {
      if (isLoggedIn) {
        this.router.navigate(['/home']).then()
        return false;
      }
      return true;
    }
    if (!isLoggedIn) {
      this.router.navigate(['/']).then()
    }
    return isLoggedIn != null;
  }

}

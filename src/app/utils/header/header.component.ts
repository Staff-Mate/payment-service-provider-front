import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {User} from "../../auth/dto/user.model";
import {AuthService} from "../../auth/service/auth.service";
import {TokenStorageService} from "../../auth/service/tokenStorage.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isHome: boolean = true;
  isPaymentOrEmpty: boolean = true;
  user: User;
  show: any;
  private ngUnsubscribe = new Subject<void>();

  constructor(private route: ActivatedRoute, private authService: AuthService, public tokenStorage: TokenStorageService) {
    let res = this.route.routeConfig?.component?.name.includes("Homepage");
    this.isHome = res == undefined ? false : res;
    res = this.route.routeConfig?.component?.name.includes("Empty") || this.route.routeConfig?.component?.name.includes("PaymentComponent");
    this.isPaymentOrEmpty = res == undefined ? false : res;
    this.show = false;
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.authService.getLoggedInUser().subscribe(response => {
        this.user = response;
        this.show = true;
      });
    }

    this.authService.logInUserChanged.pipe(takeUntil(this.ngUnsubscribe)).subscribe(response => {
      if (response != true) {
        this.authService.getLoggedInUser().subscribe(response => {
          this.user = response;
        });
      }
    })
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onDevelopers() {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'assets/AgencijaZaZaposljavanje2022_2023');
    link.setAttribute('download', `AgencijaZaZaposljavanje2022_2023.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  onLogOut() {
    this.authService.logout()
  }

  getToken() {
    return this.tokenStorage.getToken();
  }
}

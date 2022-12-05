import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../auth/service/user.service";
import {User} from "../../auth/dto/user.model";
import {AuthService} from "../../auth/service/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isHome: boolean = true;
  isPaymentOrEmpty: boolean = true;
  user: User;

  constructor(private route: ActivatedRoute, private userService: UserService, private authService: AuthService) {
    let res = this.route.routeConfig?.component?.name.includes("Homepage") ;
    this.isHome = res == undefined ? false : res;
    res = this.route.routeConfig?.component?.name.includes("Empty") || this.route.routeConfig?.component?.name.includes("PaymentComponent") ;
    this.isPaymentOrEmpty = res == undefined ? false : res;
  }

  ngOnInit(): void {
    this.user = this.userService.getLoggedInUser();

    this.userService.userChanged.subscribe((response)=>{
      this.user = response;
    })
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
}

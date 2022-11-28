import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {User, UserService} from "../../auth/service/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isHome: boolean = true;
  user: User;

  constructor(private route: ActivatedRoute, private userService: UserService) {
    let res = this.route.routeConfig?.component?.name.includes("Homepage") || this.route.routeConfig?.component?.name.includes("PaymentComponent") ;
    this.isHome = res == undefined ? false : res;
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

  onSwitch() {
    this.userService.getOtherUser(this.user.permissions);
  }
}

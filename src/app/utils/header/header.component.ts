import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isHome: boolean = true;

  constructor(private route: ActivatedRoute) {
    let res = this.route.routeConfig?.component?.name.includes("Homepage") || this.route.routeConfig?.component?.name.includes("PaymentComponent") ;
    this.isHome = res == undefined ? false : res;
  }

  ngOnInit(): void {
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
}

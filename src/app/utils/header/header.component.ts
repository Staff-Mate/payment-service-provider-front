import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isHome: boolean = true;

  constructor(private route: ActivatedRoute) {
    let res = this.route.routeConfig?.component?.name.includes("Homepage");
    this.isHome = res == undefined ? false : res;
  }

  ngOnInit(): void {
  }

}

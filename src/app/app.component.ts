import {Component} from '@angular/core';
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Discash';
  isFooterShowing: boolean = false;

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private route: ActivatedRoute) {
    this.matIconRegistry.addSvgIcon('canceled', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/canceled.svg'))
    this.matIconRegistry.addSvgIcon('active', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/active.svg'))
    this.matIconRegistry.addSvgIcon('finished', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/finished.svg'))
    let res = this.route.routeConfig?.component?.name.includes("SignUpComponent") || this.route.routeConfig?.component?.name.includes("SingInComponent") ;
    this.isFooterShowing = res == undefined ? false : res;
  }
}

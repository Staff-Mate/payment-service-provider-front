import {Component} from '@angular/core';
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Discash';
  isFooterShowing: boolean = true;

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private router: Router) {
    this.matIconRegistry.addSvgIcon('error', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/error.svg'))
    this.matIconRegistry.addSvgIcon('failed', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/failed.svg'))
    this.matIconRegistry.addSvgIcon('active', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/active.svg'))
    this.matIconRegistry.addSvgIcon('finished', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/finished.svg'))
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event) => {
      let navigationEvent = event as NavigationEnd;
      console.log(navigationEvent.url)
      let res =
        navigationEvent.url.includes("signup") ||
        navigationEvent.url.includes("signin") ||
        navigationEvent.url.includes("home") ||
        navigationEvent.url == "/";
      this.isFooterShowing = !res;

    })

  }
}

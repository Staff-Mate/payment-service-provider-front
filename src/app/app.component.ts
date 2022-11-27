import { Component } from '@angular/core';
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Discash';

  constructor(private matIconRegistry: MatIconRegistry, private  domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon('canceled',this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/canceled.svg'))
    this.matIconRegistry.addSvgIcon('active',this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/active.svg'))
    this.matIconRegistry.addSvgIcon('finished',this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/finished.svg'))
  }
}

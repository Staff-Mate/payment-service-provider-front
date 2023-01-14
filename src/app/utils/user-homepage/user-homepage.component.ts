import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/service/auth.service";
import {Client} from "../../auth/dto/client.model";

@Component({
  selector: 'app-user-homepage',
  templateUrl: './user-homepage.component.html',
  styleUrls: ['./user-homepage.component.scss', '../homepage/homepage.component.scss']
})
export class UserHomepageComponent implements OnInit {

  user: Client

  constructor(private authService: AuthService) {
    this.authService.getLoggedInUser().subscribe(response => {
      this.user = response;
    })

  }

  ngOnInit(): void {
  }

}

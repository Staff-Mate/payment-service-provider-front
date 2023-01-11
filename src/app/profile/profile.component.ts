import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Client} from "../auth/dto/client.model";
import {User} from "../auth/dto/user.model";
import {AuthService} from "../auth/service/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss', '../styles/sections.style.scss', '../../styles/signform.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User | Client;
  client: Client = new Client('gp.recruit.hr@gmail.com','G-P Recruit','Erika', 'Waramunt',  'USA', 'Pennsylvania', 'Harrisburg');
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  hidePassword: boolean = true;
  password: FormControl;
  confirmPassword: FormControl;
  hideConfirmPassword: boolean = true;
  infoForm: FormGroup;
  activeView: string = "home"

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.initInfoForm()
    this.authService.getLoggedInUser().subscribe(response=>{
      this.user = response;
    });
    this.authService.logInUserChanged.subscribe(response =>{
      if(response != true){
        this.authService.getLoggedInUser().subscribe(response=>{
          this.user = response;
        });
      }
    })
  }

  initInfoForm() {
    this.firstName = new FormControl(this.client.firstName)
    this.lastName = new FormControl(this.client.lastName)
    this.email = new FormControl(this.client.email)
    this.password = new FormControl()
    this.confirmPassword = new FormControl()

    this.infoForm = new FormGroup({
      'firstName': this.firstName,
      'lastName': this.lastName,
      'email': this.email,
      'password': this.password,
      'confirmPassword': this.confirmPassword,
    })
  }

  onInfoSave() {
    this.activeView = 'home'
  }

  onPasswordSave() {
    this.activeView = 'home'
  }
}

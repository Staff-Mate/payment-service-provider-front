import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup} from "@angular/forms";
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
  firstName: UntypedFormControl;
  lastName: UntypedFormControl;
  email: UntypedFormControl;
  hidePassword: boolean = true;
  password: UntypedFormControl;
  confirmPassword: UntypedFormControl;
  hideConfirmPassword: boolean = true;
  infoForm: UntypedFormGroup;
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
    this.firstName = new UntypedFormControl(this.client.firstName)
    this.lastName = new UntypedFormControl(this.client.lastName)
    this.email = new UntypedFormControl(this.client.email)
    this.password = new UntypedFormControl()
    this.confirmPassword = new UntypedFormControl()

    this.infoForm = new UntypedFormGroup({
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

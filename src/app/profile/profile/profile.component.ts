import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Client} from "../../auth/dto/client.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss', '../../styles/sections.style.scss', '../../styles/signform.component.scss']
})
export class ProfileComponent implements OnInit {
  client: Client = new Client('gp.recruit.hr@gmail.com','G-P Recruit','password','Erika', 'Waramunt',  'USA', 'Pennsylvania', 'Harrisburg');
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  hidePassword: boolean = true;
  password: FormControl;
  confirmPassword: FormControl;
  hideConfirmPassword: boolean = true;
  infoForm: FormGroup;
  activeView: string = "home"

  constructor() {
  }

  ngOnInit(): void {
    this.initInfoForm()
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

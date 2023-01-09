import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['../../styles/signform.component.scss']
})
export class SigninComponent implements OnInit {
  form: FormGroup = new FormGroup({})
  password: FormControl = new FormControl();
  email: FormControl = new FormControl();
  hide: boolean = true;
  error: any;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.initForm()
    this.authService.errorResponse.subscribe(response =>{
      this.error = response;
      setTimeout(error=>{this.error = ""},5000)
    })
  }

  initForm() {
    this.password = new FormControl();
    this.email = new FormControl('', Validators.email)

    this.form = new FormGroup({
      password: this.password,
      email: this.email
    })
  }

  onSignIn() {
    this.authService.logInUser(this.form.value);
  }
}

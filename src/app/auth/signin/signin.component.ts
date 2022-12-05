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

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.initForm()
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

import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

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

  constructor() {
  }

  ngOnInit(): void {
  }

  initForm() {
    this.password = new FormControl();
    this.email = new FormControl('', Validators.email)

    this.form = new FormGroup({
      password: this.password,
      email: this.email
    })
  }

}

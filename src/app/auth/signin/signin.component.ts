import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../service/auth.service";
import {Subject, takeUntil} from "rxjs";
import {LoadingService} from "../service/loading.service";

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
  isLoading: boolean;
  private ngUnsubscribe = new Subject<void>();

  constructor(private authService: AuthService, private loadingService: LoadingService) {
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.initForm()
    this.loadingService.loading.pipe(takeUntil(this.ngUnsubscribe)).subscribe(response=>{
      this.isLoading = !this.isLoading;
    })
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

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

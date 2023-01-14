import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Client} from "../auth/dto/client.model";
import {AuthService} from "../auth/service/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../user-payment-services/services/user.service";
import {BankDto} from "../auth/dto/bank.dto";
import {BankService} from "../auth/service/bank.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss', '../styles/sections.style.scss', '../styles/signform.component.scss']
})
export class ProfileComponent implements OnInit {
  user: Client;
  firstName: FormControl;
  lastName: FormControl;
  hidePassword: boolean = true;
  password: FormControl;
  confirmPassword: FormControl;
  oldPassword: FormControl;
  hideConfirmPassword: boolean = true;
  infoForm: FormGroup;
  passwordForm: FormGroup;
  activeView: string = "home"
  hideOldPassword: boolean = true;
  errorUrl: FormControl;
  failedUrl: FormControl;
  successUrl: FormControl;
  bank: FormControl;
  allBanks: Array<BankDto>;

  constructor(private authService: AuthService, private userService: UserService, private _snackBar: MatSnackBar, private bankService: BankService) {
    this.initPasswordForm();
    this.bankService.getAllBanks().subscribe(response =>{
      this.allBanks = response;
      this.authService.getLoggedInUser().subscribe(response => {
        this.user = response;
        this.initInfoForm()
      });
    })
  }

  ngOnInit(): void {
    this.authService.logInUserChanged.subscribe(response => {
      if (response != true) {
        this.authService.getLoggedInUser().subscribe(response => {
          this.user = response;
        });
      }
    })
  }

  initInfoForm() {
    this.firstName = new FormControl(this.user.firstName)
    this.lastName = new FormControl(this.user.lastName)
    if(this.user.permissions.includes('ROLE_USER')){
      this.bank = new FormControl(this.user.bank.id)
      this.errorUrl = new FormControl(this.user.errorUrl)
      this.failedUrl = new FormControl(this.user.failedUrl)
      this.successUrl = new FormControl(this.user.successUrl)
    }else{
      this.bank = new FormControl("")
      this.errorUrl = new FormControl("")
      this.failedUrl = new FormControl("")
      this.successUrl = new FormControl("")
    }

    this.infoForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      bank: this.bank,
      errorUrl: this.errorUrl,
      failedUrl: this.failedUrl,
      successUrl: this.successUrl,
    })
  }

  initPasswordForm() {
    this.oldPassword = new FormControl()
    this.password = new FormControl()
    this.confirmPassword = new FormControl()

    this.passwordForm = new FormGroup({
      'oldPassword': this.oldPassword,
      'newPassword': this.password,
      'confirmPassword': this.confirmPassword,
    })

    this.password.disable();
    this.confirmPassword.disable()
  }

  onInfoSave() {
    let bankId = this.bank.value;
    this.allBanks.forEach(value => {
      if(value.id == bankId){
        this.bank.setValue(value);
        return;
      }
    })
    this.userService.editProfile(this.infoForm.value).subscribe({
      next: () => {
        this.activeView = 'home'
        this.user.firstName = this.firstName.value
        this.user.lastName = this.lastName.value
        this.user.bank = this.bank.value
        this.user.successUrl = this.successUrl.value
        this.user.errorUrl = this.errorUrl.value
        this.user.failedUrl = this.failedUrl.value
        this.bank.setValue(this.bank.value.id)
        this._snackBar.open("You have successfully updated your profile!", "", {
          duration: 2000
        })
      },
      error: () => {
        this._snackBar.open("Something went wrong. Please try again!", "", {
          duration: 2000
        })
      }
    })
  }

  onPasswordSave() {
    this.authService.changePassword(this.passwordForm.value).subscribe({
      next: () => {
        this.activeView = 'home'
        this._snackBar.open("You have successfully changed your password!", "", {
          duration: 2000
        })
      },
      error: () => {
        this._snackBar.open("Something went wrong. Please try again!", "", {
          duration: 2000
        })
      }
    })
  }

  onOldPasswordChange() {
    if (!this.oldPassword.value) {
      this.password.disable()
      this.password.setValue('')
    } else {
      this.password.enable()
    }
  }

  onPasswordChange() {
    if (!this.password.value) {
      this.confirmPassword.disable()
      this.confirmPassword.setValue('')
    } else {
      this.confirmPassword.enable()
    }
  }
}

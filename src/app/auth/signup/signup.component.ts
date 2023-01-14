import {Component, OnInit} from '@angular/core';
import {GeoService} from "../service/geo.service";
import {ICity, ICountry, IState} from 'country-state-city';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import ConfirmPasswordValidator from "../validators/confirm-password.validator";
import {AuthService} from "../service/auth.service";
import {BankService} from "../service/bank.service";
import {BankDto} from "../dto/bank.dto";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../../styles/signform.component.scss', './signup.component.scss']
})
export class SignupComponent implements OnInit {
  form: FormGroup
  addressForm: FormGroup;
  stateIsoCode: string = "";
  country: FormControl = new FormControl();

  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  company: FormControl;


  countries: Array<ICountry>;
  state: FormControl;
  states: Array<IState>;
  city: FormControl;
  cities: Array<ICity>;
  password: FormControl;
  confirmPassword: FormControl;


  errorUrl: FormControl;
  successUrl: FormControl;
  failedUrl: FormControl;
  bank: FormControl;

  filteredCountries: Observable<ICountry[]> = new Observable<ICountry[]>();
  filteredStates: Observable<IState[]> = new Observable<IState[]>();
  filteredCities: Observable<ICity[]> = new Observable<ICity[]>();
  hideConfirmPassword: boolean = true;
  hidePassword: boolean = true;
  allBanks: Array<BankDto>;

  constructor(private geoService: GeoService, private authService: AuthService, private bankService: BankService, private _snackBar: MatSnackBar, private router: Router) {
    this.bankService.getAllBanks().subscribe(response =>{
      this.allBanks = response;
    })
  }

  ngOnInit(): void {
    this.initForm()
    this.countries = this.geoService.getCountries();
    this.filteredCountries = this.country.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCountry(value || '')),
    );

  }

  initForm() {

    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);
    this.confirmPassword = new FormControl('', Validators.required);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.company = new FormControl('', Validators.required);

    this.errorUrl = new FormControl('', Validators.required);
    this.successUrl = new FormControl('', Validators.required);
    this.failedUrl = new FormControl('', Validators.required);
    this.bank = new FormControl('', Validators.required);

    this.country = new FormControl();
    this.state = new FormControl();
    this.city = new FormControl();

    this.form = new FormGroup({
        country: this.country,
        state: this.state,
        city: this.city,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        companyName: this.company,
        password: this.password,
        confirmPassword: this.confirmPassword,
        errorUrl: this.errorUrl,
        successUrl: this.successUrl,
        failedUrl: this.failedUrl,
        bank: this.bank,
      },
      {
        validators: [ConfirmPasswordValidator.match('password', 'confirmPassword')]
      })
  }

  onCountryChange(isoCode: string) {
    this.states = this.geoService.getStatesByCountry(isoCode);
    this.stateIsoCode = isoCode;

    this.filteredStates = this.state.valueChanges.pipe(
      startWith(''),
      map(value => this._filterState(value || '')),
    );

  }

  onStateChange(isoCode: string) {
    this.cities = this.geoService.getCitiesByState(this.stateIsoCode, isoCode);

    this.filteredCities = this.city.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCity(value || '')),
    );

  }

  checkRequired(control: string) {
    return this.form.get(control)?.hasValidator(Validators.required)
  }

  signUp() {
    this.authService.signUpUser(this.form.value).subscribe({
      next:()=>{
        this.router.navigate(['/signin']).then();
        this._snackBar.open("You have successfully signed up, now you can log in!", "", {
          duration: 2000
        })
      },error:(error: HttpErrorResponse)=>{
        if(error.status == 409){
          this._snackBar.open("Account with this email already exists!", "", {
            duration: 2000
          })
        }else{
          this._snackBar.open("Something went wrong. Please try again!", "", {
            duration: 2000
          })
        }
      }
    })
  }

  private _filterCountry(value: string): ICountry[] {
    const filterValue = value.toLowerCase();

    return this.countries.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  private _filterState(value: string): IState[] {
    const filterValue = value.toLowerCase();

    return this.states.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  private _filterCity(value: string): ICity[] {
    const filterValue = value.toLowerCase();

    return this.cities.filter(option => option.name.toLowerCase().includes(filterValue));
  }
}

import {Component, OnInit} from '@angular/core';
import {GeoService} from "../service/geo.service";
import {ICity, ICountry, IState} from 'country-state-city';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {RegisterDto} from "./dto/register.dto";
import ConfirmPasswordValidator from "../validators/confirm-password.validator";
import {AuthService} from "../service/auth.service";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../../styles/signform.component.scss', './signup.component.scss']
})
export class SignupComponent implements OnInit {
  registerUser: RegisterDto;
  form: UntypedFormGroup
  addressForm: UntypedFormGroup;
  stateIsoCode: string = "";
  country: UntypedFormControl = new UntypedFormControl();

  firstName: UntypedFormControl;
  lastName: UntypedFormControl;
  email: UntypedFormControl;
  company: UntypedFormControl;


  countries: Array<ICountry>;
  state: UntypedFormControl;
  states: Array<IState>;
  city: UntypedFormControl;
  cities: Array<ICity>;
  password: UntypedFormControl;
  confirmPassword: UntypedFormControl;

  filteredCountries: Observable<ICountry[]> = new Observable<ICountry[]>();
  filteredStates: Observable<IState[]> = new Observable<IState[]>();
  filteredCities: Observable<ICity[]> = new Observable<ICity[]>();
  hideConfirmPassword: boolean = true;
  hidePassword: boolean = true;

  constructor(private geoService: GeoService, private authService: AuthService) {
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

    this.firstName = new UntypedFormControl('', Validators.required);
    this.lastName = new UntypedFormControl('', Validators.required);
    this.password = new UntypedFormControl('', Validators.required);
    this.confirmPassword = new UntypedFormControl('', Validators.required);
    this.email = new UntypedFormControl('', [Validators.required, Validators.email]);
    this.company = new UntypedFormControl('', Validators.required);

    this.country = new UntypedFormControl();
    this.state = new UntypedFormControl();
    this.city = new UntypedFormControl();

    this.form = new UntypedFormGroup({
        country: this.country,
        state: this.state,
        city: this.city,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        companyName: this.company,
        password: this.password,
        confirmPassword: this.confirmPassword
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

  signUp() {
    this.authService.signUpUser(this.form.value).subscribe((response)=>{
      console.log(response)
    })
  }
}

import { Component, OnInit } from '@angular/core';
import {GeoService} from "../../utils/service/geo.service";
import {ICountry, State, City, IState, ICity} from 'country-state-city';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";

export class Client{
  firstName: string="";
  lastName: string="";
  phone: string="";
  email: string = "";
  company: string = "";
  country: string="";
  state: string="";
  city: string ="";
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../styles/signform.component.scss']
})
export class SignupComponent implements OnInit {
  client: Client;
  form: FormGroup
  addressForm: FormGroup;
  stateIsoCode: string = "";
  country: FormControl = new FormControl();

  firstName: FormControl;
  lastName: FormControl;
  phone: FormControl;
  email: FormControl;
  company: FormControl;


  countries: Array<ICountry>;
  state: FormControl;
  states: Array<IState>;
  city: FormControl;
  cities: Array<ICity>;
  password: FormControl;
  confirmPassword: FormControl;

  filteredCountries: Observable<ICountry[]> = new Observable<ICountry[]>();
  filteredStates: Observable<IState[]> = new Observable<IState[]>();
  filteredCities: Observable<ICity[]> = new Observable<ICity[]>();
  hideConfirmPassword: boolean = true;
  hidePassword: boolean = true;

  constructor(private geoService: GeoService) {
  }

  ngOnInit(): void {
    this.initAddressForm()
    this.initForm()
    this.countries = this.geoService.getCountries();
    this.filteredCountries = this.country.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCountry(value || '')),
    );

  }

  initForm(){

    this.firstName = new FormControl('',Validators.required);
    this.lastName = new FormControl('',Validators.required);
    this.phone = new FormControl();
    this.password = new FormControl();
    this.confirmPassword = new FormControl();
    this.email = new FormControl('',[Validators.required, Validators.email]);
    this.company = new FormControl('',Validators.required);

    this.form = new FormGroup({
      address: this.addressForm,
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      email: this.email,
      company: this.company,
      password: this.password,
      confirmPassword: this.confirmPassword
    })
  }

  initAddressForm(){
    this.country = new FormControl();
    this.state = new FormControl();
    this.city = new FormControl();

    this.addressForm = new FormGroup({
      country: this.country,
      state: this.state,
      city: this.city
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
  checkRequired(control: string){
    return this.form.get(control)?.hasValidator(Validators.required)
  }
}

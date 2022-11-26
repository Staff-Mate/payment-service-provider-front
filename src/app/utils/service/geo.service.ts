import { Injectable } from '@angular/core';
import { Country, State, City }  from 'country-state-city';

@Injectable()
export class GeoService {

  getCountries() {
    return Country.getAllCountries();
  }

  getStatesByCountry(countryCode: string) {
    return State.getStatesOfCountry(countryCode);
  }

  getCitiesByState(countryCode: string, stateCode: string) {
    return City.getCitiesOfState(countryCode,stateCode);
  }
}

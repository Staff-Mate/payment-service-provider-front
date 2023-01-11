import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {Client} from "../../auth/dto/client.model";

let ELEMENT_DATA: Client[] = [
  {
    permissions:[],
    paymentService: ['paypal'],
    email: 'gp.recruit.hr@gmail.com',
    displayName: 'G-P Recruit',
    firstName: 'Erika',
    lastName: 'Waramunt',
    country: 'USA',
    state: 'Pennsylvania',
    city: 'Harrisburg'
  },
  {
    permissions:[],
    paymentService: ['bitcoin'],
    email:'lano.hr@gmail.com',
    displayName: 'Lano',
    firstName: 'Jac',
    lastName: 'Decker',
    country: 'USA',
    state:'California',
    city:'San Francisco'
  },
  {
    permissions:[],
    paymentService: ['qr','bank-card-service','bitcoin','paypal'],
    email:'ajeets.hr@gmail.com',
    displayName: 'Ajeets',
    firstName: 'Malika',
    lastName: 'Tran',
    country: 'USA',
    state:'Tennessee',
    city:'Memphis'
  },

];
@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss', '../../styles/sections.style.scss', '../../styles/table.style.scss']
})
export class UserManagerComponent implements OnInit {
  displayedColumns = ['company-name','owner','contact','services'];
  dataSource = ELEMENT_DATA;
  filterForm: UntypedFormGroup;
  startDate: UntypedFormControl;
  endDate: UntypedFormControl;
  service: UntypedFormControl;
  dateForm: UntypedFormGroup;

  constructor() { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){

    this.startDate = new UntypedFormControl()
    this.endDate = new UntypedFormControl()
    this.service = new UntypedFormControl()
    this.dateForm = new UntypedFormGroup({
      'startDate': this.startDate,
      'endDate': this.endDate
    })

    this.filterForm = new UntypedFormGroup({
      'dates': this.dateForm,
      'service': this.service
    })
    console.log(ELEMENT_DATA)
  }
}

import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Client} from "../../auth/dto/client.model";

let ELEMENT_DATA: Client[] = [
  {
    permissions: [],
    paymentService: ['paypal-service'],
    email: 'gp.recruit.hr@gmail.com',
    displayName: 'G-P Recruit',
    firstName: 'Erika',
    lastName: 'Waramunt',
    country: 'USA',
    state: 'Pennsylvania',
    city: 'Harrisburg'
  },
  {
    permissions: [],
    paymentService: ['bitcoin-service'],
    email: 'lano.hr@gmail.com',
    displayName: 'Lano',
    firstName: 'Jac',
    lastName: 'Decker',
    country: 'USA',
    state: 'California',
    city: 'San Francisco'
  },
  {
    permissions: [],
    paymentService: ['qr-code-service', 'bank-card-service', 'bitcoin-service', 'paypal-service'],
    email: 'ajeets.hr@gmail.com',
    displayName: 'Ajeets',
    firstName: 'Malika',
    lastName: 'Tran',
    country: 'USA',
    state: 'Tennessee',
    city: 'Memphis'
  },

];

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss', '../../styles/sections.style.scss', '../../styles/table.style.scss']
})
export class UserManagerComponent implements OnInit {
  displayedColumns = ['company-name', 'owner', 'contact', 'services'];
  dataSource = ELEMENT_DATA;
  filterForm: FormGroup;
  startDate: FormControl;
  endDate: FormControl;
  service: FormControl;
  dateForm: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {

    this.startDate = new FormControl()
    this.endDate = new FormControl()
    this.service = new FormControl()
    this.dateForm = new FormGroup({
      'startDate': this.startDate,
      'endDate': this.endDate
    })

    this.filterForm = new FormGroup({
      'dates': this.dateForm,
      'service': this.service
    })
    console.log(ELEMENT_DATA)
  }
}

import {Component, OnInit, ViewChild} from '@angular/core';
import {MatLegacyPaginator as MatPaginator} from "@angular/material/legacy-paginator";
import {MatSort} from "@angular/material/sort";
import {FormControl, FormGroup} from "@angular/forms";

export interface Payment {
  service: string;
  description: string;
  amount: number;
  date: Date;
  status: string;
}

const ELEMENT_DATA: Payment[] = [
  {
    service: 'paypal-service',
    description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
    amount: 1200,
    date: new Date(),
    status: "finished"
  },
  {
    service: 'bank-card-service',
    description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
    amount: 12345,
    date: new Date(2022, 4, 1, 14, 24),
    status: 'finished'
  },
  {
    service: 'paypal-service',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
    amount: 548,
    date: new Date(2022, 3, 1, 9, 11),
    status: 'failed'
  },
  {
    service: 'qr-code-service',
    description: 'Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
    amount: 813,
    date: new Date(2022, 10, 1, 22, 38),
    status: 'active'
  },
  {
    service: 'bitcoin-service',
    description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
    amount: 254,
    date: new Date(2022, 11, 15, 21, 59),
    status: 'finished'
  },
  {
    service: 'bitcoin-service',
    description: 'Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
    amount: 7485,
    date: new Date(2022, 11, 23, 11, 47),
    status: 'finished'
  },
  {
    service: 'qr-code-service',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
    amount: 654,
    date: new Date(2022, 11, 25, 4, 11),
    status: 'error'
  },
  {
    service: 'bank-card-service',
    description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
    amount: 6848,
    date: new Date(2022, 11, 26, 17, 9),
    status: 'finished'
  },
];

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss', '../../styles/sections.style.scss', '../../styles/table.style.scss']
})
export class HistoryComponent implements OnInit {
  displayedColumns: string[] = ['service', 'date', 'description', 'amount', 'status'];
  dataSource = ELEMENT_DATA;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  filterForm: FormGroup;
  startDate: FormControl;
  endDate: FormControl;
  status: FormControl;
  service: FormControl;
  activeServices: Array<String> = new Array<String>();


  constructor() {
  }

  ngOnInit() {
    this.initForm();
    this.filterForm.valueChanges.subscribe(()=>{

    })
  }


  private initForm() {
    this.startDate = new FormControl()
    this.endDate = new FormControl()
    this.status = new FormControl()
    this.service = new FormControl()

    this.filterForm = new FormGroup({
      'startDate': this.startDate,
      'endDate': this.endDate,
      'status': this.status,
      'service': this.service
    })
  }
}

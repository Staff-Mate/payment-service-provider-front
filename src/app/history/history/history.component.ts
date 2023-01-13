import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {FormControl, FormGroup} from "@angular/forms";
import {TransactionDto} from "../dto/transaction.dto";
import {PaymentMethodsService} from "../../user-payment-services/services/payment-methods.service";
import {PaymentMethod} from "../../user-payment-services/dto/payment-method.model";
import {Subject, takeUntil} from "rxjs";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatChipSelectionChange} from "@angular/material/chips";
import {HistoryService} from "../service/history.service";
import {Page} from "../../utils/page/page";


const ELEMENT_DATA: TransactionDto[] = [
  {
    serviceName: 'paypal-service',
    amount: 1200,
    timestamp: new Date(),
    status: "SUCCESS"
  },
  {
    serviceName: 'bank-card-service',
    amount: 12345,
    timestamp: new Date(2022, 4, 1, 14, 24),
    status: 'SUCCESS'
  },
  {
    serviceName: 'paypal-service',
    amount: 548,
    timestamp: new Date(2022, 3, 1, 9, 11),
    status: 'FAILED'
  },
  {
    serviceName: 'qr-code-service',
    amount: 813,
    timestamp: new Date(2022, 10, 1, 22, 38),
    status: 'ACTIVE'
  },
  {
    serviceName: 'bitcoin-service',
    amount: 254,
    timestamp: new Date(2022, 11, 15, 21, 59),
    status: 'SUCCESS'
  },
  {
    serviceName: 'bitcoin-service',
    amount: 7485,
    timestamp: new Date(2022, 11, 23, 11, 47),
    status: 'SUCCESS'
  },
  {
    serviceName: 'qr-code-service',
    amount: 654,
    timestamp: new Date(2022, 11, 25, 4, 11),
    status: 'ERROR'
  },
  {
    serviceName: 'bank-card-service',
    amount: 6848,
    timestamp: new Date(2022, 11, 26, 17, 9),
    status: 'SUCCESS'
  },
];

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss', '../../styles/sections.style.scss', '../../styles/table.style.scss']
})
export class HistoryComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['service-name', 'timestamp', 'amount', 'status'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  filterForm: FormGroup;
  startDate: FormControl;
  endDate: FormControl;
  status: FormControl;
  service: FormControl;
  activeServices: Array<String>;
  allPaymentServices: Array<PaymentMethod>;
  ngUnsubscribe = new Subject<void>();
  page: FormControl;
  pageSize: FormControl;
  transactions: Page<TransactionDto>;


  constructor(private paymentService: PaymentMethodsService, private historyService: HistoryService) {
    this.activeServices = new Array<String>();
    this.allPaymentServices = new Array<PaymentMethod>();
    this.transactions = new Page<TransactionDto>();
  }

  ngOnInit() {
    this.initForm();

    this.historyService.getFilteredHistory(this.filterForm.value).subscribe(response =>{
      console.log(response)
      this.transactions = response;
    });

    this.filterForm.valueChanges.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
      console.log("CHANGE")
      if(this.status.value == 'ACTIVE'){
        this.historyService.getFilteredActiveTransactions(this.filterForm.value).subscribe(response =>{
          console.log(response)
          this.transactions = response;
        });
      }else{
        this.historyService.getFilteredHistory(this.filterForm.value).subscribe(response =>{
          console.log(response)
          this.transactions = response;
        });
      }
    })
    this.paymentService.getAllPaymentServices().subscribe(response =>{
      this.allPaymentServices = response;
    })

  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private initForm() {
    this.startDate = new FormControl()
    this.endDate = new FormControl()
    this.status = new FormControl()
    this.service = new FormControl()
    this.page = new FormControl(0)
    this.pageSize = new FormControl(20)

    this.filterForm = new FormGroup({
      'startDate': this.startDate,
      'endDate': this.endDate,
      'status': this.status,
      'serviceId': this.service,
      'page': this.page,
      'pageSize': this.pageSize
    })
  }

  onActiveTransactionSelectionChanged($event: MatChipSelectionChange) {
    this.status.setValue($event.selected ? "ACTIVE" : null);
  }

  onPaginatorChange($event: PageEvent) {
    console.log($event)
  }
}

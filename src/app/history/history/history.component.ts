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

    this.historyService.getFilteredHistory(this.filterForm.value).subscribe(response => {
      console.log(response)
      this.transactions = response;
    });

    this.filterForm.valueChanges.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
      console.log("CHANGE")
      if (this.status.value == 'ACTIVE') {
        this.historyService.getFilteredActiveTransactions(this.filterForm.value).subscribe(response => {
          console.log(response)
          this.transactions = response;
        });
      } else {
        this.historyService.getFilteredHistory(this.filterForm.value).subscribe(response => {
          console.log(response)
          this.transactions = response;
        });
      }
    })
    this.paymentService.getAllPaymentServices().subscribe(response => {
      this.allPaymentServices = response;
    })

  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onActiveTransactionSelectionChanged($event: MatChipSelectionChange) {
    this.status.setValue($event.selected ? "ACTIVE" : null);
  }

  onPaginatorChange($event: PageEvent) {
    console.log($event)
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
}

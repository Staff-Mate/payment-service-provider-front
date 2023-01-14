import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Client} from "../../auth/dto/client.model";
import {UserService} from "../../user-payment-services/services/user.service";
import {PaymentMethodDto} from "../../user-payment-services/dto/payment-method.dto";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss', '../../styles/sections.style.scss', '../../styles/table.style.scss']
})
export class UserManagerComponent implements OnInit, OnDestroy {
  displayedColumns = ['company-name', 'owner', 'contact', 'services'];
  filterForm: FormGroup;
  service: FormControl;
  search: FormControl;
  allPaymentServices: Array<PaymentMethodDto>;

  users: Array<Client>
  ngUnsubscribe = new Subject<void>();

  constructor(private userService: UserService) {
    this.allPaymentServices = new Array<PaymentMethodDto>();
  }

  ngOnInit(): void {
    this.initForm();
    this.userService.getFilteredUsers(this.filterForm.value).subscribe(response =>{
      this.users = response;
    })
    this.userService.getAllPaymentServices().subscribe(response => {
      this.allPaymentServices = response;
    })

    this.filterForm.valueChanges.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
        this.userService.getFilteredUsers(this.filterForm.value).subscribe(response => {
          this.users = response;
        });
    })
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  initForm() {
    this.service = new FormControl()
    this.search = new FormControl()

    this.filterForm = new FormGroup({
      'search': this.search,
      'serviceId': this.service
    })
  }
}

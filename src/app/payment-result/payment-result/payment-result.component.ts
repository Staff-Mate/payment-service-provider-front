import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-payment-result',
  templateUrl: './payment-result.component.html',
  styleUrls: [ '../../styles/sections.style.scss']
})
export class PaymentResultComponent implements OnInit {
  result: string | undefined;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.result = this.route.snapshot.routeConfig?.path;
  }

}

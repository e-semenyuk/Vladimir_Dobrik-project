import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../currency.service';
import { Currency } from '../currency';

import {ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'currency-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  currencies: Currency[];

  constructor(private currencyService: CurrencyService,
              private cdref: ChangeDetectorRef) { }

  ngOnInit() {
    this.currencyService.getCurrencies()
      .subscribe(currencies => this.currencies = currencies);
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
}

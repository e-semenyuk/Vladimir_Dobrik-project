import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CurrencyService } from '../currency.service';
import { Currency } from '../currency';

@Component({
  selector: 'currency-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalculatorComponent implements OnInit {
  currencies: Currency[];

  public firstCurrency: Currency;
  public secondCurrency: Currency;

  public value: number;
  public exchangeResult: number;

  public roundChkbxChecked: boolean = true;

  constructor(private currencyService: CurrencyService) { }

  public calcExchangeResult(): void {
    let firstCurrencyRate = this.firstCurrency ? Number(this.firstCurrency.Cur_OfficialRate) : 0;
    let firstCurrencyScale = this.firstCurrency ? Number(this.firstCurrency.Cur_Scale) : 0;
    let secondCurrencyRate = this.secondCurrency ? Number(this.secondCurrency.Cur_OfficialRate) : 0;
    let secondCurrencyScale = this.secondCurrency ? Number(this.secondCurrency.Cur_Scale) : 0;

    if(this.value && this.firstCurrency && this.secondCurrency === undefined) {

      let result = (this.value * firstCurrencyRate) / firstCurrencyScale;

      if(this.roundChkbxChecked) {
        this.exchangeResult = Number((result).toFixed(4));
      } else {
        this.exchangeResult = result;
      }
    }

    if(this.value && this.firstCurrency && this.secondCurrency) {

      let result = (((this.value * firstCurrencyRate) / firstCurrencyScale) / secondCurrencyRate) * secondCurrencyScale;

      if(this.roundChkbxChecked) {
        this.exchangeResult = Number((result).toFixed(4));
      } else {
        this.exchangeResult = result;
      }
    }

    if(!this.value || !this.firstCurrency) {
      this.exchangeResult = null;
    }
  }

  ngOnInit() {
    this.currencyService.getCurrencies()
      .subscribe(currencies => this.currencies = currencies);
  }

  ngAfterContentChecked() {
    this.calcExchangeResult();
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CurrencyService } from '../currency.service';

@Component({
  selector: 'currency-dynamics',
  templateUrl: './dynamics.component.html',
  styleUrls: ['./dynamics.component.scss']
})
export class DynamicsComponent implements OnInit {

  private currencyID: number;
  private isAdded: boolean = false;

  constructor(private currencyService: CurrencyService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.currencyID = p['id'];
      this.disableBtn();
    })
  }

  add():void {
    this.currencyService.addToFavorite(this.currencyID);
    this.isAdded = true;
  }

  disableBtn(): void {
    let currenciesLS = JSON.parse(localStorage.getItem('currencies'));

    if(currenciesLS !== null && currenciesLS.favorite) {
      let isAdded = currenciesLS.favorite
        .find(item => item.id === this.currencyID);

      if(isAdded) {
        this.isAdded = true;
      } else {
        this.isAdded = false;
      }
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../currency.service';

@Component({
  selector: 'currency-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent implements OnInit {

    links: object[] = [
      {
        title: 'Currencies',
        routerLink: 'home',
      },
      {
        title: 'Calculator',
        routerLink: 'calculator',
      },
      {
        title: 'About',
        routerLink: 'about',
      }
    ];

    activeLink = this.links[0];

    count: number;

  constructor(private currencyService: CurrencyService) { }

  ngOnInit() {
    this.currencyService.counterFavorites.subscribe(count => this.count = count);
  }

  resetCounter(): void {
    this.currencyService.counterFavorites.next();
    this.currencyService.counter = 0;
  }
}

import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'currency-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent implements OnInit {
    public link;
    public links: object[] = [
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

    public activeLink = this.links[0];

    public count: number;

  constructor(private currencyService: CurrencyService) { }

  ngOnInit() {
    this.currencyService.counterFavorites.subscribe(count => this.count = count);
  }

  public resetCounter(): void {
    this.currencyService.counterFavorites.next();
    this.currencyService.counter = 0;
  }
}

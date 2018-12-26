import { Injectable } from '@angular/core';
import { Currency } from './currency';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { DateService } from './date.service';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  public currencies: Currency[];
  private currenciesRatesUrl = 'http://www.nbrb.by/API/ExRates/Rates';

  constructor(private http: HttpClient,
              public dateService: DateService) {
    this.getCurrencies().subscribe(currencies => this.currencies = currencies);
}

  private handleError<T> (result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getCurrencies(date?: Date): Observable<Currency[]> {
    let formattedDate: string;

    if(date) {
        formattedDate = `onDate=${this.dateService.dateToYMD(date)}`;
    } else {
        formattedDate = '';
    }

    const url = `${this.currenciesRatesUrl}?Periodicity=0&ParamMode=1&${formattedDate}`;

    return this.http.get<Currency[]>(url).pipe(
      tap(_ => console.log('getCurrencies fetched currencies')),
      catchError(this.handleError([]))
    );
  }

  searchCurrencies(term: string) {
    let searchResult: Currency[] = [];

    if (term.trim() === '') {
      searchResult = [];
    }

    this.currencies.forEach(item => {
      if (term.trim().length) {
        if (item.Cur_Abbreviation.includes(term.toUpperCase())) {
          if(!searchResult.includes(item)){
            searchResult.push(item);
          }
        }
      }

      searchResult.forEach((item, index, arr) => {
        if(!item.Cur_Abbreviation.includes(term.trim().toUpperCase())) {
          arr.splice(index, 1);
        }
      });
    });

    return searchResult;
  }
}

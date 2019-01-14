import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  public dateToYMD(date: Date): string {
    let result: string;
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    result = `${year}-${month}-${day}`;

    return result;
  }

  public getDateNthDayAgo(nthDaysAgo: number): Date {
    return new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() - nthDaysAgo
    );
  }
}
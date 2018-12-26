import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  constructor() { }

  dateToYMD(date: Date): string {
    let result: string
    let d = date.getDate();
    let m = date.getMonth() + 1;
    let y = date.getFullYear();

    result = `${y}-${m}-${d}`;

    return result;
  }

  getDateWeekAgo(): Date {
    return new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() - 7
    );
  }
}


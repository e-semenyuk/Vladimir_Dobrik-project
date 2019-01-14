import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showplus'
})
export class ShowplusPipe implements PipeTransform {

  transform(value: number): string | number {

    if(value && typeof value === 'number' || typeof value === 'string') {
      if(Number(value) > 0) {
        return `+${value}`;
      } else {
        return value;
      }
    } else {
      return value;
    }
  }
}

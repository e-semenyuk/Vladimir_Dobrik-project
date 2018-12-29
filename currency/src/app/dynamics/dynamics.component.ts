import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CurrencyService } from '../currency.service';
import { DateService } from '../date.service';

import { Chart } from 'chart.js';

@Component({
  selector: 'currency-dynamics',
  templateUrl: './dynamics.component.html',
  styleUrls: ['./dynamics.component.scss']
})
export class DynamicsComponent implements OnInit {

  private id: number;

  startDate: Date = this.dateService.getDateNthDayAgo(7);
  endDate: Date = new Date();

  chart = [];

  constructor(private currencyService: CurrencyService,
              private dateService: DateService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.id = p['id'];
      this.getDynamics();
    })
  }

  getDynamics(): void {
    this.currencyService.getDynamics(this.id, this.startDate, this.endDate)
      .subscribe(dynamics => {
        let curOfficialRates: number[] = dynamics.map(item => item.Cur_OfficialRate);
        let dates: string[] = dynamics.map(item => {
          return item.Date.substring(0, 10);
        });

        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: dates,
            datasets: [
              {
                data: curOfficialRates,
                lineTension: 0,
                backgroundColor: '#9E53BC',
                fill: true,
                pointBackgroundColor: 'transparent',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
              }
            ]
          },
          options: {
            events: ['click'],
            legend: {
              display: false,
            },
            scales: {
              xAxes: [{
                display: false
              }],
              yAxes: [{
                display: true
              }]
            },
            layout: {
              padding: {
                left: 50,
                right: 0,
                top: 50,
                bottom: 0
              }
            }
          }
        })
      });
  }

  onChange(type: string, event: any) {
    if(type === 'start') {
      this.startDate = event.value._d;
      this.getDynamics();
    } else {
      this.endDate = event.value._d;
      this.getDynamics();
    }
  }
}

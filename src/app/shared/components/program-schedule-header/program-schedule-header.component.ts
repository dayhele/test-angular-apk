import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-program-schedule-header',
  templateUrl: './program-schedule-header.component.html',
  styleUrls: ['./program-schedule-header.component.scss']
})
export class ProgramScheduleHeaderComponent implements OnInit {
  public months: string[];
  public btnToday: string;
  public environment: any;
  public btnTomorrow: string;

  constructor() {
    this.months = [];
    this.btnToday = '';
    this.btnTomorrow = '';
    this.environment = environment;
  }

  ngOnInit(): void {
    let today = new Date();
    this.months = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro'
    ];

    this.btnToday = today.getDate() + ' de ' + this.months[today.getMonth()];
    today.setDate(today.getDate() + 1);
    this.btnTomorrow = today.getDate() + ' de ' + this.months[today.getMonth()];
  }
}

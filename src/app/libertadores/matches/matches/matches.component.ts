import { Component, Input, OnInit } from '@angular/core';
import { Matches } from 'src/app/shared/interfaces/matches';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {
  @Input() data?: Matches;

  constructor() {}

  ngOnInit(): void {}
}

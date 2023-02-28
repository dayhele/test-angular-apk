import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-age-classification-list',
  templateUrl: './age-classification-list.component.html',
  styleUrls: ['./age-classification-list.component.scss']
})
export class AgeClassificationListComponent implements OnInit {
  public selectedIndex: number = 0;
  @Input() public age_bracket: number = 0;
  @Output() public selectAge: EventEmitter<number> = new EventEmitter();

  public ages: Array<{
    age: number;
    title: string;
    description: string;
  }> = new Array();

  constructor() {
    this.ages = [
      {
        age: 0,
        title: 'Classificação Livre',
        description: 'Mais restritivo'
      },
      {
        age: 10,
        title: 'Classificação 10 anos',
        description: 'Indicado para crianças'
      },
      {
        age: 12,
        title: 'Classificação 12 anos',
        description: 'Indicado para crianças mais velhas'
      },
      {
        age: 14,
        title: 'Classificação 14 anos',
        description: 'Indicado para adolescentes'
      },
      {
        age: 16,
        title: 'Classificação 16 anos',
        description: 'Indicado para jovens adultos'
      },
      {
        age: 18,
        title: 'Classificação 18 anos',
        description: 'Indicado para adultos'
      }
    ];
  }

  ngOnInit(): void {
    this.selectedIndex = this.ages.indexOf(
      this.ages.find((age) => age.age === this.age_bracket)!
    );
  }

  public select(index: number): void {
    this.selectedIndex = index;
    this.selectAge.emit(this.ages[index].age);
  }
}

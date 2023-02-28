import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges
} from '@angular/core';

@Component({
  selector: 'app-age-classification-list',
  templateUrl: './age-classification-list.component.html',
  styleUrls: ['./age-classification-list.component.scss']
})
export class AgeClassificationListComponent implements OnInit, OnChanges {
  public selectedIndex: number = 0;
  @Input() public age_bracket: string = '0';
  @Input() public value: any = {};
  @Output() public valueChange: EventEmitter<string> = new EventEmitter();
  @Output() public selectAge: EventEmitter<string> = new EventEmitter();

  public ages: Array<{
    age: string;
    title: string;
    description: string;
  }> = [
    {
      age: '0',
      title: 'Classificação Livre',
      description: 'Mais restritivo'
    },
    {
      age: '10',
      title: 'Classificação 10 anos',
      description: 'Indicado para crianças'
    },
    {
      age: '12',
      title: 'Classificação 12 anos',
      description: 'Indicado para crianças mais velhas'
    },
    {
      age: '14',
      title: 'Classificação 14 anos',
      description: 'Indicado para adolescentes'
    },
    {
      age: '16',
      title: 'Classificação 16 anos',
      description: 'Indicado para jovens adultos'
    },
    {
      age: '18',
      title: 'Classificação 18 anos',
      description: 'Indicado para adultos'
    }
  ];

  ngOnInit(): void {
    this.selectedIndex = this.ages.findIndex(
      (age: any) => age.age === this.value
    );
  }

  ngOnChanges(): void {
    this.selectedIndex = this.ages.findIndex(
      (age: any) => age.age === this.value
    );
  }

  public select(age: any, i: number): void {
    this.selectedIndex = i;
    this.valueChange.emit(age.age);
  }
}

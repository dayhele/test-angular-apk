
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown-gender',
  templateUrl: './dropdown-gender.component.html',
  styleUrls: ['./dropdown-gender.component.scss']
})
export class DropdownGenderComponent implements OnInit {
  public selectedGender: string;
  public active: boolean;

  @Input() actualGender: string;
  @Output() gender: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.selectedGender = 'Sexo';
    this.active = false;
    this.actualGender = '';
  }

  ngOnInit(): void {
    if (this.actualGender !== '') this.selectedGender = this.actualGender;
  }

  public toggleActive(): void {
    this.active = !this.active;
  }
  public toggleGender(gender: string): void {
    this.active = false;
    this.selectedGender = gender;

    let genderShort = '';
    if (this.selectedGender === 'Feminino') genderShort = 'F';
    else genderShort = 'M';

    this.gender.emit({ gender: genderShort });
  }
}

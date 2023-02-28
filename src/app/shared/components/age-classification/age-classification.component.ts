import { CreateComponent } from './../../../profile/create/create.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Profile } from '../../interfaces/profile';

@Component({
  selector: 'app-age-classification',
  templateUrl: './age-classification.component.html',
  styleUrls: ['./age-classification.component.scss']
})
export class AgeClassificationComponent implements OnInit {
  public environment: any;
  @Input() public age_bracket: number;
  @Input() public profile: Profile;
  @Output() public changes: EventEmitter<string> = new EventEmitter();
  @Output() public ageEmitter: EventEmitter<any> = new EventEmitter();
  @Output() public kidsEmitter: EventEmitter<any> = new EventEmitter();
  @Output() public liveEmmiter: EventEmitter<boolean> = new EventEmitter();

  constructor() {
    this.profile = {};
    this.age_bracket = 0;
  }

  ngOnInit(): void {
    this.environment = environment;
  }

  public sendAge(event: number) {
    this.profile.age_bracket = event;
    this.ageEmitter.emit(this.profile.age_bracket);
  }
}

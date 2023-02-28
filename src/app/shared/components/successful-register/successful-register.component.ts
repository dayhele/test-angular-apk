import { Theme } from 'src/assets/theme/theme';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-successful-register',
  templateUrl: './successful-register.component.html',
  styleUrls: ['./successful-register.component.scss']
})
export class SuccessfulRegisterComponent {
  @Input() public showConfirmation: boolean = false;
  @Input() public hasClose: boolean = true;

  constructor(public theme: Theme) {}
  @Output() public confirmClick = new EventEmitter();

  public confirm(): void {
    this.confirmClick.emit();
  }
}

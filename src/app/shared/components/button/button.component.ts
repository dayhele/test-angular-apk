import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() public type?: string;
  @Input() public classList?: string;
  @Input() public text?: string;
  @Input() public iconPath?: string;
  @Input() public iconFirst?: boolean;
  @Input() public onlyIcon?: boolean;
  @Input() public disabled?: boolean;
  @Input() public iconClass?: boolean;
  @Input() public favorite: boolean = false;
  @Input() public largeButton: boolean = false;

  constructor() {
    this.onlyIcon = false;
    this.iconFirst = false;
    this.type = '';
    this.classList = '';
    this.text = '';
    this.iconPath = '';
    this.iconClass = false;
  }
}

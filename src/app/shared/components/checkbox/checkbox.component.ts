import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {
  @Input() public error: boolean | undefined;
  @Input() public disabled: boolean = false;
  @Input() public value: string | undefined;
  @Output() public checked = new EventEmitter();

  constructor() {
    this.error = false;
  }

  public onChange(changes: any): void {
    this.error = false;
    this.checked.emit(changes?.target.checked)
  }
}

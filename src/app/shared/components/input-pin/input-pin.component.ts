import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges
} from '@angular/core';

@Component({
  selector: 'app-input-pin',
  templateUrl: './input-pin.component.html',
  styleUrls: ['./input-pin.component.scss']
})
export class InputPinComponent {
  @Input() public response?: boolean = undefined;
  @Input() public resetInput?: boolean;
  @Input() public error: boolean = false;
  @Input() public success: boolean = false;
  @Input() public value: string = '';
  @Output() public valueChange: EventEmitter<any> = new EventEmitter();
  @Output() public valueEmitter: EventEmitter<string> = new EventEmitter();
  @Output() public changeEmitter: EventEmitter<any> = new EventEmitter();

  public inputValue: string = '';
  public idPerfil: number = 0;
  public data: any = {};

  public checkPin(): void {
    this.changeEmitter.emit(this.value);
    if (this.value.length === 4) {
      this.valueEmitter.emit(this.value);
    } else this.response = undefined;
  }
}

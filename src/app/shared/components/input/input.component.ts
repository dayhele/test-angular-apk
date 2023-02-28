import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnChanges {
  @Input() public placeholder: string;
  @Input() public type: string;
  @Input() public error: boolean | undefined;
  @Input() public disabled: boolean = false;
  @Input() public value: string | undefined;
  @Input() public mask: string;
  @Input() public maxlength: any;
  @Output() public valueChange: EventEmitter<string>;
  @Input() public center: boolean = false;

  constructor() {
    this.placeholder = '';
    this.type = 'text';
    this.mask = '';
    this.error = false;
    this.value = '';
    this.valueChange = new EventEmitter();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['value']) {
      if (
        changes['value'].previousValue === '' &&
        changes['value'].currentValue !== ''
      )
        this.error = false;
    }
  }

  public onInputChanges(value: string) {
    this.valueChange.emit(value);
  }
}

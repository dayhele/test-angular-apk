import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaymentMethodsService } from '../../services/payment-methods.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  @Input() public options: any;
  @Input() public default: string;
  @Input() public error: boolean | undefined;
  @Input() public value: string | undefined;
  @Output() public valueChange: EventEmitter<string>;

  constructor(private paymentMethods: PaymentMethodsService) {
    this.default = '';
    this.error = false;
    this.value = '';
    this.valueChange = new EventEmitter();
  }

  ngOnInit(): void {
    this.paymentMethods.getPaymentMethods().subscribe((data) => {
      this.options = data;
    });
  }

  onChange() {
    this.valueChange.emit(this.value);
  }
}

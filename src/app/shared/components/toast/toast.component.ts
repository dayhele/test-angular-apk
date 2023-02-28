import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Theme } from 'src/assets/theme/theme';
import { environment } from '../../../../environments/environment';
import { Date } from '../../interfaces/date';
import { CheckDeviceService } from '../../services/check-device.service';
@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  public environment: any;
  public checkMobile: boolean;
  public endDate: Date | undefined;
  public seconds: string = '';
  public minutes: string = '';
  public hours: string = '';
  public days: string = '';
  public updateInterval: any = '';

  @Input() public toastTime?: string = '';
  @Input() public toastTitle?: string = '';
  @Input() public toastDesc?: string = '';
  @Input() public toastClass?: string = '';
  @Input() public toastReg?: boolean = false;
  @Input() public toastPaymentForecast?: string = '';

  @Output() public closeEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(public theme: Theme, private checkDevice: CheckDeviceService) {
    this.environment = environment;
    this.checkMobile = checkDevice.isMobile();
  }

  ngOnInit() {
    if(this.toastReg || this.toastPaymentForecast != ''){
      this.updateCount();

      this.updateInterval = setInterval(() => {
        this.updateCount();
      }, 1000);
    }
  }

  ngOnDestroy() {
    if (this.toastReg) {
      clearInterval(this.updateInterval);
    }
  }

  updateCount(){
    var now = new Date();
    if(this.toastPaymentForecast){
      var target = new Date(this.toastPaymentForecast);
      var dateDiff = target.getTime() - now.getTime();
      dateDiff = dateDiff / 1000;
      this.seconds = Math.floor((dateDiff % 60)).toString();
      dateDiff = dateDiff / 60;
      this.minutes = Math.floor((dateDiff % 60)).toString();
      dateDiff = dateDiff / 60;
      this.hours = Math.floor((dateDiff%24)).toString();
      this.days = Math.floor(dateDiff/24).toString();
    }
  }

  public closeToast(): void {
    if (this.toastReg) {
      clearInterval(this.updateInterval);
    }

    this.closeEvent.emit();
    localStorage.setItem('toastPayment', 'false');
    if (this.toastTime === '7D')
      localStorage.setItem(
        'toastVoucher7D',
        'true'
      );
    else if (this.toastTime === '15D')
      localStorage.setItem(
        'toastVoucher15D',
        'true'
      );
    else if (this.toastTime === '30D')
      localStorage.setItem(
        'toastVoucher30D',
        'true'
      );
  }
}

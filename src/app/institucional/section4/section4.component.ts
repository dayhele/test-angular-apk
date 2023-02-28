import { Component, OnInit } from '@angular/core';
import { CheckDeviceService } from 'src/app/shared/services/check-device.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-section4',
  templateUrl: './section4.component.html',
  styleUrls: ['./section4.component.scss']
})
export class Section4Component implements OnInit {
  public isMobile: boolean;
  public environment: any;

  constructor(
    private checkDeviceService: CheckDeviceService
  ) {
    this.isMobile = false;
   }

  ngOnInit(): void {
    this.isMobile = this.checkDeviceService.isMobile();
    this.environment = environment;
  }

}

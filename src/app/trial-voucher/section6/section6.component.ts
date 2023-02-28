import { Component, OnInit } from '@angular/core';
import { CheckDeviceService } from 'src/app/shared/services/check-device.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-section6',
  templateUrl: './section6.component.html',
  styleUrls: ['./section6.component.scss']
})
export class Section6Component implements OnInit {
  public isMobile: boolean = false;
  public environment: any;

  constructor(private checkDeviceService: CheckDeviceService) {
    this.environment = environment;
  }

  ngOnInit(): void {
    this.isMobile = this.checkDeviceService.isMobile();
  }
}

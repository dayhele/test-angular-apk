import { Component, Input, OnInit } from '@angular/core';
import { Device } from './../../../helpers/device';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-directv-go',
  templateUrl: './modal-directv-go.component.html',
  styleUrls: ['./modal-directv-go.component.scss']
})
export class ModalDirectvGoComponent implements OnInit {
  @Input() public showModal: boolean;
  public environment: any;

  constructor() {
    this.environment = environment;
    this.showModal = false;
  }

  ngOnInit() {
    if (Device.isMobile()) return;
    const notify = localStorage.getItem('directvgo-notify') || 'notify';
    this.showModal = notify === 'notify';

    if (this.showModal) {
      document.getElementsByTagName('body')[0].classList.add('no-scroll');
    } else {
      document.getElementsByTagName('body')[0].classList.remove('no-scroll');
    }
  }

  public closeModal() {
    this.showModal = false;
    document.getElementsByTagName('body')[0].classList.remove('no-scroll');
  }

  public onChange(event: any) {
    const checked = event?.target?.checked;
    localStorage.setItem('directvgo-notify', checked ? 'not-notify' : 'notify');
  }
}

import { Component, OnInit } from '@angular/core';
import { Device } from '../helpers/device';
import { Router } from '@angular/router';
import { Theme } from 'src/assets/theme/theme';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-produtos-adicionais',
  templateUrl: './produtos-adicionais.component.html',
  styleUrls: ['./produtos-adicionais.component.scss']
})
export class ProdutosAdicionaisComponent implements OnInit {
  public environment: any;

  get selectedOption(): string {
    return this.router.url.split('/')[2];
  }
  public isMobile: boolean = false;

  constructor(public router: Router, public theme: Theme) {
    this.environment = environment;
  }

  public ngOnInit(): void {
    this.isMobile = Device.isMobile();
  }
}

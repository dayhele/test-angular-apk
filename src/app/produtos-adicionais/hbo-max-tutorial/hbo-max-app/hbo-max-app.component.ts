import { Component } from '@angular/core';
import { Theme } from 'src/assets/theme/theme';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-hbo-max-app',
  templateUrl: './hbo-max-app.component.html',
  styleUrls: ['./hbo-max-app.component.scss']
})
export class HboMaxAppComponent {
  public environment: any;

  constructor(public theme: Theme) {
    this.environment = environment;
  }

  public goTo(path: string) {
    window.open(path);
  }
}

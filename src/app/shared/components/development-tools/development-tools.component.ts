import { Component, OnInit } from '@angular/core';
import { Theme } from 'src/assets/theme/theme';
import { CheckConnectionService } from '../../services/check-connection.service';
import { LoginService } from '../../services/login.service';
import { PlanAccessControlService } from '../../services/plan-access-control.service';

@Component({
  selector: 'app-development-tools',
  templateUrl: './development-tools.component.html',
  styleUrls: ['./development-tools.component.scss']
})
export class DevelopmentToolsComponent implements OnInit {
  public menuState: boolean = false;
  public forceMode: boolean = false;
  public forceModeInUse: boolean = false;
  private options: any = {};

  constructor(
    public theme: Theme,
    public planAcessControl: PlanAccessControlService,
    public checkConnection: CheckConnectionService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loadOptions();
  }

  private saveOptions(param: string, value: any): void {
    if (param === undefined || value === undefined) return;

    this.options[param] = value;
    localStorage.setItem('developmentTools', JSON.stringify(this.options));
  }

  private loadOptions(): void {
    if (!localStorage.getItem('developmentTools')) {
      this.options = {
        theme: '',
        menuState: false,
        checkConnection: true,
        forceMode: false,
        hasHBO: this.planAcessControl.hasHBO,
        hasParamount: this.planAcessControl.hasHBO,
        hasUolBanca: this.planAcessControl.hasUolBanca,
        hasStingrayMusic: this.planAcessControl.hasStingrayMusic
      };
      return;
    }

    this.options = JSON.parse(localStorage.getItem('developmentTools')!);

    this.forceMode = this.options.forceMode;

    if (this.forceMode) {
      this.planAcessControl.hasHBO = this.options.hasHBO;
      this.planAcessControl.hasParamount = this.options.hasParamount;
      this.planAcessControl.hasUolBanca = this.options.hasUolBanca;
      this.planAcessControl.hasStingrayMusic = this.options.hasStingrayMusic;
    } else {
      this.options.hasHBO = this.planAcessControl.hasHBO;
      this.options.hasParamount = this.planAcessControl.hasParamount;
      this.options.hasUolBanca = this.planAcessControl.hasUolBanca;
      this.options.hasStingrayMusic = this.planAcessControl.hasStingrayMusic;

      this.saveOptions('hasHBO', this.options.hasHBO);
      this.saveOptions('hasParamount', this.options.hasParamount);
      this.saveOptions('hasUolBanca', this.options.hasUolBanca);
      this.saveOptions('hasStingrayMusic', this.options.hasStingrayMusic);
    }

    this.menuState = this.options.menuState;
    this.checkConnection.checkConnectionStatus = this.options.checkConnection;
  }

  public changeMenuState(): void {
    this.menuState = !this.menuState;
    this.saveOptions('menuState', this.menuState);
  }

  public changeTheme(): void {
    let _theme = this.theme.client === 'watch' ? 'multilaser' : 'watch';
    this.theme.getTheme(_theme);
    localStorage.setItem('theme', _theme);
    this.saveOptions('theme', _theme);
  }

  public changeForceMode(): void {
    this.forceMode = !this.forceMode;
    this.saveOptions('forceMode', this.forceMode);
  }

  public applyForceMode(): void {
    this.forceModeInUse = true;

    this.planAcessControl.hasHBO = this.options.hasHBO;
    this.planAcessControl.hasParamount = this.options.hasParamount;
    this.planAcessControl.hasUolBanca = this.options.hasUolBanca;
    this.planAcessControl.hasStingrayMusic = this.options.hasStingrayMusic;
  }

  public changeAccountSubscribes(key: string): void {
    let _state = !(this.planAcessControl.userPlanAccessControl as any)[key];

    (this.planAcessControl.userPlanAccessControl as any)[key] = _state;

    this.saveOptions(key, _state);
  }

  public changeCheckConnectionState(): void {
    let _state = !this.checkConnection.checkConnectionStatus;
    this.checkConnection.checkConnectionStatus = _state;
    this.saveOptions('checkConnection', _state);
  }

  public changeAccountLogin(_theme: string): void {
    this.loginService.logout();
    this.theme.getTheme(_theme);
    localStorage.setItem('theme', _theme);
    this.saveOptions('theme', _theme);
  }

  public logout(): void {
    this.loginService.logout();
  }
}

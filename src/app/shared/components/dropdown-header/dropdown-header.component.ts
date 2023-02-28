import { PlanAccessControlService } from 'src/app/shared/services/plan-access-control.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Theme } from 'src/assets/theme/theme';
import { environment } from '../../../../environments/environment';
import { Profile } from '../../interfaces/profile';
import { CheckConnectionService } from '../../services/check-connection.service';
import { LoginService } from '../../services/login.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-dropdown-header',
  templateUrl: './dropdown-header.component.html',
  styleUrls: ['./dropdown-header.component.scss']
})
export class DropdownHeaderComponent implements OnInit {
  public environment: any;

  @Input() public active: boolean;
  @Input() public profileList: Profile[] = [];
  @Input() public isSelected: boolean;
  @Input() public profile: Profile = {};
  @Output() public closeEvent = new EventEmitter();
  @Output() public profileToEnterEmitter = new EventEmitter();
  public profileLimit: any;

  constructor(
    private loginService: LoginService,
    private profileService: ProfileService,
    private router: Router,
    public theme: Theme,
    public planAcessControl: PlanAccessControlService,
    private checkConnectionService: CheckConnectionService
  ) {
    this.active = false;
    this.isSelected = false;
    this.environment = environment;
    this.profileLimit = {};
  }

  ngOnInit(): void {
    this.router.events.subscribe((route) => {
      if (route instanceof NavigationEnd) {
        this.active = false;
      }
    });
  }

  public onDropdownClick(): void {
    this.getProfileList();

    this.active = !this.active;
    if (!this.active) {
      this.closeEvent.emit();
    }
  }

  public getAgeBracket(): string {
    let _correctAge = this.profile?.age_bracket?.toString();
    if (_correctAge?.includes('a' || 'A')) _correctAge?.replace('a' || 'A', '');
    return _correctAge || '';
  }

  public getProfileList(): void {
    this.profileService.profilesObservable.subscribe((profiles) => {
      this.profileList = profiles.success?.data!;
      if (profiles.success) {
        this.profileLimit = profiles.success;
      }
    });
  }

  public onLogoutProfileClick(): void {
    this.profileService.logoutProfile();
    this.router.navigateByUrl('/profile/select/manage');
  }

  public onLogoutClick(): void {
    this.loginService.logout();
  }

  public getCurrentUrl(): string {
    return this.router.url;
  }

  public selectProfile(profile: Profile): void {
    if (profile.id_perfis === this.profile.id_perfis) {
      this.active = false;
      return;
    }
    if (profile.use_pin) {
      profile.foto_full_path = profile.foto;
      this.profileToEnterEmitter.emit(profile);
      this.active = false;
    } else {
      this.checkConnectionService
        .disconnectMyProfile(parseInt(this.profileService.selectedProfile))
        .subscribe(
          (data) => {
            this.profileService.selectProfile(profile.id_perfis);
            this.checkConnectionService.connectMyProfile().subscribe();
            this.active = false;
            this.router.navigate(['/home'], { replaceUrl: true }).then(() => {
              window.location.reload();
            });
          },
          (err) => {
            this.profileService.selectProfile(profile.id_perfis);
            this.checkConnectionService.connectMyProfile().subscribe();
            this.active = false;
            this.router.navigate(['/home'], { replaceUrl: true }).then(() => {
              window.location.reload();
            });
          }
        );
    }
  }

  public createProfile(route: string): void {
    this.router.navigateByUrl(route);
  }
}

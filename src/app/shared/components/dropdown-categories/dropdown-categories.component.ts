import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Theme } from 'src/assets/theme/theme';
import { idMenuNSports } from 'src/environments/environment';
import { Profile } from '../../interfaces/profile';
import { Submenu } from '../../interfaces/submenu';
import { CheckDeviceService } from '../../services/check-device.service';
import { HomeService } from '../../services/home.service';
import { LoginService } from '../../services/login.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-dropdown-categories',
  templateUrl: './dropdown-categories.component.html',
  styleUrls: ['./dropdown-categories.component.scss']
})
export class DropdownCategoriesComponent implements OnInit {
  @Input() public active: boolean;
  @Input() public profileList: Profile[];
  @Input() public isSelected: boolean;
  @Input() public categories: Submenu[];
  @Input() public isUnloggedSession: boolean = false;
  @Input() public icons: boolean = false;
  @Output() public closeEvent = new EventEmitter();

  constructor(
    private loginService: LoginService,
    private profileService: ProfileService,
    private router: Router,
    private checkDeviceService: CheckDeviceService,
    private homeService: HomeService,
    public theme: Theme
  ) {
    this.active = false;
    this.isSelected = false;
    this.profileList = [];
    this.categories = [];
  }

  ngOnInit(): void {
    this.router.events.subscribe((route) => {
      if (route instanceof NavigationEnd) {
        this.active = false;
      }
    });
  }

  public onDropdownClick(): void {
    this.active = !this.active;
    if (!this.active) this.closeEvent.emit();
  }

  public onLogoutProfileClick(): void {
    this.profileService.logoutProfile();
    this.router.navigateByUrl('/profile/select');
  }

  public onLogoutClick(): void {
    this.loginService.logout();
  }

  public openCategory(category: Submenu): void {
    if (category.id === idMenuNSports) {
      this.router.navigateByUrl(
        '/nsports'
      );

      return;
    }

    this.router.navigateByUrl(
      '/ver-mais/' + category.id + '/' + category.title
    );
  }
}

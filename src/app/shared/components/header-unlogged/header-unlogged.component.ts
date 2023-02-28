import {
  AfterContentInit,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../../../environments/environment';
import { Profile } from '../../interfaces/profile';
import { ProfileStructure } from '../../interfaces/profile-structure';
import { Submenu } from '../../interfaces/submenu';
import { Theme } from 'src/assets/theme/theme';
import { CheckDeviceService } from '../../services/check-device.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-header-unlogged',
  templateUrl: './header-unlogged.component.html',
  styleUrls: ['./header-unlogged.component.scss']
})
export class HeaderUnloggedComponent implements OnInit {
  public environment: any;
  public iconPath: string;
  public isLoadingProfileList: boolean;
  public width: number;
  public currentRoute: string;
  public inDropDown: boolean;
  public showCategories: boolean = false;

  @Input() public profileStructure: ProfileStructure;
  @Input() public profileList: Profile[];
  @Input() public categories: Submenu[];
  @Input() public isLogged: boolean;
  @Input() public profile: Profile = {};
  @Input() public isSelected: boolean;
  @Input() public imageIsLoaded: boolean;
  @Input() public hasLiveChannels: boolean = false;
  @Input() public isAmericanet: boolean = false;
  @Input() public showHeaderOptions: boolean = true;
  @Input() public isRentScreen: boolean = false;

  @Output() public profileToEnterEmitter = new EventEmitter();

  public isSearchInputActive: boolean;
  public keyword: string;
  public keywordSize: number;
  public placeholderTerm: string;
  public clickedCategory: boolean;
  public isMobile: boolean = false;
  public profileToEnter: Profile = {};
  public checkMobile: boolean = false;

  @HostListener('window: resize', ['$event'])
  onResize() {
    this.width = window.innerWidth;
    window.innerWidth <= 900
      ? (this.iconPath = 'assets/icons/avatar-mobile-icon.svg')
      : (this.iconPath = 'assets/icons/avatar-icon.svg');
  }

  constructor(
    private router: Router,
    public theme: Theme,
    private checkDevice: CheckDeviceService,
    private checkDeviceService: CheckDeviceService,
    private loginService: LoginService
  ) {
    this.checkMobile = checkDevice.isMobile();
    this.width = 0;
    this.isLogged = false;
    this.iconPath = '';
    this.isSelected = false;
    this.profileStructure = {};
    this.categories = [];
    this.profileList = [];
    this.isLoadingProfileList = true;
    this.imageIsLoaded = false;
    this.isSearchInputActive = false;
    this.keyword = '';
    this.keywordSize = this.keyword.length;
    this.placeholderTerm = 'O que você está procurando?';
    this.clickedCategory = false;
    this.currentRoute = '';
    this.environment = environment;
    this.inDropDown = false;
  }

  ngAfterContentInit(): void {
    this.isLoadingProfileList = false;
    this.isMobile = this.checkDeviceService.isMobile();
  }

  ngOnInit(): void {
    this.width = window.innerWidth;
    window.innerWidth <= 900
      ? (this.iconPath = 'assets/icons/avatar-mobile-icon.svg')
      : (this.iconPath = 'assets/icons/avatar-icon.svg');

    if (this.getCurrentPage() === 'try') this.showCategories = true;
  }

  public getProfileToEnter(event: any): void {
    this.profileToEnterEmitter.emit(event);
  }

  public onCategoryClick(): void {
    this.clickedCategory = !this.clickedCategory;
  }

  public onSubmit(): void {
    this.router.navigate(['/search'], {
      queryParams: { keyword: this.keyword }
    });
    this.keyword = '';
    this.keywordSize = this.keyword.length;
  }

  public doTheFirstName(name: string | undefined): string {
    const profileName = name!.split(' ')[0];
    return profileName;
  }

  public search(e: string): void {
    this.keyword = e;
    this.keywordSize = this.keyword.length;
  }

  public removeWhitespaces(value?: string): string {
    if (value) {
      return value.replace(/\s/g, '-').toLowerCase();
    }
    return '';
  }

  public changeDropDown(): void {
    if (this.isMobile) this.router.navigateByUrl('/profile/select');
    else this.inDropDown = !this.inDropDown;
  }

  getCurrentPage(): string {
    return this.router.url.split('/')[1];
  }

  public getCurrentUrl(): string {
    return this.router.url;
  }

  logoClick(): void {
    this.showCategories = false;

    if (this.getCurrentPage() === 'welcome') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }

    this.router.navigateByUrl('welcome');
  }

  public goTo(path: string, clearSession?: boolean): void {
    if (clearSession) this.loginService.clearUnloggedDetails();

    if (path === 'try') this.showCategories = true;
    else this.showCategories = false;

    this.router.navigateByUrl(path);
    sessionStorage.setItem('isUnloggedSession', 'true');
  }
}

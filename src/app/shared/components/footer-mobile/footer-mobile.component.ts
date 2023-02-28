import { ProfileService } from 'src/app/shared/services/profile.service';
import { LoginService } from 'src/app/shared/services/login.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-mobile',
  templateUrl: './footer-mobile.component.html',
  styleUrls: ['./footer-mobile.component.scss']
})
export class FooterMobileComponent implements OnInit {
  @Input() public currentRoute: string = '';
  @Input() public hasLiveChannels: boolean = false;

  public isSelected: boolean = false;

  constructor(
    private loginService: LoginService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.loginService.loadToken();
    if (this.profileService.loadProfile()) {
      this.isSelected = true;
    }
  }
}

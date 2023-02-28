import { AccountService } from './../shared/services/account.service';
import { Router } from '@angular/router';
import { ProfileService } from './../shared/services/profile.service';
import { Profile } from './../shared/interfaces/profile';
import { Component, OnInit } from '@angular/core';
import { Theme } from 'src/assets/theme/theme';
import { CheckDeviceService } from '../shared/services/check-device.service';

@Component({
  selector: 'app-retention',
  templateUrl: './retention.component.html',
  styleUrls: ['./retention.component.scss']
})
export class RetentionComponent implements OnInit {
  public profile: Profile = {};
  public profileSelectedId: number = 0;
  public profileSelected: Profile = {};
  public profileMaster: Profile = {};
  public profilesLoaded: boolean = false;
  public showModal: boolean = false;
  public cancellationConfirmed: boolean = false;
  public checkMobile: boolean = false;

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private accountService: AccountService,
    public theme: Theme,
    public checkDevice: CheckDeviceService
  ) {
    this.checkMobile = this.checkDevice.isMobile();
  }

  ngOnInit(): void {
    this.profileSelectedId = parseInt(this.profileService.selectedProfile);
    this.getProfileList();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  public getProfileList(): void {
    this.profileService.getUserProfileList().subscribe((profilesData) => {
      let profiles = profilesData.success!.data!;
      this.getProfiles(profiles);
    });
  }

  public getProfiles(profiles: Profile[]) {
    for (let i = 0; i < profiles.length; i++) {
      let profile = profiles[i];

      if (this.profileSelectedId === profile.id_perfis)
        this.profileSelected = profile;

      if (profile.master === 1) this.profileMaster = profile;

      let profileMasterLength = Object.keys(this.profileMaster).length;
      let profileSelectedLength = Object.keys(this.profileSelected).length;

      if (profileMasterLength > 0 && profileSelectedLength > 0) {
        this.profilesLoaded = true;
        return;
      }
    }
  }

  public closeModal(): void {
    this.showModal = false;
    if (this.cancellationConfirmed) {
      this.router.navigate(['/home']);
    }
  }

  public goToPlans(): void {
    this.router.navigate(['/planos']);
  }

  public cancelSubscription(): void {
    this.accountService.cancelAccount().subscribe((data) => {
      this.cancellationConfirmed = true;
    });
  }
}

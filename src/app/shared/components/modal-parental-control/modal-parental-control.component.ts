import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Profile } from 'src/app/shared/interfaces/profile';
import { environment } from 'src/environments/environment';
import { ProfileService } from 'src/app/shared/services/profile.service';

@Component({
  selector: 'app-modal-parental-control',
  templateUrl: './modal-parental-control.component.html',
  styleUrls: ['./modal-parental-control.component.scss']
})

export class ModalParentalControlComponent {
  @Output() public closeModalEmit = new EventEmitter<boolean>();
  @Input() public showModal: boolean = false;
  @Input() public profile: Profile = {};

  public environment: any = environment;
  public email: string = '';
  public pin: string = '';
  public response?: boolean = undefined;
  public isLoading: boolean = false;
  public redefinePass: boolean = false;
  public apiMsg: string = '';
  
  constructor(private profileService: ProfileService) { }

  public closeModal(): void {
    this.showModal = false;
    this.redefinePass = false;
    this.resetStates();

    this.closeModalEmit.emit(this.showModal);
  }

  public handleForgotPass() {
    this.redefinePass = true;
    this.resetStates();
  }

  public forgotPass(profileId: number, email: string) {
    if(!email) return;

    this.isLoading = true;

    this.profileService.forgotPass(profileId, email).subscribe((res) => {
      this.apiMsg = res.msg.replace('\n', ' ');
      this.response = res.success;

      this.isLoading = false;
    })
  }

  public pinCheck(profileId: number, pin: string) {
    this.isLoading = true;

    this.profileService.pinCheck(profileId, pin).subscribe((res) => {
      if(res.success) {
        this.profileService.selectProfile(profileId);
      } else {
        this.apiMsg = res.msg;
        this.response = res.success ? undefined : res.success;  
      }

      this.isLoading = false;
    })
  }

  private resetStates() {
    this.response = undefined;
    this.apiMsg = '';
    this.email = '';
    this.pin = '';
    this.isLoading = false;
  }

  public handleClick() {
    this.response = undefined;
    this.apiMsg = '';
  }
}
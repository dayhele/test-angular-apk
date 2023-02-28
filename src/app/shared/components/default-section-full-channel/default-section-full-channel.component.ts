import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-default-section-full-channel',
  templateUrl: './default-section-full-channel.component.html',
  styleUrls: ['./default-section-full-channel.component.scss']
})
export class DefaultSectionFullChannelComponent {
  @Input() public sectionLogoChannel?: any;
  @Input() public sectionBackgroundImg?: any;
  @Input() public sectionDescription?: any;
  @Input() public sectionTitle?: string;
  @Input() public sectionButtonText?: string;
  @Input() public sectionButtonLink?: string;
  @Input() public id?: number;
  @Input() public onlyView: boolean = false;
  @Input() public isNovelas?: boolean = false;
  @Output() public highlightRedirect = new EventEmitter();

  public isNSportsCard: boolean = false;
  public environment: any;

  constructor(private router: Router) {
    this.sectionLogoChannel = '';

    this.sectionBackgroundImg = '';

    this.sectionDescription = '';

    this.sectionButtonText = '';

    this.sectionButtonLink = '';

    this.id = 0;

    this.environment = environment;
  }

  public goTo(): void {
    if (this.sectionButtonLink && !this.onlyView)
      this.router.navigateByUrl(this.sectionButtonLink);
  }
}

import { Device } from 'src/app/helpers/device';
import { SectionService } from './../../services/section.service';
import {
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';
import { CardData, CardProperties } from '../../interfaces/card';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { KeepWatching } from '../../interfaces/keep-watching';
import { Theme } from 'src/assets/theme/theme';
import { CheckDeviceService } from '../../services/check-device.service';
import { idNSportsMatches } from 'src/environments/environment.prod';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnChanges {
  public checkMobile: boolean = false;
  @Input() public isNSportsCard: boolean = false;
  @Input() public isPreSaveCard: boolean = false;

  @Input() public title: string = '';
  @Input() public subtitle: string = '';
  @Input() public viewMore: string = '';
  @Input() public idPerfil: number = 0;
  @Input() public hasAwesomenessLogo: boolean = false;
  @Input() public hasCustomIcon: string = '';
  @Input() public properties: CardProperties = {};
  @Input() public data: CardData[] = [];
  @Input() public rented: string = '';
  @Input() public cardOnly: boolean = false;

  @Input() public verMais: boolean = false;
  @Input() public section: any = {};
  @Input() public id: number = 0;
  @Input() public isInfinity: boolean = false;
  @Input() public keepWatchingList: KeepWatching[] = [];

  @Input() public goToWatch: boolean = false;

  @Input() public isExclusiveContent: boolean = false;
  @Input() public labelExclusiveContent: string = '';
  @Input() public hasExclusiveContent: boolean = false;
  @Input() public hasSectionIcon: boolean = false;
  @Input() public hasPadding: boolean = true;
  @Input() public hasNavigation: boolean = true;
  @Input() public allowTouchMove: boolean = true;

  @Input() public showExpiredContent: boolean = true;
  @Input() public isConmebolLibertadores: boolean = false;
  @Input() public noClick: boolean = false;

  @Output() public hasntExclusiveContentEvent: EventEmitter<
    any
  > = new EventEmitter();

  public environment: any = environment;
  public isMobile: boolean = false;
  constructor(
    private router: Router,
    public theme: Theme,
    public checkDevice: CheckDeviceService
  ) {
    this.checkMobile = this.checkDevice.isMobile();
    this.isMobile = Device.isMobile();
  }

  ngOnChanges(): void {
    this.buildRoute();
  }

  private buildRoute(): void {
    this.data.forEach((element) => {
      let _now = new Date();
      let _expireDate = new Date(element.expire!);
      let _diffTime = Math.round((Number(_expireDate) - Number(_now)) / 1000);

      element.expired = _diffTime < 0;

      if (this.goToWatch) {
        switch (element.type) {
          case 'filme':
            element.route = `watch?id=${element.id}&type=filme&position=${element.position}`;
            break;
          case 'serie':
            element.route = `watch?id=${element.serieId}&type=serie&isLive=false&episodeId=${element.episode_id}&isMarathon=false&position=${element.position}`;
            break;
        }
      } else
        element.route = `/details/${element.id}/${element.type}/${this.isExclusiveContent}`;
    });
  }

  public viewMoreClick(): void {
    this.router.navigateByUrl(this.viewMore);
  }

  openCategory() {

    if (this.isPreSaveCard) {
      this.router.navigateByUrl('pre-lancamentos');
      return;
    }

    if (this.hasCustomIcon) {
      sessionStorage.setItem('hasCustomIcon', this.hasCustomIcon);
      if (this.id === idNSportsMatches) {
        this.router.navigateByUrl('/nsports');
        return;
      }
      this.router.navigateByUrl(
        '/ver-mais/' + this.id + '/' + this.title + '/CustomIcon'
      );
    } else this.router.navigateByUrl('/ver-mais/' + this.id + '/' + this.title);
  }

  public hasntParamount(): void {
    this.hasntExclusiveContentEvent.emit();
  }
}

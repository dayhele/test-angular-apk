import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { Router } from '@angular/router';
import { Theme } from 'src/assets/theme/theme';
import { environment } from 'src/environments/environment';
import { CardData } from '../../interfaces/card';
import { CheckDeviceService } from '../../services/check-device.service';
import { ProfileService } from '../../services/profile.service';
import { ProgressService } from '../../services/progress.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() public properties: any;
  @Input() public data: CardData;
  @Input() public dataList: CardData[];
  @Input() public dataListFiltered: CardData[];
  @Input() public idPerfil: number;
  @Input() public route: string = '';
  @Input() public rented: string = '';
  @Input() public isExclusiveContent: boolean = false;
  @Input() public labelExclusiveContent: string = '';
  @Input() public hasExclusiveContent: boolean | undefined = false;
  @Input() public isExpired: boolean = false;
  @Input() public cardOnly: boolean = false;
  @Input() public isNSports: boolean = false;
  @Input() public showProgress: boolean = false;
  @Input() public serieId: number = 0;
  @Input() public getProgress: boolean = false;
  @Input() public isConmebolLibertadores: boolean = false;
  @Input() public noClick: boolean = false;

  @Output() public hasntExclusiveContentEvent: EventEmitter<
    any
  > = new EventEmitter();

  public isMobile: boolean;
  public screen_x: number;
  public statusProgress: number;
  public index: number;
  public mediaType: string;
  public completed: boolean;
  public position: number;
  public duration: number;

  public episodePosition: any[] = [];
  public episodeDuration: any[] = [];

  public releaseDay: string = '';
  public releaseMonth: string = '';

  public hasImageError: boolean = false;

  @HostListener('window: resize', ['$event'])
  public onResize() {
    this.screen_x = window.innerWidth;
    if (this.screen_x < 768) this.isMobile = true;
  }

  constructor(
    private router: Router,
    private profileService: ProfileService,
    public theme: Theme,
    public checkDeviceService: CheckDeviceService,
    private progressService: ProgressService
  ) {
    this.statusProgress = 0;
    this.properties = {};
    this.data = {};
    this.dataList = [];
    this.dataListFiltered = [];

    this.idPerfil = 0;

    this.screen_x = 0;
    this.isMobile = false;

    this.route = '';
    this.mediaType = 'serie';

    this.index = 0;
    this.position = 0;
    this.duration = 0;
    this.completed = false;
  }

  ngOnInit(): void {
    this.checkProgress();
    if (window) {
      this.screen_x = window.innerWidth;
      if (this.screen_x < 768) this.isMobile = true;
    }

    if (!this.data?.genres && this.data?.generos)
      this.data.genres = this.data?.generos;
    if (!this.data?.title && this.data?.titulo)
      this.data.title = this.data?.titulo;
    if (this.data.genres)
      this.data.genres = this.removeDuplicatedChips(this.data.genres);

    this.idPerfil = parseInt(this.profileService.selectedProfile);

    if ((this.isNSports || this.data.isNSports) && !this.data.genres?.length) {
      this.properties.rentable = !this.data?.isRentedTitleActive && Number(this.data.price) > 0;
      this.properties.rentMovieTitle = !this.data?.isRentedTitleActive && Number(this.data.price) > 0;
    }

    if (this.data.isPreSave) {
      if (this.data.abrevReleaseDate && this.data.abrevReleaseDate?.length > 0) {
        this.releaseDay = this.data.abrevReleaseDate.split(' ')[0];
        this.releaseMonth = this.data.abrevReleaseDate.split(' ')[1];
      }

      this.data.imageUrl = `${environment.preSaveImageService}/${this.data.cover}`;
    }

    this.noClick =
      (this.data.isConmebolLibertadores &&
        this.data.matchIsComingSoon &&
        !this.data.genres?.length) ??
      false;
  }

  ngOnChanges(): void {
    this.checkProgress();
  }

  public checkProgress() {
    if (this.getProgress) {
      this.index = this.data.order! - 1;
      this.progressService
        .getProgress(
          parseInt(this.profileService.selectedProfile),
          this.mediaType,
          this.serieId
        )
        .subscribe((data) => {
          for (let i = 0; i < data.seasons.length; i++) {
            this.episodePosition[i] = [];
            this.episodeDuration[i] = [];
            for (let j = 0; j < data.seasons[i].episodes.length; j++) {
              this.episodePosition[i].push(
                data.seasons[i].episodes[j].position
              );
              this.episodeDuration[i].push(
                data.seasons[i].episodes[j].duration
              );
            }
          }

          this.completed = data.seasons[0].episodes[this.index].completed;
          this.position = data.seasons[0].episodes[this.index].position;
          this.duration = data.seasons[0].episodes[this.index].duration;

          if (this.completed == true) {
            this.statusProgress = 2;
          } else if (this.position > 0) {
            this.statusProgress = 1;
          } else {
            this.statusProgress = 0;
          }
        });
    }
  }

  public goTo(): void {
    if (this.isMobile && this.data?.isPreSave) {
      this.router.navigateByUrl('pre-lancamentos');
      return;
    }

    if (this.cardOnly || this.data?.isPreSave || this.noClick) return;

    if (this.isExclusiveContent && !this.hasExclusiveContent) {
      this.router.navigateByUrl('/ver-mais/10023/Sugestões/CustomIcon');
      this.hasntExclusiveContentEvent.emit();
      return;
    }

    if (this.data?.isComingSoon) return;

    if (this.route !== '') this.router.navigateByUrl(this.route);
  }

  public removeDuplicatedChips(chips: string[]): string[] {
    let uniqueChips: string[] = [];
    chips.forEach((chip) => {
      if (!uniqueChips.includes(chip)) uniqueChips.push(chip);
    });
    return uniqueChips;
  }

  public imgOnError(event: Event) {
    this.hasImageError = true;
    let src = 'https://watchbr-resources.s3.amazonaws.com/images/icon_loader.png';
    if (this.properties?.orientation == 'horizontal') {
      src = 'https://watchbr-resources.s3.amazonaws.com/images/icon_loader_horizontal.png';
    }
    let img = (event.target as HTMLImageElement);
    let card = img.closest('.card') as HTMLDivElement;
    if (card) card.style.backgroundColor = 'transparent';
    if (img) img.src = src;
  }
}

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
import { CardData } from '../../interfaces/card';
import { Cdnlist } from '../../interfaces/cdnlist';
import { DataList } from '../../interfaces/keep-watching';
import { MainStructure } from '../../interfaces/main-structure';
import { BuildUrlImageService } from '../../services/build-url-image.service';
import { CheckDeviceService } from '../../services/check-device.service';
import { ProgressService } from '../../services/progress.service';
import { WatchService } from '../../services/watch.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card-episode-season',
  templateUrl: './card-episode-season.component.html',
  styleUrls: ['./card-episode-season.component.scss']
})
export class CardEpisodeSeasonComponent implements OnInit {
  @Input() public properties: any;
  @Input() public data: CardData;
  @Input() public dataList: CardData[];
  @Input() public dataListFiltered: CardData[];
  @Input() public idPerfil: number;
  @Input() public serieId: number = 0;

  @Input() public route: string = '';
  @Input() public rented: string = '';
  @Input() public isParamount: boolean = false;
  @Input() public hasParamount: boolean = false;
  @Input() public isExpired: boolean = false;

  @Output() public hasntParamountEvent: EventEmitter<any> = new EventEmitter();

  public isMobile: boolean;
  public completed: boolean;
  public screen_x: number;
  public statusProgress: number;
  public position: number;
  public duration: number;
  public index: number;
  public mediaType: string;
  public main: MainStructure;
  public dataImg: DataList;
  public environment: any;

  public episodePosition: any[] = [];
  public episodeDuration: any[] = [];

  @HostListener('window: resize', ['$event'])
  public onResize() {
    this.screen_x = window.innerWidth;
    if (this.screen_x < 768) this.isMobile = true;
  }

  constructor(
    private router: Router,
    public theme: Theme,
    private watchService: WatchService,
    private progressService: ProgressService,
    private buildUrlImage: BuildUrlImageService,
    public checkDeviceService: CheckDeviceService
  ) {
    this.environment = environment;

    this.dataImg = {};
    this.main = {};
    this.properties = {};
    this.data = {};
    this.dataList = [];
    this.dataListFiltered = [];

    this.idPerfil = 0;

    this.statusProgress = 0;
    this.position = 0;
    this.duration = 0;
    this.index = 0;
    this.mediaType = 'serie';

    this.screen_x = 0;
    this.isMobile = false;
    this.completed = false;

    this.route = '';
  }

  async ngOnInit(): Promise<void> {
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

    this.data.imageUrl = await this.buildUrlImage.buildUrlImage(
      this.data?.cdn,
      this.data?.cover
    );

  }

  ngOnChanges(): void {
    this.index = this.data.order! - 1;

    this.progressService
      .getProgress(this.idPerfil, this.mediaType, this.serieId)
      .subscribe((data) => {
        for (let i = 0; i < data.seasons.length; i++) {
          this.episodePosition[i] = [];
          this.episodeDuration[i] = [];
          for (let j = 0; j < data.seasons[i].episodes.length; j++) {
            this.episodePosition[i].push(data.seasons[i].episodes[j].position);
            this.episodeDuration[i].push(data.seasons[i].episodes[j].duration);
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

  public buildImage(
    cdnId: number | undefined,
    imageName: string | undefined
  ): string {
    let urlCdn: Cdnlist | undefined = this.main?.cdnlist?.find(
      (cdn?: any) => cdn.id === cdnId
    );
    if (urlCdn && urlCdn.value && this.dataImg.ks) {
      return urlCdn.value
        .replace('{image}', imageName!)
        .replace('{ks}', this.dataImg.ks);
    }
    return '';
  }

  public goTo(): void {
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
}

import { ChromecastService } from './../shared/services/chromecast.service';
import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { environment } from '../../environments/environment';
import { Episode } from '../shared/interfaces/episode';
import { Language } from '../shared/interfaces/language';
import { Movie, SeriesSeasons } from '../shared/interfaces/movie';
import { SeasonAndEpisode } from '../shared/interfaces/season-and-episode';
import { Source } from '../shared/interfaces/source';
import { CheckConnectionService } from '../shared/services/check-connection.service';
import { MoviesSeriesService } from '../shared/services/movies-series.service';
import { NextEpisodeService } from './shared/next-episode.service';
import { LanguageSelectorComponent } from './../shared/components/language-selector/language-selector.component';
import { VideoQualityComponent } from './../shared/components/video-quality/video-quality.component';
import { ProfileService } from './../shared/services/profile.service';
import { ProgressService } from './../shared/services/progress.service';
import { debounceTime, Subject, Observable, Subscription } from 'rxjs';
import { WatchService } from './shared/watch.service';
import { Location } from '@angular/common';
import { CheckDeviceService } from '../shared/services/check-device.service';
import { Theme } from 'src/assets/theme/theme';
import { UserDataServiceService } from '../shared/services/user-data-service.service';
import { UserData } from '../shared/interfaces/user-data';

declare let window: any;
declare let KalturaPlayer: any;
@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})
export class WatchComponent implements OnInit, OnDestroy {
  public environment: any = environment;
  public kaltura: any;
  public id_kaltura?: number;
  public position: number = 0;
  public id?: number;
  public type?: string;
  public movie?: Movie;
  public serieData: Movie = {};
  public seasonIndex: number = 0;
  public episode: Episode = {};
  public nextEpisode: Episode = {};
  public showNextEpisode: boolean = false;
  public nextEpisodeAvailable: boolean = false;
  public screen_x: number = 0;
  public actualTime: string = '00:00:00';
  public fullTime: string = '00:00:00';
  public openVolume: boolean = false;
  public isPlaying: boolean = false;
  public isLive: boolean = false;
  public loading: boolean = true;
  public inactive: boolean = false;
  public initialPosition: number = 0;

  public isPlayOnChromecast: boolean = false;

  public audioPack: Language[] = [];
  public subtitlePack: Language[] = [];
  public languagesLoaded: boolean = false;
  public sources: Source[] = [];
  public videoQualitiesLoaded: boolean = false;
  public now: number = 0;
  public tempoAtual: string = '';
  public idPerfil: number = 0;
  public intervalSaveProgress: any = 0;
  public previousVolume: number = 0;
  public muted: boolean = false;
  public timerSubscription: Subscription = new Subscription();

  public playerLoaded: boolean = false;

  private subscribeCurrentTime: any;
  public details: any = { id_kaltura: 0 };
  public isMarathon: boolean = false;
  public isNovela: boolean = false;

  private isWatching: boolean = true;
  private sendProgressTimeout: any;
  private checkConnectionTimeout: any;

  public isSafari = false;

  public chromeCastDevicesAvailable: Observable<boolean> = new Observable();
  public playOnChromecast: boolean = false;

  public isMobile: boolean = false;
  public appleDevice: boolean = false;
  public mobileApple: boolean = false;
  public macOS: boolean = false;
  public UserData: any = [];
  public company: string = '';
  public id_isp: string = '';
  public user_id: string = '';

  public isRunningOnChromecast: boolean = false;
  public preRollActive: boolean = true;

  @ViewChild('audioOptions') audioOptions!: LanguageSelectorComponent;
  @ViewChild('videoOptions') videoOptions!: VideoQualityComponent;

  constructor(
    private route: ActivatedRoute,
    private mediaService: MoviesSeriesService,
    private deviceService: DeviceDetectorService,
    private nextEpisodeService: NextEpisodeService,
    private profileService: ProfileService,
    private progressService: ProgressService,
    private watchService: WatchService,
    private checkConnectionService: CheckConnectionService,
    private chromecastService: ChromecastService,
    public location: Location,
    private checkDeviceService: CheckDeviceService,
    private router: Router,
    private theme: Theme,
    private UserDataServiceService: UserDataServiceService,
  ) {
    this.sendProgressTimeout = this.sendProgress();
    this.checkConnectionTimeout = this.checkConnection();
    this.appleDevice = this.watchService.checkAppleDevice();
    this.macOS = this.watchService.checkMacOs();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    switch (event.key) {
      case ' ':
        this.togglePlay();
        break;

      case 'ArrowLeft':
        this.handleRewind();
        break;

      case 'ArrowRight':
        this.handleForward();
        break;
    }
  }

  @HostListener('window: resize', ['$event'])
  public onResize(): void {
    this.screen_x = window.innerWidth;
  }

  private inactiveSubject: Subject<any> = new Subject();
  @HostListener('document: mousemove', ['$event'])
  public onMouseMove(): void {
    this.inactive = false;
    this.inactiveSubject.next(true);
  }

  ngOnInit(): void {
    this.isMobile = this.checkDeviceService.isMobile();
    this.mobileApple = this.watchService.mobileApple();

    this.screen_x = window.innerWidth;
    const isLogged = parseInt(this.profileService.selectedProfile);
    if (isLogged) this.idPerfil = isLogged;
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'];

      if (params['isMarathon'])
        this.isMarathon = params['isMarathon'] === 'true';
      if (params['playOnChromecast'])
        this.playOnChromecast = params['playOnChromecast'] === 'true';

      this.type = params['type'];
      this.initialPosition = Number(params['position']);

      this.isLive = params['isLive'] === 'true';

      this.isNovela = params['isNovela'] === 'true';

      this.episode.id = Number(params['episodeId']);

      if (this.type === 'serie') this.nextEpisodeService.serieId = this.id!;

      if (this.id && this.type) {
        this.displayMediaInfo();
      } else {
        this.return();
      }
    });
    if (!this.deviceService.isDesktop()) {
      try {
        window.screen.orientation.unlock();

        window.screen.orientation.lock('landscape');
      } catch {}
    }

    this.inactiveSubject.pipe(debounceTime(5000)).subscribe(() => {
      if (this.isPlayOnChromecast) return;

      this.inactive = true;
      this.audioOptions?.close();
      this.videoOptions?.close();
    });
    this.inactiveSubject.next(true);
  }

  ngOnDestroy(): void {
    this.isWatching = false;

    clearTimeout(this.sendProgressTimeout);
    clearTimeout(this.checkConnectionTimeout);

    clearInterval(this.intervalSaveProgress);

    try {
      window.screen.orientation.lock('portrait');
      this.kaltura?.destroy();
    } catch {}

    try {
      this.kaltura?.destroy();
      this.timerSubscription.unsubscribe();
    } catch {}

  }

  clickVolume() {
    if (this.isMobile) this.openVolume = !this.openVolume;
    else this.volume = this.volume == 0 ? 0.5 : 0;
  }

  openChromeCast(changeUrl: boolean = false): void {
    if (changeUrl)
      this.chromecastService.changeMedia(
        this.kaltura.sources.dash[0].url,
        this.kaltura.currentTime,
        this.kaltura.volume,
        this.movie?.title!,
        this.getPoster()
      );
    if (!changeUrl)
      this.chromecastService.openChromeCast(
        this.kaltura.sources.dash[0].url,
        this.kaltura.currentTime,
        this.kaltura.volume,
        this.movie?.title!,
        this.getPoster()
      );

    this.isPlayOnChromecast = true;

    this.isPlaying = true;

    this.currentTimeCast = this.kaltura.currentTime;
    this.tempoAtualChromeCast = this.convertHMS(this.currentTimeCast);

    if (!changeUrl) this.kaltura.pause();
    else this.kaltura.play();

    this.updateTimeChromecast();
  }

  public currentTimeCast: number = 0;
  public tempoAtualChromeCast: string = '00:00:00';

  private updateTimeChromecast(): void {
    setTimeout(() => {
      this.updateTimeChromecast();
      this.chromecastService.getCurrentTime().subscribe((time) => {
        if (time == 0) return;

        this.currentTimeCast = time;
        this.tempoAtualChromeCast = this.convertHMS(this.currentTimeCast);
      });
    }, 1000);
  }

  reproduzirDispositivo() {
    this.isPlayOnChromecast = false;
    this.isRunningOnChromecast = false;
    this.chromecastService.stop();
    this.kaltura.play();
  }

  reproduzirChromecast() {
    this.isPlayOnChromecast = true;
    this.isRunningOnChromecast = false;
    this.openChromeCast(true);
  }

  loadingMedia = false;
  private async initKalturaPlayer(
    idKaltura: string,
    position: number
  ): Promise<void> {
    this.UserDataServiceService.AccountInfo().subscribe(val => {
      this.company = val.data.company;
      this.id_isp = val.data.id_isp;
      this.user_id = val.data.user_id;
      try {
          this.preRollActive = !this.isLive;
          this.kaltura = KalturaPlayer.setup({
            targetId: 'kaltura_player_15630281',
            provider: {
              partnerId: '2267831',
              uiConfId: '44208331'
            },
            playback: {
              autoplay: true,
              audioLanguage: 'por'
            },
            ui: {
              disable: true
            },
            plugins: {
              youbora: {
                disable: false,
                options: {
                  accountCode: "watchbrazil",
                  username: "watchbrazil",
                  'content.customDimension.1': this.id_isp,
                  'content.customDimension.2': this.company,
                  'content.customDimension.3': this.user_id,
                  'content.customDimension.4': this.idPerfil,
                  'content.customDimension.5': idKaltura,
                },
              }
            }
          });

          this.kaltura.addEventListener(
            this.kaltura.Event.PLAYER_STATE_CHANGED,
            (event: any) => {
              this.loadingMedia =
                event.payload.newState.type == this.kaltura.State.LOADING ||
                (event.payload.newState.type == this.kaltura.State.PAUSED &&
                  event.payload.oldState.type == this.kaltura.State.LOADING);
            }
          );

          if (!this.preRollActive) this.startMedia(idKaltura);
          else {
            this.kaltura.loadMedia({ entryId: this.theme.preRoll });
            this.kaltura.addEventListener(
              this.kaltura.Event.PLAYER_STATE_CHANGED,
              (event: any) => {
                if (
                  event.payload.newState.type == this.kaltura.State.IDLE &&
                  this.preRollActive
                ) {
                  this.startMedia(idKaltura);
                }
              }
            );
          }
        } catch (e: any) {}

        this.kaltura.ready().then(() => {
          this.mediaReady();
          this.kaltura.play();
        });
      });
  }

  private startMedia(idKaltura: string) {
    this.chromeCastDevicesAvailable =
      this.chromecastService.chromeCastDevicesAvailable;
    this.chromecastService.inicializeChromecast().subscribe((status) => {
      setTimeout(() => {
        if (status === 'CONNECTED') {
          this.isRunningOnChromecast = true;
          if (this.kaltura) this.kaltura.pause();
        }
      }, 2000);
    });

    this.kaltura
      .loadMedia(
        { entryId: idKaltura },
        {
          startTime: this.initialPosition || 0
        },
        { volume: 0.5 }
      )
      .then(() => {
        if (this.playOnChromecast) this.openChromeCast(true);

        if (this.kaltura.isAdaptiveBitrateEnabled()) {
          this.isSafari = true;
        } else {
          this.isSafari = false;
        }
        this.loading = false;
        this.isPlaying = true;
        this.preRollActive = false;

        if (this.isRunningOnChromecast) this.kaltura.pause();
      });
  }

  private mediaReady(): void {
    this.kaltura.volume = 0.5;
    this.isPlaying = true;
    this.startCurrentTimeCheck();
    this.prepareSources();

    if (this.type === 'serie') {
      this.nextEpisodeService.seasons = this.serieData.seasons!;

      this.playerLoaded = true;

      this.nextEpisodeAvailable = this.nextEpisodeService.checkNextEpisode();

      if (this.nextEpisodeAvailable) this.prepareNextEpisode();
    }

    let savedQuality = localStorage.getItem('videoQuality');
    let selectedQualityIndex = this.sources.findIndex(
      (s) => s.label == savedQuality
    );
    if (selectedQualityIndex == -1) this.kaltura.selectTrack(this.sources[0]);
    else this.kaltura.selectTrack(this.sources[selectedQualityIndex]);
  }

  public set source(id: number) {
    if (!id) return;
    localStorage.setItem('source_id', id.toString());
  }

  public get source(): number {
    return parseInt(localStorage.getItem('source_id')!);
  }

  private async prepareNextEpisode(): Promise<void> {
    this.nextEpisode = await this.nextEpisodeService.getNextEpisode();
  }

  private prepareSources(): void {
    let _sources = this.kaltura.getTracks(this.kaltura.Track.VIDEO);

    this.sources = _sources;

    if (this.sources.length > 0 && !this.source) {
      this.selectSource({
        source: this.sources[this.source || 0],
        id: this.source || 0
      });
    }
  }

  private subtitles = [];

  private audio = [];

  private loadAudioAndSubtitlesLanguages(): void {
    const subtitles = this.kaltura.getTracks(this.kaltura.Track.TEXT);
    const audio = this.kaltura.getTracks(this.kaltura.Track.AUDIO);

    let _subtitlesIguais =
      this.subtitles.map((x: any) => x.language).length ==
      subtitles.map((x: any) => x.language).length;
    let _audioIguais =
      this.audio.map((x: any) => x.language).length ==
      audio.map((x: any) => x.language).length;

    if (!_subtitlesIguais || !_audioIguais) {
      this.subtitles = subtitles;
      this.audio = audio;
      this.subtitlePack = [];
      this.audioPack = [];
    } else {
      return;
    }

    subtitles.map((subtitle: any) => {
      switch (subtitle.language) {
        case 'off': {
          this.subtitlePack.push({
            name: 'Desativado',
            code: 'off',
            isSelected: subtitle.active,
            type: 'subtitle'
          });
          break;
        }
        case 'por': {
          this.subtitlePack.push({
            name: 'Português',
            code: 'por',
            isSelected: subtitle.active,
            type: 'subtitle'
          });
          break;
        }
        case 'eng': {
          this.subtitlePack.push({
            name: 'Inglês',
            code: 'eng',
            isSelected: subtitle.active,
            type: 'subtitle'
          });
          break;
        }
      }
    });
    audio.map((audio: any) => {
      switch (audio.language) {
        case 'por': {
          this.audioPack.push({
            name: 'Português',
            code: 'por',
            isSelected: audio.active,
            type: 'audio'
          });
          break;
        }
        case 'eng': {
          this.audioPack.push({
            name: 'Original',
            code: 'eng',
            isSelected: audio.active,
            type: 'audio'
          });
          break;
        }
      }
    });

    if (this.subtitlePack.length > 0) {
      this.subtitlePack.sort((a, b) => {
        if (a.code === 'off') return -1;
        if (b.code === 'off') return 1;
        return 0;
      });
    } else {
      this.subtitlePack.push({
        name: 'Desativado',
        code: 'off',
        isSelected: true,
        type: 'subtitle'
      });
    }

    if (this.audioPack.length > 0) {
      this.audioPack.sort((a, b) => {
        if (a.code === 'por') return -1;
        if (b.code === 'por') return 1;
        return 0;
      });
    } else {
      this.audioPack.push({
        name: 'Português',
        code: 'por',
        isSelected: true,
        type: 'audio'
      });
    }

    this.subtitlePack = this.removeDuplicates(this.subtitlePack, 'code');
    this.audioPack = this.removeDuplicates(this.audioPack, 'code');

    let savedAudio = localStorage.getItem('savedAudio');
    let selectedAudioIndex = this.audioPack.findIndex(
      (s) => s.code == savedAudio
    );
    if (selectedAudioIndex == -1) this.selectTrack(this.audioPack[0]);
    else this.selectTrack(this.audioPack[selectedAudioIndex]);

    let savedSubtitle = localStorage.getItem('savedSubtitle');
    let savedSubtitleIndex = this.subtitlePack.findIndex(
      (s) => s.code == savedSubtitle
    );
    if (savedSubtitleIndex == -1) this.selectTrack(this.subtitlePack[0]);
    else this.selectTrack(this.subtitlePack[savedSubtitleIndex]);
  }

  private removeDuplicates(originalArray: any, prop: any) {
    const newArray: any = [];
    const lookupObject: any = {};
    for (let i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }
    for (let i in lookupObject) {
      newArray.push(lookupObject[i]);
    }
    return newArray;
  }

  public selectTrack(track: Language) {
    if (track.type == 'subtitle') {
      this.kaltura.getTracks(this.kaltura.Track.TEXT).map((subtitle: any) => {
        if (subtitle.language == track.code) {
          localStorage.setItem('savedSubtitle', track.code);
          this.subtitlePack.forEach((track) => {
            track.isSelected = false;
          });
          track.isSelected = true;
          this.kaltura.selectTrack(subtitle);
          this.updateTracks();
        }
      });
      if (this.isPlayOnChromecast)
        this.chromecastService.setSubtitle(track.code);
    } else if (track.type == 'audio') {
      this.kaltura.getTracks(this.kaltura.Track.AUDIO).map((audio: any) => {
        if (audio.language == track.code) {
          localStorage.setItem('savedAudio', track.code);
          this.audioPack.forEach((track) => {
            track.isSelected = false;
          });
          track.isSelected = true;
          this.kaltura.selectTrack(audio);
          this.updateTracks();
        }
      });
      if (this.isPlayOnChromecast) this.chromecastService.setAudio(track.code);
    }
  }

  public selectSource(newSource: { source: Source; id: number }): void {
    this.kaltura.selectTrack(newSource.source);
    this.source = newSource.id;
    localStorage.setItem('videoQuality', newSource.source.label);
  }

  private updateTracks(): void {
    this.sources = [];
    this.loadAudioAndSubtitlesLanguages();
    this.prepareSources();
  }

  public mute(): void {
    this.muted = !this.muted;
    if (this.muted) {
      this.previousVolume = this.kaltura.volume;
      this.kaltura.volume = 0;
    } else {
      this.kaltura.volume = this.previousVolume;
    }

    if (this.isPlayOnChromecast)
      this.chromecastService.setVolume(this.kaltura.volume);
  }

  public displayMediaInfo(): void {
    this.mediaService.getDetails(0, this.id!, this.type!).subscribe((data) => {
      this.movie = data;

      if (this.type === 'filme') {
        if (this.movie && this.movie.id_kaltura) {
          this.details.id_kaltura = this.movie.id_kaltura;
          this.initKalturaPlayer(this.movie.id_kaltura, this.position);
        }
      } else if (this.type === 'serie') {
        this.serieData = data;

        this.preparePlayerForSerie();
      }
    });
  }

  public preparePlayerForSerie(): void {
    let index = this.findSeasonAndEpisodeIndex(
      this.episode.id!,
      this.serieData.seasons!
    );

    if (index.seasonIndex !== -1 && index.episodeIndex !== -1) {
      let episode =
        this.serieData.seasons![index.seasonIndex!].videos![
          index.episodeIndex!
        ];

      this.episode.title =
        'T' +
        index.seasonOrder! +
        ':E' +
        index.episodeOrder! +
        ' - ' +
        episode.title!;

      this.nextEpisodeService.seasonIndex = index.seasonIndex!;
      this.nextEpisodeService.episodeIndex = index.episodeIndex!;
      this.nextEpisodeService.seasonOrder = index.seasonOrder!;

      this.details.id_kaltura = episode.id_kaltura;

      if (!this.playerLoaded)
        this.initKalturaPlayer(episode.id_kaltura!, this.position);
      else {
        this.playerLoaded = true;
        this.restartPlayer(episode.id_kaltura!);
      }
    }
  }

  private restartPlayer(id_kaltura: string): void {
    this.fullTime = '00:00:00';
    this.showNextEpisode = false;
    this.nextEpisodeAvailable = false;
    this.kaltura
      .loadMedia(
        { entryId: id_kaltura },
        {
          startTime: this.initialPosition || 0
        },
        { volume: 0.5 }
      )
      .then(() => {
        this.mediaReady();
      });
  }

  private findSeasonAndEpisodeIndex(
    episodeId: number,
    seasons: SeriesSeasons[]
  ): SeasonAndEpisode {
    let _seasonEpisodeIndex = {
      seasonIndex: -1,
      episodeIndex: -1,
      seasonOrder: -1,
      episodeOrder: 0
    };
    seasons.some((season, seasonIndex) => {
      return season.videos.some((episode, episodeIndex) => {
        if (episode.id === episodeId) {
          _seasonEpisodeIndex.seasonIndex = seasonIndex;
          _seasonEpisodeIndex.seasonOrder = season.order!;
          _seasonEpisodeIndex.episodeIndex = episodeIndex;
          _seasonEpisodeIndex.episodeOrder = episode.order!;
          return true;
        }
        return false;
      });
    });

    return _seasonEpisodeIndex;
  }

  public updateCurrentTime(currentTime: number): void {
    if (this.isPlayOnChromecast) {
      this.chromecastService.seek(currentTime);
      return;
    } else {
      this.kaltura.currentTime = currentTime;
    }
  }

  public togglePlay(): void {
    this.isPlaying = !this.isPlaying;
    this.handlePlay();
  }

  public toggleSubtitles(language: string): void {
    let textTracks = this.kaltura.getTracks(this.kaltura.Track.TEXT);
    this.kaltura.selectTrack(
      textTracks[this.filterLanguages(textTracks, language)]
    );
  }

  public toggleAudioLanguage(language: string): void {
    let audioTracks = this.kaltura.getTracks(this.kaltura.Track.AUDIO);
    this.kaltura.selectTrack(
      audioTracks[this.filterLanguages(audioTracks, language)]
    );
  }

  returnPrevious() {
    this.watchService.fullScreen(false);

    this.route.queryParamMap
      .subscribe((params) => {
        if(params.get('isNovelas') != null){
          if(params.get('isNovelas') == "true"){
            this.isNovela = true;
          }
        }
      }
    );

    try {
      window.screen.orientation.unlock();
    } catch {}

    setTimeout(() => {
      if (this.id == 8021 || this.id == 8022 || this.id == 8053) {
        this.router.navigate(['/series/10027/curso']);
      }else if (this.isNovela == true){
        this.router.navigate(['/series/10058/novelas']);
      } else if (this.isMarathon == true) {
        this.router.navigate(['/details', this.id, this.type]);
      } else {
        this.location.back();
      }
      try {
        window.screen.orientation.lock('portrait');
      } catch {}
    }, 100);
  }

  public return() {
    clearInterval(this.intervalSaveProgress);
    clearInterval(this.subscribeCurrentTime);
  }

  public handleRewind(): void {
    if (this.isPlayOnChromecast) {
      this.chromecastService.seek(this.currentTimeCast - 10);
      return;
    }

    if (this.isLive) {
      if (this.kaltura.currentTime - 10 > this.now - 14400) {
        this.kaltura.currentTime =
          this.kaltura.currentTime - 10 < 0 ? 0 : this.kaltura.currentTime - 10;
      }
    } else {
      this.kaltura.currentTime =
        this.kaltura.currentTime - 10 < 0 ? 0 : this.kaltura.currentTime - 10;
    }
  }

  get onTimeLive(): boolean {
    try {
      return this.liveTime - this.kaltura.currentTime < 5;
    } catch {
      return false;
    }
  }

  getPoster() {
    return this.kaltura?.sources?.poster;
  }

  public handleForward(): void {
    if (this.isPlayOnChromecast) {
      this.chromecastService.seek(this.currentTimeCast + 10);
      return;
    }

    this.kaltura.currentTime =
      this.kaltura.currentTime + 10 >= this.kaltura.duration
        ? (this.kaltura.currentTime = this.kaltura.duration)
        : (this.kaltura.currentTime = this.kaltura.currentTime + 10);
  }

  public handlePlay(): void {
    if (!this.isPlayOnChromecast) {
      this.kaltura.paused ? this.kaltura.play() : this.kaltura.pause();

      if (this.isPlaying) this.kaltura.play();
      else this.kaltura.pause();
    } else {
      this.chromecastService.playOrPause();
    }
  }

  public liveTime = 0;
  public startCurrentTimeCheck(): void {
    try {
      this.updateTracks();
    } catch {}

    let dif = 0;
    if (!this.isPlayOnChromecast)
      dif = this.kaltura.duration - this.kaltura.currentTime;
    else if (this.isPlayOnChromecast)
      dif = this.kaltura.duration - this.currentTimeCast;

    if (!this.preRollActive && dif <= 10 && this.nextEpisodeAvailable)
      this.showNextEpisode = true;

    this.tempoAtual = this.convertHMS(this.kaltura.currentTime);
    this.fullTime = this.convertHMS(this.kaltura.duration);
    if (this.isLive && this.kaltura.currentTime > 0) {
      if (this.liveTime == 0) this.liveTime = this.kaltura.currentTime;
      this.liveTime += 1;
    }

    if (this.showNextEpisode && dif <= 1 && this.type === 'serie') {
      this.marathon();
      return;
    } else if (
      (this.type === 'filme' ||
        (this.type === 'serie' && !this.nextEpisodeAvailable)) &&
      dif <= 1 &&
      !this.preRollActive
    ) {
      this.returnPrevious();
      return;
    }

    setTimeout(() => {
      this.startCurrentTimeCheck();
    }, 1000);
  }

  public convertHMS(value: any) {
    const sec = parseInt(value, 10); // convert value to number if it's string
    let hours: any = Math.floor(sec / 3600); // get hours
    let minutes: any = Math.floor((sec - hours * 3600) / 60); // get minutes
    let seconds: any = sec - hours * 3600 - minutes * 60; //  get seconds
    // add 0 if value < 10; Example: 2 => 02
    if (hours < 10) {
      hours = '0' + hours;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    return hours + ':' + minutes + ':' + seconds; // Return is HH : MM : SS
  }

  public sendProgress(): void {
    let dif = 0;
    dif = this.kaltura?.duration - this.kaltura?.currentTime;
    if (this.kaltura?.currentTime)
      this.progressService
        .sendProgress(
          this.idPerfil,
          this.details.id_kaltura,
          dif <= 15 ? 0 : this.kaltura.currentTime
        )
        .subscribe();

    if (this.isWatching)
      this.sendProgressTimeout = setTimeout(() => {
        this.sendProgress();
      }, 10000);
  }

  public checkConnection(): void {
    this.checkConnectionService.checkConnection();

    this.checkConnectionTimeout = setTimeout(() => {
      if (this.isWatching) this.checkConnection();
    }, 10000);
  }

  public marathon() {
    this.isMarathon = true;
    this.nextEpisodeService.playEpisode(this.isPlayOnChromecast);
  }

  public get volume(): number {
    return this.kaltura.volume;
  }
  public set volume(v: number) {
    this.kaltura.volume = v;
    if (this.isPlayOnChromecast) this.chromecastService.setVolume(v);
  }

  public playerToggleFullscreen(): void {
    this.watchService.fullScreen();
  }

  private filterLanguages(arr: any[], searchKey: string) {
    return arr.findIndex((obj) => obj.language === searchKey);
  }
}

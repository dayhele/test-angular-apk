import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild
} from '@angular/core';

import { Clock } from '../helpers/clock';
import { Slider } from '../helpers/slider';
import { Units } from '../helpers/units';
import { Validate } from '../helpers/validate';
import {
  CardsForhome,
  SectionCardListData,
  SectionControlData
} from '../shared/interfaces/card-home';
import { SectionService } from '../shared/services/section.service';
import { Channels } from '../shared/interfaces/channels';
import { CurrentDay } from '../shared/interfaces/current-day';
import { LiveChannel } from '../shared/interfaces/live-channel';
import { DetailedProgram } from '../shared/interfaces/program-details';
import { CheckDeviceService } from '../shared/services/check-device.service';
import { NowService } from '../shared/services/now.service';
import { ProfileService } from '../shared/services/profile.service';
import { TimerService } from '../shared/services/timer.service';
import { WatchService } from '../watch/shared/watch.service';
import { CardDefault } from '../shared/interfaces/card-default';
import { HomeService } from '../shared/services/home.service';
import { MainStructure } from '../shared/interfaces/main-structure';
import { Cdnlist } from '../shared/interfaces/cdnlist';
import { CardProperties } from '../shared/interfaces/card-default';
import { Theme } from 'src/assets/theme/theme';

@Component({
  selector: 'app-now',
  templateUrl: './now.component.html',
  styleUrls: ['./now.component.scss'],
  providers: [TimerService]
})
export class NowComponent implements OnInit {
  public timer: Date;
  public currentDay: CurrentDay;
  public nextDay: CurrentDay;
  public startDate: string;
  public endDate: string;
  public nextStartDate: string;
  public nextEndDate: string;
  public genreId: number = 20;
  public channelList: Channels;
  public isLoading: boolean;
  public currentScheduleIndex: number;
  public horizontalTimelineCurrentSlideX: number;
  public isLoadingRequest: boolean;
  public pageNumber: number;
  public notEmptyChannelPost: boolean;
  public notScrolly: boolean;
  public showSpinner: boolean;
  public isNextDay: boolean;
  public liveProgramList: DetailedProgram[];
  public channels: LiveChannel[];
  public homeControl: CardDefault[] = [];
  public homeControlData: SectionControlData[] = [];
  public epgSectionList?: HTMLCollectionOf<Element>;
  public profileAgeBracket: string | number;
  public isMobile: boolean;
  public channelsFiltered: any[];
  public idPerfil: number = 0;
  public main: MainStructure = {};
  public cdnList: Cdnlist = {};
  public cardProperties: CardProperties;
  public isAmericaNet: boolean = false;
  public americanet: boolean = false;
  public channelsCategories: any[] = [];
  public selectedCategoryId: number = 0;
  public selectedCategoryName: string = 'Todos os canais';

  @ViewChild('timeline')
  public verticalTimeline?: ElementRef<HTMLDivElement>;

  @ViewChild('schedules')
  public horizontalTimeline?: ElementRef<HTMLDivElement>;

  @ViewChild('channelsFilter')
  public channelsFilter?: ElementRef<HTMLDivElement>;

  @HostListener('window: resize', ['$event'])
  public onResize(): void {
    this.goToNow();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowLeft': {
        this.goBack();
        break;
      }
      case 'ArrowRight': {
        this.goNext();
        break;
      }
    }
  }

  constructor(
    private timerService: TimerService,
    private sectionService: SectionService,
    private nowService: NowService,
    private watchService: WatchService,
    private profileService: ProfileService,
    private homeService: HomeService,
    public theme: Theme,
    private checkDeviceService: CheckDeviceService
  ) {
    this.timer = new Date();
    this.currentDay = {};
    this.nextDay = {};
    this.startDate = '';
    this.endDate = '';
    this.nextStartDate = '';
    this.channels = [];
    this.liveProgramList = [];
    this.nextEndDate = '';
    this.channelList = {};
    this.isLoading = true;
    this.currentScheduleIndex = 0;
    this.horizontalTimelineCurrentSlideX = 0;
    this.isLoadingRequest = false;
    this.pageNumber = 0;
    this.isNextDay = false;
    this.notEmptyChannelPost = true;
    this.notScrolly = true;
    this.showSpinner = false;
    this.profileAgeBracket = 0;
    this.isMobile = false;
    this.channelsFiltered = [];
    this.americanet = this.theme.header.americanet;
    this.cardProperties = {
      orientation: 'vertical',
      channelLogo: false,
      hasWatchLogo: false,
      smallCard: false,
      movieLogo: false,
      indicativeAge: false,
      movieTitle: false,
      hasProgressBar: false,
      sportTitle: false,
      isLive: false,
      secondDescription: false,
      day: false,
      rentable: false,
      rentMovieTitle: false
    };
  }

  ngOnInit(): void {
    this.idPerfil = parseInt(this.profileService.selectedProfile);
    this.startTimer();
    this.onInitEPG();
    this.setAgeBracket();
    this.getAllChannels();
    this.getHomeStructure();
    this.getChannelsCategories();

    this.homeService
      .getMainList(this.idPerfil)
      .subscribe((data: MainStructure) => {
        this.isAmericaNet = data.isAmericanet!;
      });

    this.getData();
    this.isMobile = this.checkDeviceService.isMobile();
    this.epgSectionList = document.getElementsByClassName(
      'section--content--programs'
    );
  }

  public getChannelsCategories(): void {
    this.nowService.getChannelsCategories().subscribe((res) => {
      this.channelsCategories = res;
      this.channelsCategories.unshift({
        name: 'Todos os canais',
        genre_id: '0'
      });
    });
  }

  public filterChannelsByCategory(
    category: number,
    categoryName: string
  ): void {
    this.showSpinner = true;
    this.selectedCategoryId = category;
    this.selectedCategoryName = categoryName;
    this.channelsFiltered = [];
    this.pageNumber = 0;
    this.channelsFilter!.nativeElement.classList.remove('active');
    this.getScheduleResponse();
  }

  public getData(): void {
    this.sectionService
      .getSectionList(this.idPerfil, 4, false)
      .subscribe((data: CardsForhome) => {});
  }

  public startTimer(): void {
    this.timerService.handleTimer().subscribe((timer) => {
      this.timer = timer;
    });
  }

  public onInitEPG(): void {
    this.getCurrentDay();
  }

  public getCurrentDay(): void {
    this.showSpinner = true;
    this.timerService.handleDaytimes().subscribe((day) => {
      this.currentDay = day;

      this.handleRangeDateRequest(this.currentDay);
      this.getNextDay();
    });
  }

  public getNextDay(): void {
    this.timerService.handleNextDay().subscribe((day) => {
      this.nextDay = day;

      this.handleRangeDateRequest(this.nextDay, true);

      this.getScheduleResponse();
      this.getAllChannels();
    });
  }

  public handleRangeDateRequest(day: CurrentDay, isNextDay?: boolean): void {
    if (day.schedules) {
      if (!isNextDay) {
        this.startDate = this.formatDate(day, 0);
        this.endDate = this.formatDate(day, day.schedules.length - 1);
      } else {
        this.nextStartDate = this.formatDate(day, 0);
        this.nextEndDate = this.formatDate(day, day.schedules.length - 1);
      }
    }
  }

  public buildUrlImage(
    cdnId: number | undefined,
    imageName: string | undefined
  ): string {
    const url: Cdnlist | undefined = this.main?.cdnlist?.find(
      (cdn: any) => cdnId === cdn.id
    );

    switch (cdnId) {
      case 1:
        return url!.value!.replace('{image}/ks/{ks}', imageName!);

      default:
        return url!.value!.replace('{image}', imageName!);
    }
  }

  public getHomeStructure(): void {
    this.sectionService
      .getSectionItensList(this.idPerfil, 10431, 4, 1, 12)
      .subscribe((data: SectionCardListData) => {
        //this.homeControl = data.lists!;
      });
  }

  public filteredList: any[] = [];

  public getScheduleResponse(): void {
    if (
      Validate.nonEmptyString(this.startDate) &&
      Validate.nonEmptyString(this.nextEndDate)
    ) {
      this.isLoadingRequest = true;
      this.nowService
        .getSchedule(
          '',
          this.startDate,
          this.nextEndDate,
          this.pageNumber,
          8,
          this.selectedCategoryId
        )
        .subscribe((channels) => {
          if (
            channels.channels?.length == 1 ||
            channels.channels?.length == 0
          ) {
            this.channelsFiltered = this.channelsFiltered.concat(
              this.filteredList
            );

            this.channelsFiltered = this.removeDuplicatedChannels(
              this.channelsFiltered
            );
            this.onInitHorizontalTimeline(this.currentDay);

            this.isLoadingRequest = false;
            return;
          }
          let _channelsFiltered = this.channels
            ?.filter((_item) => {
              _item = channels.channels?.find(
                (_ch: any) => _ch.id == _item.id
              )!;
              return _item;
            })
            .map((_item) => {
              _item.dates = channels.channels?.find(
                (_ch: any) => _ch.id == _item.id
              )!.dates;
              return _item;
            });
          if (_channelsFiltered.length == 0) {
            this.pageNumber++;
            this.getScheduleResponse();
            return;
          }

          if (_channelsFiltered) {
            this.isLoading = false;
            this.isLoadingRequest = false;
            _channelsFiltered = this.filterChannels(_channelsFiltered);
            this.filteredList = this.filteredList.concat(_channelsFiltered);

            if (this.filteredList.length < 4) {
              this.pageNumber++;
              this.getScheduleResponse();
              return;
            }

            this.channelsFiltered = this.channelsFiltered.concat(
              this.filteredList
            );

            this.channelsFiltered = this.removeDuplicatedChannels(
              this.channelsFiltered
            );
            this.onInitHorizontalTimeline(this.currentDay);

            this.channelsFiltered.sort((a, b) => {
              let firstChannelName = a.title.toLowerCase(), secondChannelName = b.title.toLowerCase();

              return firstChannelName == secondChannelName ? 0 : firstChannelName > secondChannelName ? 1 : -1;
            });

          }
        });
    }
  }

  public removeNullChannels(channels: LiveChannel[]): LiveChannel[] {
    return channels.filter((channel) => {
      return channel.channel_number !== null;
    });
  }

  public onScrollDown(): void {
    this.pageNumber++;
    this.getScheduleResponse();
  }

  public removeDuplicatedChannels(channels: LiveChannel[]): LiveChannel[] {
    let _channels = channels.filter(
      (value, index, self) =>
        index ===
        self.findIndex((t) => t.channel_number === value.channel_number)
    );

    return _channels;
  }

  public filterChannels(channels: LiveChannel[]): LiveChannel[] {
    channels = this.removeNullChannels(channels);
    channels = this.removeDuplicatedChannels(channels);

    return channels;
  }

  public getAllChannels(): void {
    this.nowService.getChannels().subscribe((channels) => {
      this.updateChannelList(channels);
    });
  }

  public updateChannelList(channels: SectionCardListData): void {
    if (channels && channels.list)
      for (let i = 0; i < channels.list?.length; i++) {
        this.channels.push(channels.list[i]);
      }
    this.channels = this.removeDuplicatedChannels(this.channels);
  }

  public onInitHorizontalTimeline(day: CurrentDay): void {
    this.filteredList = [];
    if (day.schedules) {
      for (let index = 0; index < day.schedules.length; index++) {
        if (day.schedules[index].getHours() === this.timer.getHours()) {
          if (day.schedules[index].getMinutes() <= this.timer.getMinutes()) {
            this.currentScheduleIndex = index;
            if (this.horizontalTimeline) {
              this.goToNow();
              this.showSpinner = false;
            }
          }
        }
      }
    }
  }

  public handleMonth(month: string): string {
    return Clock.getMonthNameByNumber(month);
  }

  public toggleDay(value: 'next' | 'current') {
    this.isNextDay = value == 'next' ? true : false;
    if (this.isNextDay) {
      this.goToStart();
    } else {
      this.goToNow();
    }
  }

  public goToNow() {
    this.goTo(this.currentScheduleIndex);
  }

  public goToStart() {
    this.goTo(0);
  }

  public goTo(index: number): void {
    if (this.epgSectionList && this.horizontalTimeline) {
      const translate = (Units.totalPixelOfOneHour / 2) * index * -1;
      Slider.slideTo(this.horizontalTimeline, translate);
      this.updateEPGTranslate(translate);
      this.horizontalTimelineCurrentSlideX = translate;
    }
  }

  public moveAll(translateX: number): void {
    if (this.epgSectionList && this.horizontalTimeline) {
      Slider.slideTo(this.horizontalTimeline, translateX);

      this.updateEPGTranslate(translateX);

      this.horizontalTimelineCurrentSlideX = translateX;
    }
  }

  public goNext(): void {
    if (this.epgSectionList && this.horizontalTimeline) {
      const slideX = 100;
      const maxSlideX =
        (this.horizontalTimeline.nativeElement.scrollWidth -
          this.horizontalTimeline.nativeElement.clientWidth) *
        -1;

      if (this.horizontalTimelineCurrentSlideX - slideX >= maxSlideX) {
        const translate = (this.horizontalTimelineCurrentSlideX -= slideX);
        Slider.slideTo(this.horizontalTimeline, translate);

        this.updateEPGTranslate(translate);
      }
    }
  }

  public goBack(): void {
    if (this.epgSectionList && this.horizontalTimeline) {
      const slideX = 100;
      const maxSlideX = 0;

      if (this.horizontalTimelineCurrentSlideX + slideX <= maxSlideX) {
        const translate = (this.horizontalTimelineCurrentSlideX += slideX);
        Slider.slideTo(this.horizontalTimeline, translate);

        this.updateEPGTranslate(translate);
      }
    }
  }

  public updateEPGTranslate(translate: number): void {
    if (this.epgSectionList) {
      for (let i = 0; i < this.epgSectionList.length; i++) {
        Slider.slideTo(this.epgSectionList[i], translate);
      }
    }
  }

  public formatDate(day: CurrentDay, index: number): string {
    if (day.schedules) {
      const formattedDate =
        day.date +
        ' ' +
        day.schedules[index]
          .getHours()
          .toLocaleString('pt-BR', { minimumIntegerDigits: 2 }) +
        ':' +
        day.schedules[index]
          .getMinutes()
          .toLocaleString('pt-BR', { minimumIntegerDigits: 2 });

      return formattedDate;
    }
    return '';
  }

  public getLivePrograms(program: [DetailedProgram, string]): void {
    if (program[1] === 'add') {
      let _program = this.liveProgramList.find(
        (_item) => _item.id === program[0].id
      );
      if (!_program) this.liveProgramList.push(program[0]);
    } else {
      this.handleRemoveProgram(program[0]);
    }
  }

  public handleRemoveProgram(program: DetailedProgram): void {
    for (let index = 0; index < this.liveProgramList.length; index++) {
      if (this.liveProgramList[index].id === program.id) {
        this.liveProgramList.splice(index, 1);
        break;
      }
    }
  }

  public openChannels(): void {
    if (this.channelsFilter) {
      this.channelsFilter.nativeElement.classList.toggle('active');
    }
  }

  public goWatch(channelId?: number): void {
    if (channelId) this.watchService.watch(channelId, 'filme', true);
  }

  public setAgeBracket(): void {
    this.profileService.profilesObservable.subscribe((profiles) => {
      let selectedProfile = profiles.success?.data!.find((profile) => {
        return (
          profile.id_perfis == parseInt(this.profileService.selectedProfile)
        );
      });
      if(selectedProfile != undefined)
        this.profileAgeBracket = selectedProfile!.age_bracket || 18;
    });
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { idMostWatchedChannels } from 'src/environments/environment';
import { CardListData, SectionCardListData } from '../interfaces/card-home';
import { Channel } from '../interfaces/channel';
import { Channels } from '../interfaces/channels';
import { ScheduleProgram } from '../interfaces/schedule-program';
import { Http } from './http.service';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class NowService {
  private readonly programEndpoint = 'watch/api/gracenote/listprograms';
  private readonly schedulesEndpoint = 'watch/api/gracenote/listschedules';
  private readonly channelsCategoryEndpoint = 'watch/api/epg/listepgcategories';
  private readonly channelsEndpoint = 'v3/list';

  constructor(private http: Http, private profileService: ProfileService) {}

  public getSchedule(
    channels: string,
    iDate: string,
    fDate: string,
    page = 0,
    size = 8,
    genre_id: number
  ): Observable<Channels> {
    let _data: any = {
      channel_list: channels,
      start_date: iDate,
      end_date: fDate,
      id_perfil: parseInt(this.profileService.selectedProfile),
      page: page,
      size: size
    };
    if (genre_id) _data.genre_id = genre_id;
    return this.http.post(this.schedulesEndpoint, _data);
  }

  public getProgram(programId: string): Observable<ScheduleProgram> {
    return this.http.post(this.programEndpoint, {
      program: programId,
      id_perfil: this.profileService.selectedProfile
    });
  }

  public getChannels(): Observable<SectionCardListData> {
    return this.http.post(this.channelsEndpoint, {
      caller: 'TV',
      id: 60,
      id_perfil: this.profileService.selectedProfile,
      page: 1,
      size: 1000
    });
  }

  public getChannelsCategories(): Observable<any> {
    return this.http.post(this.channelsCategoryEndpoint, {});
  }

  public getScheduleForHome(
    channels: string,
    iDate: string,
    fDate: string,
    page = 1,
    size = 99
  ): Observable<Channels> {
    return this.http.post(this.schedulesEndpoint, {
      channel_list: channels,
      start_date: iDate,
      end_date: fDate,
      id_perfil: parseInt(this.profileService.selectedProfile),
      page: page,
      size: size
    });
  }
  public getMostWatched(): Observable<any> {
    let payload: any = {
      id_perfil: parseInt(this.profileService.selectedProfile),
      id: idMostWatchedChannels,
      page: 1,
      size: 12,
      variance: 2
    };
    return this.http.post(this.channelsEndpoint, payload);
  }
}

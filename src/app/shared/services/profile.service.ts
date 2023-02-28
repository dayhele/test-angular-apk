import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ProfileStructureResponse } from '../interfaces/profile-structure-response';
import { Http } from './http.service';
import { AccountData } from '../interfaces/account';
import { Profile } from '../interfaces/profile';
import { LoginService } from './login.service';
import { checkConnection } from '../interfaces/check-connection';
import { chooseProfile } from '../interfaces/choose-profile';
import { SubscribesResponse } from '../interfaces/subscribes';
import { ProfileStructure } from '../interfaces/profile-structure';
import { CheckConnectionService } from './check-connection.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private readonly endpoint: string = 'v3/profile';
  private storageProfile: Subject<string>;

  public storageProfileObservable: Observable<string>;

  public profileList = new BehaviorSubject<ProfileStructureResponse>({});
  public profilesObservable: Observable<ProfileStructureResponse> =
    new Observable<ProfileStructureResponse>();

  public profileSelected: Profile = {};

  public oldProfileId: string = '';

  constructor(
    private http: Http,
    private router: Router,
    private loginService: LoginService,
    private checkConnectionService: CheckConnectionService
  ) {
    this.storageProfile = new Subject<string>();
    this.storageProfileObservable = new Observable<string>();
    this.onInitServices();
  }

  public onInitServices(): void {
    this.storageProfileObservable = this.storageProfile.asObservable();
    this.profilesObservable = this.profileList.asObservable();
  }

  public getUserProfileList(): Observable<ProfileStructureResponse> {
    return this.http.get(`${this.endpoint}`);
  }

  public loadProfile(): boolean {
    const storage = localStorage.getItem('id_perfil');
    if (storage) {
      this.storageProfile.next('loaded');
      return true;
    }
    return false;
  }

  public logoutProfile(): void {
    localStorage.removeItem('id_perfil');
    this.storageProfile.next('removed');
  }

  public setProfileList(profiles: ProfileStructureResponse) {
    profiles.success?.data!.forEach((element) => {
      if (element.foto)
        element.foto = profiles.success?.cdnperfil + element.foto!;
    });
    this.profileList.next(profiles);
  }

  public selectProfile(profileId: number | undefined) {
    this.oldProfileId = localStorage.getItem('id_perfil') || '';
    if (this.oldProfileId) this.disconnectProfile(this.oldProfileId);

    if (profileId) {
      localStorage.setItem('id_perfil', profileId.toString());
      this.storageProfile.next('selected');
      this.router.navigateByUrl('/home');
    }
  }

  public get selectedProfile(): string {
    return localStorage.getItem('id_perfil')!;
  }

  public disconnectProfile(oldProfileId: string): void {
    this.checkConnectionService
      .disconnectMyProfile(parseInt(oldProfileId))
      .subscribe((data) => {});
  }

  public uploadProfileImage(): void {}

  public getAccountData(): Observable<AccountData> {
    return this.http.getExternal(
      'https://run.mocky.io/v3/69106259-fb6d-4c05-9d66-8e4d83d08346'
    );
  }

  public saveProfile(profile: Profile): Observable<any> {
    profile.kids = profile.age_bracket === '0' || profile.age_bracket === '10';

    if (profile.foto !== '') {
      return this.http.put(this.endpoint, profile);
    }
    return this.http.put(this.endpoint, {
      id_perfis: profile.id_perfis,
      age_bracket: profile.age_bracket,
      master: profile.master,
      nome: profile.nome,
      kids: profile.kids,
      audio_default: profile.audio_default,
      subtitle_default: profile.subtitle_default,
      live_content: profile.live_content
    });
  }

  public deleteProfile(id_perfil: number): Observable<any> {
    return this.http.delete(`${this.endpoint}/${id_perfil}`);
  }

  public saveUserId(userId: number): void {
    localStorage.setItem('user_id', userId.toString());
  }

  get userId(): string {
    return localStorage.getItem('user_id')!;
  }

  public createProfile(profile: Profile): Observable<any> {
    return this.http.post(this.endpoint, profile);
  }

  public sendActivationCode(code: string): Observable<{ valid: boolean }> {
    return this.http.post('v3/ativar/code', {
      code: code,
      id_perfil: this.selectedProfile
    });
  }

  public getSubscribes(): Observable<SubscribesResponse> {
    return this.http.getExternal(
      `https://run.mocky.io/v3/cc5a2adf-9b27-46e5-8d89-362913a9a293`
    );
  }

  public generateDeviceUuid(parts: number): string {
    let stringArr = [];
    for (let i = 0; i < parts; i++) {
      let S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      stringArr.push(S4);
    }
    return stringArr.join('-');
  }
}

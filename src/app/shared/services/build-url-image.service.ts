import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cdnlist } from '../interfaces/cdnlist';
import { MainStructure } from '../interfaces/main-structure';
import { Http } from './http.service';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class BuildUrlImageService {
  private profileId: number;
  private main: MainStructure;
  private ready: boolean;

  constructor(private http: Http, private profileService: ProfileService) {
    this.profileId = Number(this.profileService.selectedProfile);
    this.main = {};
    this.ready = false;

    this.init();
  }

  private init() {
    if (!this.ready) {
      this.getMainList(this.profileId).subscribe((data: MainStructure) => {
        this.main = data;

        this.ready = true;
      });
    }
  }

  public async buildUrlImage(
    cdnId: number | undefined,
    imageName: string | undefined
  ): Promise<string> {
    if (!this.ready) await this.init();

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

  public getMainList(idPerfil: number): Observable<MainStructure> {
    return this.http.post('v3/main', { id_perfil: idPerfil,client: environment.client,mobile: environment.app });
  }
}

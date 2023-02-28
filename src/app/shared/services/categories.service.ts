import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategorieResponse } from '../interfaces/categorie-response';
import { Http } from './http.service';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private http: Http, private profileService: ProfileService) {}

  public getCategorie(categorie: string): Observable<CategorieResponse> {
    const idPerfil = parseInt(this.profileService.selectedProfile);

    return this.http.post('v2/search', {
      id_perfil: idPerfil,
      keyword: categorie,
      page: 3,
      size: 15
    });
  }
}

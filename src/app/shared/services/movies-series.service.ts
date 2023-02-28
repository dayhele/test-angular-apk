import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Http } from './http.service';
import { ProfileService } from './profile.service';
import { Movie } from '../interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesSeriesService {
  private readonly endpoint = 'v3/title';

  constructor(private http: Http, private profileService: ProfileService) {}

  public getDetails(
    profileId: number,
    id: number,
    type: string
  ): Observable<Movie> {
    return this.http
      .post<any, Movie>('v3/title', {
        id_perfil: this.profileService.selectedProfile || 0,
        id: id,
        tipo: type
      })
      .pipe(
        map((movie: Movie) => {
          movie.type = type;
          return movie;
        })
      );
  }

  public getDetailsNovelas(
    profileId: number,
    id: number,
    page: number,
    size: number
  ): Observable<Movie> {
    return this.http
      .post<any, Movie>('/v3/episodes', {
        id_perfil: this.profileService.selectedProfile,
        id_serie: id,
        page: page,
        size: size
      })
      .pipe(
        map((movie: Movie) => {
          return movie;
        })
      );
  }

}

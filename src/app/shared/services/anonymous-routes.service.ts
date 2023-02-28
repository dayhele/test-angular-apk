import { Injectable } from '@angular/core';
import { Http } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AnonymousRoutesService {
  private _anonymousRoutes: string[];

  constructor(private http: Http) {
    this._anonymousRoutes = [];
  }

  public get() {
    return this._anonymousRoutes;
  }

  public load() {
    this.http
      .get<string[]>('/configuracoes/rotas-anonimas')
      .subscribe((anonymousRoutes) => {
        this._anonymousRoutes = anonymousRoutes;
      });
  }
}

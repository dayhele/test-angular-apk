import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WatchedreportDeleteResponse } from '../interfaces/watchedreport-delet-response';
import { Http } from './http.service';



@Injectable({
  providedIn: 'root'
})
export class HitoricService {
  url: string = '';

  constructor(private http: Http,) {
    this.url = 'https://hml.watch.tv.br/v3/watchedreport'
  }
  public historicListRequest(idPerfil: number) {
    return this.http.post('v3/watchedreport', { id_perfil: idPerfil })
  }
  public requestAllUserHistoric(){
    return this.http.post('v3/watchedreport', {})
  }
  public deleteAllHistoric(iDPerfil: number){
    return this.http.delete(`v3/watchedreport/${iDPerfil}/all`)
  }
  public deleteIndividualIten(iDPerfil:number, id: number) : Observable<WatchedreportDeleteResponse>{
   return this.http.delete(`v3/watchedreport/${iDPerfil}/${id}}`)
   
  }

}

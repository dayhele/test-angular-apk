import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { checkConnection } from '../interfaces/check-connection';
import { Http } from './http.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CheckConnectionService {
  private selectedProfile: string = '';

  public allowChange: boolean = true;
  public checkConnectionStatus: boolean = true;
  public connectionState: BehaviorSubject<number> = new BehaviorSubject<number>(
    0
  );

  constructor(private http: Http, private loginService: LoginService) {
    this.selectedProfile = localStorage.getItem('id_perfil')!;
  }

  public getConnectionState(): Observable<number> {
    this.checkConnection();
    return this.connectionState;
  }

  public checkConnection(): void {
    if (!this.selectedProfile)
      this.selectedProfile = localStorage.getItem('id_perfil')!;

    if (
      !this.selectedProfile ||
      !this.loginService.token ||
      !this.checkConnectionStatus
    )
      return;

    this.checkConnectionValue().subscribe((response) => {
      this.connectionState.next(
        response.success.conexao_valida === 0 ? (this.allowChange ? 1 : 2) : 0
      );

      this.allowChange = false;
    });
  }

  public connectMyProfile(): Observable<checkConnection> {
    return this.http.post('/profile/choose', {
      id_perfil: this.selectedProfile,
      token: localStorage.getItem('deviceUuid')
    });
  }

  private checkConnectionValue(): Observable<checkConnection> {
    return this.http.post('/profile/checkconnection', {
      id_perfil: this.selectedProfile,
      token: localStorage.getItem('deviceUuid')
    });
  }

  public disconnectMyProfile(id_perfil?: number): Observable<checkConnection> {
    return this.http.post('/profile/unconect', {
      id_perfil: id_perfil || this.selectedProfile,
      token: localStorage.getItem('deviceUuid')
    });
  }
}

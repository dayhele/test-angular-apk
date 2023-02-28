import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable, NgZone } from '@angular/core';

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class ChromecastService {
  private url: string = '';
  private session: any;

  constructor(private ngZone: NgZone) {}

  public playOrPause() {
    if (!this.chromeAvailable) {
      if (this.isPaused) window.Capacitor.Plugins.Chromecast.Play();
      else window.Capacitor.Plugins.Chromecast.Pause();
    } else {
      if (!this.isPaused)
        this.media.pause(window.chrome.cast.media.PlayRequest(), () => {});
      else this.media.play(window.chrome.cast.media.PlayRequest(), () => {});
    }

    this.isPaused = !this.isPaused;
  }

  isPaused = false;

  public openChromeCast(
    url: string,
    time: number,
    volume: number,
    title: string,
    poster: string
  ): void {
    this.url = url;
    this.launchApp(time, volume, title, poster);
  }

  public getCurrentTime(): Observable<number> {
    return new Observable<number>((observer) => {
      if (!this.chromeAvailable) {
        window.Capacitor.Plugins.Chromecast.getCurrentTime().then(
          (x: { time: number }) => {
            observer.next(x.time / 1000);
          }
        );
        return;
      }
      try {
        observer.next(this.session.media[0].getEstimatedTime());
      } catch {
        observer.next(0);
      }
    });
  }

  public setVolume(volume: number) {
    this.session.setReceiverVolumeLevel(volume);
  }

  private activeTrackIds: number[] = [];

  private tracks: any[] = [];

  setSubtitle(subtitle: string) {
    if (this.activeTrackIds.length == 0 && this.tracks.length > 0) {
      this.activeTrackIds = [
        this.tracks.find((t: any) => {
          return t.type == 'AUDIO' && t.language == 'pt';
        })?.trackId || 0
      ];
    }

    let _legendaAtual = this.tracks.find((t: any) => {
      return t.type == 'TEXT' && this.activeTrackIds.includes(t.trackId);
    });

    // limpa os numeros de legenda
    if (_legendaAtual)
      this.activeTrackIds = this.activeTrackIds.filter(
        (idLegenda: any) => idLegenda != _legendaAtual.trackId
      );

    let _legendaSelecionada;
    if (subtitle == 'por')
      _legendaSelecionada = this.tracks.find(
        (t: any) => t.language == 'pt' && t.type == 'TEXT'
      );

    if (subtitle == 'eng')
      _legendaSelecionada = this.tracks.find(
        (t: any) => t.language == 'en' && t.type == 'TEXT'
      );

    if (_legendaSelecionada)
      this.activeTrackIds.push(_legendaSelecionada.trackId);

    this.activeAudioAndSubtitles();
  }

  setAudio(audio: string) {
    if (this.activeTrackIds.length == 0) {
      this.activeTrackIds = [
        this.tracks.find((t: any) => {
          return t.type == 'AUDIO' && t.language == 'pt';
        })?.trackId || 0
      ];
    }

    let _audioAtual = this.tracks.find((t: any) => {
      return t.type == 'AUDIO' && this.activeTrackIds.includes(t.trackId);
    });

    if (!_audioAtual) return;

    // limpa os numeros de audio
    this.activeTrackIds = this.activeTrackIds.filter(
      (idAudio: any) => idAudio != _audioAtual.trackId
    );

    let _audioSelecionado;
    if (audio == 'por')
      _audioSelecionado = this.tracks.find(
        (t: any) => t.language == 'pt' && t.type == 'AUDIO'
      );

    if (audio == 'eng')
      _audioSelecionado = this.tracks.find(
        (t: any) => t.language == 'en' && t.type == 'AUDIO'
      );

    if (_audioSelecionado) this.activeTrackIds.push(_audioSelecionado.trackId);

    this.activeAudioAndSubtitles();
  }

  private activeAudioAndSubtitles() {
    if (!this.chromeAvailable) {
      window.Capacitor.Plugins.Chromecast.mediaEditTracksInfo({
        activeTrackIds: this.activeTrackIds
      });
      return;
    }

    let tracksInfoRequest = new window.chrome.cast.media.EditTracksInfoRequest(
      this.activeTrackIds
    );
    this.media.editTracksInfo(
      tracksInfoRequest,
      () => {},
      () => {}
    );
  }

  public seek(time: number) {
    if (!this.chromeAvailable) {
      window.Capacitor.Plugins.Chromecast.seek({ time: Math.ceil(time) });
      return;
    }

    let request = new window.chrome.cast.media.SeekRequest();
    request.currentTime = time;
    this.media.seek(request, () => {});
  }

  private chromeAvailable = true;

  public inicializeChromecast(): Observable<
    'AVAILABLE' | 'UNAVAILABLE' | 'CONNECTED'
  > {
    if (this.session)
      return new Observable<'AVAILABLE' | 'UNAVAILABLE' | 'CONNECTED'>(
        (observer) => observer.next('CONNECTED')
      );

    return new Observable<'AVAILABLE' | 'UNAVAILABLE' | 'CONNECTED'>(
      (observer) => {
        if (!window.chrome?.cast) {
          this.chromeAvailable = false;

          window.Capacitor.Plugins.Chromecast.initialize().then((x: any) => {
            this.chromeCastDevicesAvailable.next(true);

            if (x.status == 'CONNECTED' || x.status == 4)
              observer.next('CONNECTED');
            else observer.next('AVAILABLE');
          });

          return;
        } else {
          let applicationID =
            window.chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID;
          let sessionRequest = new window.chrome.cast.SessionRequest(
            applicationID
          );
          let apiConfig = new window.chrome.cast.ApiConfig(
            sessionRequest,
            (e: any) => {
              let session = e;
              if (session.media.length != 0) {
                observer.next('CONNECTED');
                this.media = session.media[0];
                this.session = session;
                this.tracks = this.session.media[0].media.tracks;
              }
            },
            (e: any) => {
              if (e === 'available') {
                setTimeout(() => {
                  this.ngZone.run(() => {
                    this.chromeCastDevicesAvailable.next(true);
                  });
                }, 1000);
              }
            }
          );
          window.chrome.cast.initialize(
            apiConfig,
            () => this.onInitSuccess(),
            () => this.onInitError()
          );
        }
      }
    );
  }

  chromeCastDevicesAvailable: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  private onInitSuccess() {}

  private onInitError() {}

  private launchApp(
    time: number,
    volume: number,
    title: string,
    poster: string
  ) {
    if (!this.chromeAvailable) {
      window.Capacitor.Plugins.Chromecast.requestSession().then((x: any) => {
        setTimeout(() => {
          window.Capacitor.Plugins.Chromecast.loadMedia({
            contentId: this.url,
            autoPlay: true,
            currentTime: time,
            title: title,
            poster: poster
          }).then((media: any) => {
            this.media = media;
            this.tracks = media.media.tracks;

            this.setSubtitle('off');
            this.setAudio('por');
          });

          setTimeout(() => {
            this.seek(time);
          }, 1000);
        }, 5000);
      });
    } else if (!this.media && !this.session) {
      window.chrome.cast.requestSession(
        (e: any) =>
          this.onRequestSessionSuccess(e, time, volume, title, poster),
        (e: any) => this.onLaunchError(e)
      );
    } else {
      this.changeMedia(this.url, time, volume, title, poster);
    }
  }

  private onLaunchError(e: any) {}

  private onRequestSessionSuccess(
    e: any,
    time: number,
    volume: number,
    title: string,
    poster: string
  ) {
    this.session = e;
    if (this.session.media[0]) this.tracks = this.session.media[0].media.tracks;
    if (!this.session) return;

    this.changeMedia(this.url, time, volume, title, poster);
  }

  changeMedia(
    url: string,
    time: number,
    volume: number,
    title: string,
    poster: string
  ) {
    if (!this.chromeAvailable) {
      this.url = url;
      window.Capacitor.Plugins.Chromecast.loadMedia({
        contentId: this.url,
        autoPlay: true,
        currentTime: time,
        title: title,
        poster: poster
      });

      this.seek(time);
      return;
    }
    try {
      let mediaInfo = new window.chrome.cast.media.MediaInfo(url);
      mediaInfo.contentType = 'video/mp4';

      let request = new window.chrome.cast.media.LoadRequest(mediaInfo);
      request.autoplay = true;

      this.session.loadMedia(
        request,
        (e: any) => this.onLoadSuccess(e, time, volume, title, poster),
        () => this.onLoadError()
      );
    } catch (e) {}
  }
  private media: any;

  private onLoadSuccess(
    e: any,
    time: number,
    volume: number,
    title: string,
    poster: string
  ) {
    this.media = new window.chrome.cast.media.Media(
      e.sessionId,
      e.mediaSessionId
    );

    this.seek(time);
    this.setVolume(volume);
    this.setSubtitle('off');
    this.setAudio('por');
  }

  private onLoadError() {
    console.log('Failed to load video.');
  }

  public stop() {
    if (!this.chromeAvailable) {
      window.Capacitor.Plugins.Chromecast.sessionStop();
    } else {
      this.session.stop(
        () => this.onStopAppSuccess(),
        () => this.onStopAppError()
      );
    }
  }

  private onStopAppSuccess() {
    delete this.session;
    delete this.media;
    console.log('Successfully stopped app.');
  }

  private onStopAppError() {
    console.log('Error stopping app.');
  }
}

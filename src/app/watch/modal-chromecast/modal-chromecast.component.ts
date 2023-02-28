import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal-chromecast',
  templateUrl: './modal-chromecast.component.html',
  styleUrls: ['./modal-chromecast.component.scss']
})
export class ModalChromecastComponent {
  constructor() {}
  @Output() reproduzirChromecast = new EventEmitter();
  @Output() reproduzirDispositivo = new EventEmitter();

  reproduzir(reproduzirDispositivo: boolean) {
    reproduzirDispositivo
      ? this.reproduzirChromecast.emit()
      : this.reproduzirDispositivo.emit();
  }
}

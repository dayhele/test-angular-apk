import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Profile } from '../../interfaces/profile';
import { Theme } from 'src/assets/theme/theme';
import { CheckDeviceService } from '../../services/check-device.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-pin',
  templateUrl: './modal-pin.component.html',
  styleUrls: ['./modal-pin.component.scss']
})
export class ModalPinComponent {
  public environment: any;
  //O input 'profile' deve receber o perfil a ser exibido na tela de PIN
  @Input() public profile: Profile = {};

  //O input 'responsePin' deve receber o valor 'true' quando o PIN inserido estiver correto
  @Input() public responsePin?: boolean;

  //O input 'wrongEmail' deve receber o valor 'true' quando o email inserido estiver incorreto
  @Input() public responseEmail?: boolean;

  //O output 'closeAction' emite um evento quando o botão 'close' é acionado
  @Output() closeAction: EventEmitter<any> = new EventEmitter();

  //O output 'getPinInputed' emite um evento quando o PIN é inserido por completo
  @Output() getPinInputed: EventEmitter<string> = new EventEmitter();

  //O output 'getEmailInputed' emite um evento quando o botão 'enviar', dentro do fluxo de 'esqueci a senha'
  @Output() getEmailInputed: EventEmitter<string> = new EventEmitter();

  public inputResetEmail: string = '';
  public showRecoveryModal: boolean = false;

  constructor(public theme: Theme, public checkDevice: CheckDeviceService) {
    this.environment = environment;    
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-play-button',
  templateUrl: './play-button.component.html',
  styleUrls: ['./play-button.component.scss']
})
export class PlayButtonComponent {
  @Input() public isKeepWatching: boolean = false;
  @Input() public resumido: boolean = false;
  @Input() public text: string = "Assistir";
  @Output() public clickEvent = new EventEmitter();

  public environment: any;
  public icon: string;

  constructor(public loginService: LoginService) {
    this.icon = `${environment.imageService}/icons/button/play-icon.svg`;
  }

  public click(): void {
    this.clickEvent.emit();
  }
}

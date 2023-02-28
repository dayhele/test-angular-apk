import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-card-watch-button',
  templateUrl: './card-watch-button.component.html',
  styleUrls: ['./card-watch-button.component.scss']
})
export class CardWatchButtonComponent implements OnInit {
  @Input() public toRent: boolean;
  @Output() public clickEvent = new EventEmitter();

  public environment: any;
  public icon: string;
  public text: string;

  constructor(public loginService: LoginService) {
    this.toRent = false;
    this.icon = `${environment.imageService}/icons/button/play-icon.svg`;
    this.text = 'Assistir';
  }

  ngOnInit(): void {
    if (this.toRent) this.text = 'Alugar';
  }

  public click(): void {
    this.clickEvent.emit();
  }
}

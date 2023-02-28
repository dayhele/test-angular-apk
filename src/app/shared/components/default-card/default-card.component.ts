import { Router } from '@angular/router';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CardProperties } from '../../interfaces/card-default';
import { CardListData } from '../../interfaces/card-home';

@Component({
  selector: 'app-default-card',
  templateUrl: './default-card.component.html',
  styleUrls: ['./default-card.component.scss']
})
export class DefaultCardComponent implements OnInit {
  @Input() public cardProperties?: CardProperties;
  @Input() public hbo?: boolean = false;
  @Input() public directvgo?: boolean = false;
  @Input() public cardImage?: string;
  @Input() public data?: CardListData;
  @Input() public onlyView: boolean = false;
  @Input() public small: boolean = false;
  @Input() public disableClick: boolean = false;
  @Output() public typeEmitter: EventEmitter<string> =
    new EventEmitter<string>();
  public screen_x: number;
  public environment: any;
  get isExpired(): boolean {
    return new Date(this.data?.expire!).getTime() < new Date().getTime();
  }

  @HostListener('window: resize', ['$event'])
  public onResize() {
    this.screen_x = window.innerWidth;
  }
  constructor(private router: Router) {
    this.cardProperties = {};
    this.cardImage = '';
    this.data = {};
    this.screen_x = 0;
    this.environment = environment;
  }

  ngOnInit(): void {
    if (window) {
      this.screen_x = window.innerWidth;
    }
  }

  cardClick() {
    if (this.disableClick) return;

    if (this.hbo) {
      this.typeEmitter.emit('hbomax');
    } else if (this.directvgo) {
      this.typeEmitter.emit('directvgo');
    } else if (this.data?.title === 'stingray') {
      //Stingray Action
    } else {
      if (this.onlyView || (!this.data?.id && !this.data?.tipo)) return;
      this.router.navigateByUrl(
        '/details/' + this.data?.id + '/' + this.data?.tipo
      );
    }
  }
}

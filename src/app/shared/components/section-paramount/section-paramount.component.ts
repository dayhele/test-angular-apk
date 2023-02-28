import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CardProperties } from 'src/app/shared/interfaces/card-default';
import { Theme } from 'src/assets/theme/theme';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-section-paramount',
  templateUrl: './section-paramount.component.html',
  styleUrls: ['./section-paramount.component.scss']
})
export class SectionParamountComponent {
  @Input() public hasExploreButton: boolean = true;
  @Input() public hasNavigation: boolean = true;
  @Input() public allowTouchMove: boolean = true;
  @Input() public text?: string;

  public dataCards: any = [
    {
      imageUrl: environment.bucket + 'paramount/card-conteudo-exclusivo.png'
    },
    {
      imageUrl: environment.bucket + 'paramount/card-conteudo-exclusivo-1.png'
    },
    {
      imageUrl: environment.bucket + 'paramount/card-conteudo-exclusivo-2.png'
    },
    {
      imageUrl: environment.bucket + 'paramount/card-conteudo-exclusivo-3.png'
    }
  ];

  public cardProperties: CardProperties = { orientation: 'vertical' };

  public environment: any;

  constructor(public theme: Theme, private router: Router) {
    this.environment = environment;
  }

  public goTo(path: string): void {
    this.router.navigateByUrl(path);
  }
}

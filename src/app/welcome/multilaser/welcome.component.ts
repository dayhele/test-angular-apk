import { CardData } from 'src/app/shared/interfaces/card';
import { Component, OnInit } from '@angular/core';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Device } from '../../helpers/device';
import { environment } from 'src/environments/environment';
import { Theme } from 'src/assets/theme/theme';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login.service';

SwiperCore.use([Navigation, Pagination]);

type Question = {
  title: string;
  answer: string;
};

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  public sectionCards: CardData[];
  public channels: string[] = [
    'globo',
    'espn',
    'disney',
    'animalplanet',
    'homehealth',
    'turbo',
    'globonews',
    'foxsports',
    'starchannel',
    'cartoonnetwork',
    'gntchannel',
    'gloob',
    'offchannel',
    'nationalgeographic',
    'history'
  ];
  public isMobile: boolean;
  public questions: Question[];
  public environment = environment;

  constructor(
    public theme: Theme,
    private router: Router,
    private loginService: LoginService
  ) {
    this.environment = environment;
    this.loginService.clearUnloggedDetails();

    if (this.theme.client !== 'multilaser')
      this.router.navigateByUrl('welcome');

    this.isMobile = false;
    this.questions = [
      {
        title: 'Em quantas telas simultâneas consigo assistir?',
        answer: 'Em 4 telas simultâneas com a criação de até 8 perfis.'
      },
      {
        title: 'Como devo realizar o meu primeiro acesso?',
        answer:
          'Para realizar o seu primeiro acesso, entre no site multimais.tv e faça o login com os dados cadastrados (e-mail e senha), validados através do seu e-mail. Você pode fazer o seu login através da Web ou pelo nosso app (disponível para iOS e Android). Depois disso, é só curtir o conteúdo disponível em nossa plataforma.'
      }
    ];

    this.sectionCards = [
      { imageUrl: environment.bucket + 'hbo-max/slide/slide1.png' },
      { imageUrl: environment.bucket + 'hbo-max/slide/slide2.png' },
      { imageUrl: environment.bucket + 'hbo-max/slide/slide3.png' },
      { imageUrl: environment.bucket + 'hbo-max/slide/slide4.png' },
      { imageUrl: environment.bucket + 'hbo-max/slide/slide5.png' },
      { imageUrl: environment.bucket + 'hbo-max/slide/slide6.png' },
      { imageUrl: environment.bucket + 'hbo-max/slide/slide7.png' },
      { imageUrl: environment.bucket + 'hbo-max/slide/slide8.png' },
      { imageUrl: environment.bucket + 'hbo-max/slide/slide9.png' },
      { imageUrl: environment.bucket + 'hbo-max/slide/slide10.png' },
      { imageUrl: environment.bucket + 'hbo-max/slide/slide11.png' },
      { imageUrl: environment.bucket + 'hbo-max/slide/slide12.png' },
      { imageUrl: environment.bucket + 'hbo-max/slide/slide13.png' },
      { imageUrl: environment.bucket + 'hbo-max/slide/slide14.png' }
    ];
  }

  ngOnInit(): void {
    this.isMobile = this.isMobileCheck();
  }

  private isMobileCheck(): boolean {
    return Device.isMobile();
  }
}

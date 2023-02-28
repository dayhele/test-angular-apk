import { Component, OnInit } from '@angular/core';
import { Device } from 'src/app/helpers/device';
import { environment } from 'src/environments/environment';

type Question = {
  title: string;
  answer: string;
  showing: boolean;
};

@Component({
  selector: 'app-section7',
  templateUrl: './section7.component.html',
  styleUrls: ['./section7.component.scss']
})
export class Section7Component implements OnInit {
  public isMobile: boolean;
  public questions: Question[];
  public environment = environment;

  constructor() {
    this.isMobile = false;
    this.questions = [
      {
        title: 'Eu preciso estar vinculado a um provedor parceiro da Watch?',
        answer:
          'Para ser assinante da Watch Brasil, é necessário que um provedor parceiro esteja disponível em sua região. Acesse nosso site, clique na página assinante, disponível em “quero ter Watch”. Role até o final da página e digite sua cidade no buscador. Em seguida, escolha o provedor que mais lhe agrada, e entre em contato. Caso não apareça nenhum resultado, não se preocupe, basta preencher o formulário. Assim que houver um parceiro Watch na sua região, entraremos em contato.',
        showing: false
      },
      {
        title: 'Em quantas telas simultâneas consigo assistir?',
        answer: 'Em 4 telas simultâneas com a criação de até 8 perfis.',
        showing: false
      },
      {
        title: 'Como devo realizar o meu primeiro acesso?',
        answer:
          'Para realizar o seu primeiro acesso, entre em seu e-mail cadastrado e anote o login e senha recebidos. ' +
          'O primeiro acesso pode ser feito através da web, ou pelo nosso app (disponível para iOS e Android). ' +
          'Depois disso, é só aproveitar e curtir o conteúdo disponível em nossa plataforma. Para maior comodidade, ' +
          'é possível criar uma nova senha já na primeira sessão. ' +
          'A plataforma Watch Brasil também pode ser acessada pelo app Watch Brasil (Android e iOS), tablet ou computador/notebook, ' +
          'televisores Smart (Samsung, LG e Android TV Sony, Philco, TCL e AOC) ou via Chromecast.',
        showing: false
      },
      {
        title: 'Até quantos perfis podem ser criados na minha conta?',
        answer: 'Até 8 perfis.',
        showing: false
      }
    ];
  }

  ngOnInit(): void {
    this.isMobile = this.isMobileCheck();
  }

  private isMobileCheck(): boolean {
    return Device.isMobile();
  }
}

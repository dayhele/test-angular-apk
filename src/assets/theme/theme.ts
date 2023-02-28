import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription, take } from 'rxjs';

declare let document: any;

@Injectable({ providedIn: 'root' })
export class Theme {
  //
  //  Se você chegou aqui por meio de ter que alterar algo e esse algo está com {{ theme.algo }} ou constructor(public theme: Theme)
  //  Leia atentamente:
  //  Essas configurações é para vários clientes, então muito cuidado ao mexer e teste em vários ambientes as alterações antes de publicar
  //  Se a alteração que você precisa fazer é uma label, cor, visualização de um componente de um cliente específico, veja o arquivo do cliente em
  //  assets/theme/custom/cliente.json e veja se já tem a configuração lá
  //  Maiores informações verifique o arquivo "README-Multi-temas.md"
  //
  //  ATENÇÃO:
  //  Se você precisa adicionar algo aqui, lembre-se de OBRIGATÓRIAMENTE adicionar isso em TODOS os outros arquivos de clientes, mesmo que seja false
  //
  //  Possíveis perguntas:
  //
  //  "Ah, mas é um componente inteiro dedicado a um cliente"
  //  Veja o "FAQ" de exemplo, ele é false em todos, mas na multilaser é true, e na rota pra mandar pro FAQ tem a verificação IF(theme.login.faq)
  //
  //  "Ah, mas é um componente que já existe e pra um cliente muda a página inteira"
  //  Veja o componente "login/planos/", é um exemplo perfeito para esses casos de alteração inteira
  //
  //
  // PS : IMPORTANTÍSSIMO
  // Se você não entendeu nada o que está acontecendo aqui, chame um Sênior para te explicar
  //
  //
  // Se você é o Sênior: basicamente aqui é que está o CORE para a toda alteração dinâmica de temas, começou com Watch e Multilaser
  //
  //

  // logotipo principal
  public logo = '';
  // logotipo em breve
  public iconComingSoon = '';
  // título (da página, no logos e etc)
  public title = '';
  // qual cliente ativo
  public client = '';
  public clientRoute = '';
  public clientName = '';
  public deepLink = '';
  public googlePlay = '';
  public playStore = '';
  public socialMedia: any = {};
  public alugue = '';
  public header: any = {};
  public login: any = {};
  public home: any = {};
  public splash: any = {};

  // tela de SMS/voucher
  public sms: any = {};
  public planos: any = {};
  public whatsappButton = false;
  public footer: any = {};
  public retention: any = {};
  public sports: any = {};
  public verMais: any = {};
  //modal
  public modalPin: any = {};
  public closeMenu: string = '';
  public logoMobile: string = '';
  public logoweb = false;
  //adons
  public landingPage: any = {};
  //modal HBO
  public buttonHboMax: string = '';
  //forma de pagamento - tela 'account'
  public formaPagamento: boolean = true;
  public preRoll: string = '';

  public linkPlayStore: string = '';
  public linkAppStore: string = '';

  //tutoriais
  public tutorial: any = {};

  //
  //  ============= Se não leu os comentários acima das variáveis, leia primeiro lá =================
  //
  //
  //  Configuração dinâmica do tema, se for só adicionar uma nova propriedade no JSON e ler nesse arquivo, não mexa daqui pra baixo
  //
  //
  //
  //
  //
  // PS : IMPORTANTÍSSIMO
  // Se você não entendeu nada o que está acontecendo aqui, chame um Sênior para te explicar
  //
  //
  // Se você é o Sênior: basicamente aqui é que está o funcionamento para ler o JSON e alterar a variável "theme" nos componentes
  //
  //

  constructor(private http: HttpClient, private titlePage: Title) {
    if (!environment.production) {
      localStorage.setItem(
        'theme',
        localStorage.getItem('theme') || environment.client
      );
      this.getTheme(localStorage.getItem('theme')!);
    } else {
      this.getTheme(environment.client);
    }
  }

  private favIcon: HTMLLinkElement = document.querySelector('#appIcon');
  private appleID: HTMLMetaElement = document.querySelector('#appleID');

  private subscription: Subscription | undefined;

  public activeTheme: string = '';

  public getTheme(theme: string): void {
    this.activeTheme = theme;
    this.subscription = this.http
      .get(`assets/theme/custom/${theme}.js`)
      .pipe(take(1))
      .subscribe((theme: any) => {
        // altera o título da página
        this.titlePage.setTitle(theme.title);

        // altera o favicon
        this.favIcon.href = 'assets/favicon/' + theme.favicon;

        //altera o meta tag do apple ID (toast)
        this.appleID.content = 'app-id=' + theme.mobile.idApple;

        // altera a classe css to tema
        document.documentElement.className = '';
        document.documentElement.classList.add(theme.class);

        //
        // Basicamente, aqui ele pega todos as propriedades do JSON do cliente e coloca em uma variável
        //
        // EX: no JSON: { "qualquerCoisa":"qualquerValor" }
        // this.qualquerCoisa = "qualquerValor";
        //
        // Daí é possível acessar com constructor(public theme: Theme)
        // {{ theme.qualquerCoisa }}
        // em qualquer componente
        //
        Object.keys(theme).forEach((key: string) => {
          (this as any)[key] = theme[key];
        });

        this.subscription?.unsubscribe();
      });
  }
}

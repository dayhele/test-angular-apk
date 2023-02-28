import { Faq } from './../shared/interfaces/faq';
import { Component, OnInit } from '@angular/core';
import { Device } from './../helpers/device';
import { CheckDeviceService } from '../shared/services/check-device.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  public faqList: Faq[];
  public isMobile: boolean = false;
  public checkMobile: boolean = false;

  constructor(
    private router: Router,
    private checkDevice: CheckDeviceService
  ) {
    this.checkMobile = this.checkDevice.isMobile();
    this.faqList = [];
  }

  ngOnInit() {
    this.isMobile = Device.isMobile();

    this.faqList = [
      {
        question: 'COMO EU RECEBO MEU ACESSO?',
        answer: [
          'Você receberá um e-mail com um código de voucher para ativar a sua conta na Multi+. Ao preencher seus dados e a confirmação do cartão de crédito, você receberá o acesso através do e-mail cadastrado.'
        ],
        showing: false
      },
      {
        question: 'COMO FUNCIONA O PRIMEIRO ACESSO?',
        answer: [
          'Para realizar o seu primeiro acesso, entre no site multimais.tv e faça o login com os dados cadastrados (e-mail e senha), validados através do seu e-mail. Você pode fazer o seu login através da Web ou pelo nosso app (disponível para iOS e Android). Depois disso, é só curtir o conteúdo disponível em nossa plataforma.'
        ],
        showing: false
      },
      {
        question: 'COMO UTILIZAR O VOUCHER?',
        answer: [
          `Ao receber o seu voucher, acesse multimais.tv, inclua seus dados pessoais e o código do voucher para realizar o primeiro acesso.`
        ],
        showing: false
      },
      {
        question: 'VOU SER COBRADO AO CADASTRAR O MEU CARTÃO DE CRÉDITO?',
        answer: [
          'Não. No período de teste, quando o voucher estiver em utilização, não será realizado nenhum débito no cartão de crédito.'
        ],
        showing: false
      },
      {
        question: 'QUAIS SÃO OS DISPOSITIVOS QUE POSSO ACESSAR A Multi+?',
        answer: [
          'O acesso pode ser realizado pelo app da Multi+ (Android e iOS), computador/notebook e televisores smart via chromecast.'
        ],
        showing: false
      },
      {
        question: 'QUAIS SÃO OS DISPOSITIVOS COMPATÍVEIS COM A MULTI+?',
        answer: [
          '- Chromecast a partir da versão 2',
          '- iOS a partir do iPhone 5 e acima da versão 9',
          '- iPad com aparelhos acima da versão 2. iOS acima da versão 9',
          '- Android - A partir da versão 8.0',
          '- Box Elsys, Izy Play e ZTE (ML)'
        ],
        showing: false
      },
      {
        question: 'QUAL O HARDWARE MÍNIMO?',
        answer: [
          'São de 10mb de espaço livre de memória. O processador recomendado é: Quadcore 1.5ghz à internet.'
        ],
        showing: false
      },
      {
        question: 'EM QUANTAS TELAS SIMULTÂNEAS CONSIGO ASSISTIR?',
        answer: ['Em 4 telas simultâneas com a criação de até 8 perfis.'],
        showing: false
      },
      {
        question: 'COMO CRIAR OUTROS PERFIS PARA ASSISTIR?',
        answer: [
          'Para criação de outros perfis em sua conta acesse a plataforma Multi+ via web, expanda o ícone do lado superior direito e clique em "Novo Perfil". Após inserir as informações do novo perfil basta clicar em "salvar".'
        ],
        showing: false
      },
      {
        question: 'COMO FAÇO O PAREAMENTO DO MEU APP NA TV?',
        answer: [
          'Nós possuímos um recurso de transmissão via Chromecast controlado pelo app da Multi+ para Android e iOS a partir da versão 2.'
        ],
        showing: false
      },
      {
        question: 'POSSO BAIXAR O APLICATIVO DA MULTI+ NA MINHA TV?',
        answer: [
          'Não. Atualmente estamos em desenvolvimento com a opção de download do nosso app para Android TV, Smart TV, Samsung (Tizen), LG para a plataforma webOS 2018 em diante e TV Toshiba. Em breve teremos novidades, aguardem!'
        ],
        showing: false
      },
      {
        question: 'POSSO BAIXAR O CONTEÚDO DA MULTI+ PARA ASSISTIR OFFLINE?',
        answer: [
          'Não. Para consumir o conteúdo da nossa plataforma, é necessário estar conectado à internet.'
        ],
        showing: false
      },
      {
        question: 'QUAL A QUANTIDADE DE CONTEÚDO DISPONÍVEL NA MULTI+?',
        answer: [
          'Nossa plataforma de conteúdo já oferece mais de 11000 horas de filmes, séries, desenhos, programas de humor, realities e muito mais!'
        ],
        showing: false
      },
      {
        question: 'QUAIS SÃO OS ESTÚDIOS PARCEIROS DA MULTI+?',
        answer: [
          'Atualmente são Paramount+, Warner, Universal, MTV, Comedy Central e Medialand.'
        ],
        showing: false
      },
      {
        question:
          'QUANTO TEMPO APÓS EU EFETUAR A LOCAÇÃO DE UM FILME ELE FICA DISPONÍVEL PARA EU ASSISTIR?',
        answer: ['Até 48 horas após a locação.'],
        showing: false
      },
      {
        question:
          'QUAL O PERÍODO PARA SEREM INCLUÍDOS NOVOS CONTEÚDOS NA PLATAFORMA?',
        answer: ['Semanalmente temos novos conteúdos disponíveis na Multi+.'],
        showing: false
      },
      {
        question: 'O QUE É AWESOMENESS?',
        answer: [
          'Trata-se de uma família de marcas complementares, que inclui a Awesomeness TV e Awesomeness Films, com programação original e direcionada para o público da Geração Z mundial.'
        ],
        showing: false
      },
      {
        question: 'EXISTE ALGUMA TAXA DE CANCELAMENTO?',
        answer: [
          'Não há nenhuma taxa de cancelamento. Caso o débito mensal já tenha sido realizado no seu cartão de crédito, o cancelamento será a partir da próxima fatura e nesse período você poderá consumir o conteúdo da plataforma até o final do período vigente do contrato. Lembrando que não realizamos reembolso nesse caso.'
        ],
        showing: false
      },
      {
        question: 'COMO FAÇO O CANCELAMENTO DA ASSINATURA NA MULTI+?',
        answer: [
          'Para efetuar o cancelamento, acesse a plataforma multimais.tv pela web, no canto superior direito, siga o processo: conta > minhas assinaturas > cancelar.'
        ],
        showing: false
      }
    ];
  }

  public goBack(): void {
    this.router.navigateByUrl('/opcoes');
  }
}

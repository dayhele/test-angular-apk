import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../interfaces/movie';
import {
  NSportsOptionSelectedData,
  NSportsOptionSelectedListData
} from '../../interfaces/plan-access-control';

@Component({
  selector: 'app-choose-payment',
  templateUrl: './choose-payment.component.html',
  styleUrls: ['./choose-payment.component.scss']
})
export class ChoosePaymentComponent implements OnInit, DoCheck {
  @Input() public data: Movie = {};
  @Input() public linkBuyMatch: string = '/nsports';

  private textOptions: NSportsOptionSelectedListData = {
    left: {
      arrowRotate: false,
      primaryDescription: `Comprando este jogo você vai ter acesso a este 
      conteúdo por até 3 horas, o acesso é liberado 1 horas antes do jogo e 
      fica disponível no período da partida.`,
      textButton: 'Comprar jogo atual',
      linkButton: () => this.goToAnotherPage(this.linkBuyMatch)
    },
    right: {
      arrowRotate: true,
      primaryDescription: `Assinando o pacote Nsports você tem acesso ao 
      conteúdo Nsports completo com diversos esportes como Futebol e volley, 
      Campeonatos regionais e muito mais.`,
      secondaryDescription: `Aproveito o melhor do esporte.`,
      textButton: 'Assine direto com seu provedor',
      linkButton: () =>
        this.goToAnotherPage('https://watchbr.com.br/assinante/')
    }
  };

  public selected: NSportsOptionSelectedData = this.textOptions['left'];
  public modalIsOpen!: boolean;
  public nsportsPackagePrice: string = '19.90';

  constructor(private router: Router) {}

  private removeClassOfCards() {
    const allCards = document.querySelectorAll('.payment-cards .payment-card');

    allCards?.forEach((item) => {
      item.classList.remove('selected');
    });
  }

  ngOnInit(): void {
    localStorage.removeItem('modal-choose-payment');
  }

  ngDoCheck(): void {
    this.modalIsOpen = !!localStorage.getItem('modal-choose-payment');
  }

  selectOption(event: Event) {
    const optionClicked = (<HTMLElement>event.target);

    this.removeClassOfCards();

    if (!optionClicked.classList.contains('selected')) {
      
      optionClicked.classList.add('selected');

      const optionSelected: string =
        optionClicked.dataset?.['option'] ?? 'left';

      this.selected = this.textOptions[optionSelected];
    }
  }

  closeModal() {
    if (this.modalIsOpen) localStorage.removeItem('modal-choose-payment');
  }

  goToAnotherPage(link: string): void {
    this.router.navigate([link]);
  }

  convertToReal(finalPrice: string | undefined): string {
    if (!!finalPrice) {
      return Number(finalPrice).toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL'
      });
    }

    return 'R$ 0,00';
  }
}

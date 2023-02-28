import { CardListData } from 'src/app/shared/interfaces/card-home';
import { SectionCardListData } from './../shared/interfaces/card-home';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { SectionService } from './../shared/services/section.service';
import { Observable } from 'rxjs/internal/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Theme } from 'src/assets/theme/theme';
import { PlanAccessControlService } from '../shared/services/plan-access-control.service';

@Component({
  selector: 'app-ver-mais',
  templateUrl: './ver-mais.component.html',
  styleUrls: ['./ver-mais.component.scss']
})
export class VerMaisComponent implements OnInit {
  public list$?: Observable<any>;

  public title: string = '';
  public isLoading: boolean = true;

  public hasCustomIcon: string = '';

  public showNoContentModal: boolean = false;

  public listId: number = 0;

  public listPage: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sectionService: SectionService,
    private profileService: ProfileService,
    public theme: Theme,
    public planAccessControlService: PlanAccessControlService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.initPage();
    });
  }

  public initPage(): void {
    this.list = [];

    this.isLoading = true;

    this.listId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this.title = this.activatedRoute.snapshot.paramMap.get('title')!;
    if (this.title == 'Sugestões') {
      this.title = 'Awesomeness';
    }
    if (this.activatedRoute.snapshot.paramMap.get('hasCustomIcon')) {
      this.hasCustomIcon = sessionStorage.getItem('hasCustomIcon')!;
    }

    this.calcItensPerPage();

    this.addPage();
  }

  public list: CardListData[] = [];

  private itensPerPage: number = 0;

  private calcItensPerPage() {
    // cálculo de quantos itens são exibidos por tela
    // padding lateral = 56px
    // largura card = 200px
    // gap entre cards = 24px

    let _colItens = 0;
    _colItens = window.innerWidth - 56;
    _colItens = _colItens / (200 + 24);
    _colItens = Math.floor(_colItens);

    // altura card = 290px
    // padding  = 96px
    // altura title = 141px
    // padding bottom title = 64px

    let _lineItens = 0;
    _lineItens = window.innerHeight - 96 - 141 - 64;
    _lineItens = _lineItens / (290 + 24);
    _lineItens = Math.ceil(_lineItens) + 2;

    this.itensPerPage = _colItens * _lineItens;
  }

  onScrollDown() {
    if (this.listPage < this.totalPages && this.list.length > 0) this.addPage();
  }

  private totalPages: number = 999;

  addPage(): void {
    this.listPage++;

    let _idPerfil = parseInt(this.profileService.selectedProfile);

    this.sectionService
      .getSectionItensList(
        _idPerfil,
        this.listId,
        4,
        this.listPage,
        this.itensPerPage
      )
      .pipe(
        map((res: SectionCardListData) => {
          this.isLoading = false;
          this.totalPages = res.pages!;
          return res.list || [];
        })
      )
      .subscribe((x: CardListData[]) => {
        this.list = this.list.concat(x);
      });
  }

  public goTo(path?: string): void {
    if (path) {
      this.router.navigateByUrl(path);
      return;
    }
    window.open('https://watchbr.com.br/assinante/');
  }

  public redirectParamont(): void {
    if (this.theme.client === 'watch')
      window.open('https://watchbr.com.br/assinante/');
    else this.router.navigateByUrl('planos/' + this.theme.clientRoute);
  }
}

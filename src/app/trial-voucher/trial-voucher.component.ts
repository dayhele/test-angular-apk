import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Theme } from 'src/assets/theme/theme';
import { CodeService } from '../shared/services/code.service';

@Component({
  selector: 'app-trial-voucher',
  templateUrl: './trial-voucher.component.html',
  styleUrls: ['./trial-voucher.component.scss']
})
export class TrialVoucherComponent implements OnInit {
  public isValidateCode: boolean = false;
  public daysFree: string = '30';

  private code: string = '';

  constructor(
    public theme: Theme,
    private activatedRoute: ActivatedRoute,
    private codeService: CodeService,
    private router: Router
    ) {
    this.theme.getTheme('multilaser');
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.code = params.get('code')!;
      if(this.code){
        sessionStorage.removeItem('id_plano');
        sessionStorage.removeItem('cupom');
        sessionStorage.removeItem('cupomByUrl');
        this.isValidateCode = true;
        this.validateCode()
      }
    });
    if(this.router.url == '/promo90'){
      this.daysFree = '90';
    }
  }

  validateCode() {
    this.codeService
    .validate(this.code, 'cupom')
    .subscribe({
      next: (res) => {
        if (res.Result?.id_plano){
          if(res.Result.days_use &&
             res.Result.days_use != '' &&
             res.Result.id_plano
            ){
              this.daysFree = res.Result.days_use;
              sessionStorage.setItem('cupom',this.code);
              sessionStorage.setItem('id_plano',res.Result.id_plano.toString());
              sessionStorage.setItem('cupomByUrl','true');
              sessionStorage.setItem('days_use',res.Result.days_use.toString());
          }
        }
        this.isValidateCode = false;
      },
      error: (e) => {
        this.isValidateCode = false;
      }
    });
  }
}

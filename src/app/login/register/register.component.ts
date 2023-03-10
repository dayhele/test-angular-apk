import { Error } from './../../shared/interfaces/error';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterForm } from '../../shared/interfaces/register-form';
import { RegisterService } from '../../shared/services/register.service';
import { isEmpty } from 'rxjs';
import { Theme } from 'src/assets/theme/theme';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm: RegisterForm;
  public confirmPassword: string;
  public confirmEmail: string;
  public error: Error;

  public inputNameError: Error;
  public inputPasswordError: Error;
  public inputPasswordConfirmError: Error;
  public inputEmailError: Error;
  public inputEmailConfirmError: Error;
  public inputPhoneError: Error;
  public inputCpfError: Error;
  public inputDefaultError: Error;
  public voucher?: string;

  public waitingForRegistration: boolean;

  public errorMessage: string = '';

  public acceptTerms: boolean;
  public acceptNotify: boolean;
  public inputError: boolean;
  public isEmpty: boolean;
  public showToastCupom: boolean = false;
  public cupomDaysUse?: string = '30';

  hasErrors: any;

  private expressionEmail: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  constructor(
    private registerService: RegisterService,
    private route: Router,
    public theme: Theme
  ) {
    this.confirmEmail = '';
    this.confirmPassword = '';

    let register: any;
    if (localStorage.getItem('registerForm')) {
      register = JSON.parse(localStorage.getItem('registerForm')!);
      register.pEmail = 'teste-' + this.gerarCpf() + '@teste.com';
      this.confirmEmail = register.pEmail;
      register.pCpf = this.gerarCpf();
      this.confirmPassword = register.pSenha;
    }

    this.registerForm = register || {
      pPlano: 0,
      pVoucher: '',
      pCupom: '',
      pNome: '',
      pEmail: '',
      pSexo: '',
      pCpf: '',
      pTelefone: '',
      pNascimento: '',
      pCep: '',
      pPais: '',
      pEstado: '',
      pCidade: '',
      pEndere??o: '',
      pNumero: '',
      pComplemento: '',
      pSenha: ''
    };

    this.error = {};
    this.inputNameError = {};
    this.inputEmailError = {};
    this.inputEmailConfirmError = {};
    this.inputCpfError = {};
    this.inputPhoneError = {};
    this.inputPasswordError = {};
    this.inputPasswordConfirmError = {};
    this.inputDefaultError = {};
    this.waitingForRegistration = false;
    this.acceptTerms = false;
    this.acceptNotify = false;
    this.inputError = false;
    this.isEmpty = false;
  }

  gerarCpf() {
    const num1 = this.aleatorio(); //aleatorio j?? devolve string, logo n??o precisa de toString
    const num2 = this.aleatorio();
    const num3 = this.aleatorio();

    const dig1 = this.dig(num1, num2, num3); //agora s?? uma fun????o dig
    const dig2 = this.dig(num1, num2, num3, dig1); //mesma fun????o dig aqui

    //aqui com interpola????o de strings fica bem mais legivel
    return `${num1}.${num2}.${num3}-${dig1}${dig2}`;
  }

  //o quarto parametro(n4) s?? ser?? recebido para o segundo digito
  dig(n1: any, n2: any, n3: any, n4?: any) {
    //as concatena????es todas juntas uma vez que s??o curtas e leg??veis
    const nums = n1.split('').concat(n2.split(''), n3.split(''));

    if (n4 !== undefined) {
      //se for o segundo digito coloca o n4 no sitio certo
      nums[9] = n4;
    }

    let x = 0;

    //o j ?? tamb??m iniciado e incrementado no for para aproveitar a pr??pria sintaxe dele
    //o i tem inicios diferentes consoante ?? 1?? ou 2?? digito verificador
    for (let i = n4 !== undefined ? 11 : 10, j = 0; i >= 2; i--, j++) {
      x += parseInt(nums[j]) * i;
    }

    const y = x % 11;
    //tern??rio aqui pois ambos os retornos s??o simples e continua legivel
    return y < 2 ? 0 : 11 - y;
  }

  aleatorio() {
    const aleat = Math.floor(Math.random() * 999);
    //o preenchimento dos zeros ?? esquerda ?? mais facil com a fun????o padStart da string
    return ('' + aleat).padStart(3, '0');
  }

  ngOnInit(): void {
    if(sessionStorage.getItem('cupomByUrl')?.toString() == "true"){
      sessionStorage.removeItem('cupomByUrl');
      this.cupomDaysUse = sessionStorage.getItem('days_use')?.toString();
      sessionStorage.removeItem('days_use');
      this.showToastCupom = true;
    }

    this.getVoucherFromSessionStorage();
    this.getCupomFromSessionStorage();

    let _pPlano = sessionStorage.getItem('selected_planId');
    this.registerForm.pPlano = Number(_pPlano);
  }

  public handleConsent(type: string, value: boolean): void {
    if (type == 'terms') {
      this.acceptTerms = value;
    } else {
      this.acceptNotify = value;
    }
  }

  public cancel(): void {
    sessionStorage.clear();
    this.route.navigateByUrl('/planos');
  }

  public getVoucherFromSessionStorage(): void {
    const voucher = sessionStorage.getItem('voucher');
    if (voucher) {
      this.registerForm.pVoucher = voucher;
    }
  }

  public getCupomFromSessionStorage(): void {
    const cupom = sessionStorage.getItem('cupom');
    const id_plano = sessionStorage.getItem('id_plano');
    if (cupom) {
      this.registerForm.pCupom = cupom;
      this.registerForm.pPlano = Number(id_plano);
    }
  }

  public paramEffects(param: any) {
    param.hasError = false;
    this.inputError = false;
  }

  public onSubmit(): void {
    event?.preventDefault();
    this.waitingForRegistration = true;

    this.errorMessage = '';

    if (this.registerForm.pVoucher || this.registerForm.pCupom)
      this.registerForm.pPlano = 7;

    if (this.isAllOk()) {
      this.hasErrors = false;
      this.registerService.registerUser(this.registerForm).subscribe(
        (data) => {
          sessionStorage.setItem(
            'register_data',
            JSON.stringify(this.registerForm)
          );

          sessionStorage.setItem(
            'register_user_id',
            JSON.stringify(data.Result.id)
          );

          sessionStorage.removeItem('voucher');

          localStorage.setItem('register_user_id', data.Result.id.toString());

          this.waitingForRegistration = false;

          this.route.navigateByUrl('/login/activate');
        },
        (err) => {
          if (err.error.ErrorMessage) {
            this.hasErrors = true;
            switch (err.error.ErrorMessage) {
              case 'Informe um email v??lido':
                this.inputEmailError.hasError = true;
                this.inputEmailError.message = err.error.ErrorMessage;
                break;
              case 'Informe um telefone v??lido':
                this.inputPhoneError.hasError = true;
                this.inputPhoneError.message = err.error.ErrorMessage;
                break;
              case 'CPF j?? cadastrado':
                this.inputCpfError.hasError = true;
                this.inputCpfError.message = err.error.ErrorMessage;
                break;
              case 'O CPF informado j?? est?? em uso':
                this.inputCpfError.hasError = true;
                this.inputCpfError.message = err.error.ErrorMessage;
                break;
              case 'Informe um cpf v??lido':
                this.inputCpfError.hasError = true;
                this.inputCpfError.message = err.error.ErrorMessage;
                break;
              case 'J?? existe uma assinatura ativa vinculada ao e-mail informado':
                this.inputEmailError.hasError = true;
                this.inputEmailError.message = err.error.ErrorMessage;
                break;
              case 'A senha precisa ter no minimo 6 caracteres, uma letra mai??scula, uma letra min??scula e um n??mero':
                this.inputPasswordError.hasError = true;
                this.inputPasswordError.message = err.error.ErrorMessage;
                break;
              default:
                this.inputDefaultError.hasError = true;
                this.inputDefaultError.message = err.error.ErrorMessage;
                break;
            }
          }

          this.waitingForRegistration = false;
        }
      );
    } else {
      this.waitingForRegistration = false;
      this.hasErrors = true;
    }
  }

  public isAllOk(): boolean {
    this.isEmpty = false;
    const registerKeys = Object.entries(this.registerForm);
    const registerKeysLength = registerKeys.length;

    if (this.confirmPassword == '') {
      this.inputPasswordConfirmError.hasError = true;
      this.isEmpty = true;
    }
    if (this.confirmEmail == '') {
      this.inputEmailConfirmError.hasError = true;
      this.isEmpty = true;
    }

    for (let i = 0; i < registerKeysLength; i++) {
      if (registerKeys[i][1] === '') {
        let key = registerKeys[i][0];
        switch (key) {
          case 'pNome': {
            this.inputNameError.hasError = true;
            this.isEmpty = true;
            break;
          }
          case 'pEmail': {
            this.inputEmailError.hasError = true;
            this.isEmpty = true;
            break;
          }
          case 'pSenha': {
            this.inputPasswordError.hasError = true;
            this.isEmpty = true;

            break;
          }
          case 'pTelefone': {
            this.inputPhoneError.hasError = true;
            this.isEmpty = true;

            break;
          }
          case 'pCpf': {
            if (!this.voucher) {
              this.isEmpty = true;
              this.inputCpfError.hasError = true;
              break;
            }
          }
        }
      }
    }
    if (this.isEmpty) {
      this.error.hasError = true;
      this.error.message = 'Os campos n??o foram preenchidos corretamente';
      return false;
    }

    this.registerForm.pEmail = this.registerForm.pEmail.trim().replace(/\s/g, '');
    this.confirmEmail = this.confirmEmail.trim().replace(/\s/g, '');

    if(!this.expressionEmail.test(this.registerForm.pEmail)){
      this.error.hasError = true;
      this.inputEmailError.hasError = true;
      this.inputEmailError.message = "Digite um e-mail v??lido!"
      return false;
    }

    if(!this.expressionEmail.test(this.confirmEmail)){
      this.error.hasError = true;
      this.inputEmailConfirmError.hasError = true;
      this.inputEmailConfirmError.message = "Digite um e-mail v??lido!"
      return false;
    }

    if (this.confirmEmail !== this.registerForm.pEmail) {
      this.error.hasError = true;
      this.inputEmailConfirmError.hasError = true;
      this.inputEmailConfirmError.message =
        'Os emails informados n??o coincidem';
      return false;
    } else {
      this.inputEmailConfirmError = {};
    }

    if (this.confirmPassword !== this.registerForm.pSenha) {
      this.error.hasError = true;
      this.inputPasswordConfirmError.hasError = true;
      this.inputPasswordConfirmError.message =
        'As senhas informadas n??o coincidem';
      return false;
    } else {
      this.inputPasswordConfirmError = {};
    }

    if (!this.acceptTerms) {
      this.isEmpty = true;
      this.error.hasError = true;
      return false;
    }

    return true;
  }
}

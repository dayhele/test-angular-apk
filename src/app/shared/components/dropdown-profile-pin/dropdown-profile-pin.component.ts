import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';
import { PinForm } from '../../interfaces/form-pin';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dropdown-profile-pin',
  templateUrl: './dropdown-profile-pin.component.html',
  styleUrls: ['./dropdown-profile-pin.component.scss']
})
export class DropdownProfilePinComponent implements OnInit, OnChanges {
  @Input() public passwordVerify: boolean;
  @Input() public emailVerify: boolean;

  @Output() public InfoUser = new EventEmitter<any>();
  @Output() public changes: EventEmitter<string> = new EventEmitter();
  @Output() public OptionEvent = new EventEmitter<string>();
  @Output() public verifyEmailButton = new EventEmitter<boolean>();
  @Output() public verifyDiff = new EventEmitter<boolean>();

  public user: PinForm = {
    email: '',
    pin: ''
  };
  public buttonAtived: boolean;
  public routePath: boolean;

  public nameInput: string;
  public nameInputRepeat: string;
  public option: string;
  public optionTitle: string;
  public pin: string;
  public pinRepeat: string;
  public path: string;
  public recoveryEmail: string;
  public statusEdit?: boolean;
  public resetInput: boolean;
  public inputLengthCounter: number = 0;

  constructor(private route: Router) {
    this.buttonAtived = false;
    this.emailVerify = false;
    this.nameInput = '';
    this.nameInputRepeat = 'Confirmar a nova senha:';
    this.option = '';
    this.optionTitle = '';
    this.passwordVerify = false;
    this.path = this.route.url;
    this.pin = '';
    this.pinRepeat = '';
    this.recoveryEmail = '';
    this.routePath = false;
    this.statusEdit = undefined;
    this.resetInput = false;
  }

  ngOnInit() {
    this.nameInput = 'Nova senha';
    if (this.path.includes('edit')) this.routePath = true;
  }

  ngOnChanges() {
    if (this.passwordVerify !== false) {
      this.nameInput = 'Nova senha';
      this.statusEdit = undefined;
    } else {
      this.nameInput = 'Senha incorreta';
      this.statusEdit = false;
    }
  }

  public sendEmail(): void {
    this.user.email = this.recoveryEmail;
    this.sendAction();
    this.verifyEmailButton.emit();
  }

  public sendAction(): void {
    this.InfoUser.emit(this.user);
  }

  public newPin(): void {
    if (this.pin && this.pinRepeat)
      this.comparePassword(this.pin, this.pinRepeat);
  }

  public comparePassword(password: string, repeatPassword: string): boolean {
    if (
      password === repeatPassword &&
      password.length === 4 &&
      repeatPassword.length === 4
    ) {
      this.buttonAtived = true;
      this.statusEdit = true;
      this.nameInput = 'Nova senha';
      this.nameInputRepeat = 'Confirmar a nova senha:';
      this.verifyDiff.emit(true);
      return true;
    } else {
      this.buttonAtived = false;
      this.statusEdit = false;
      this.nameInput = 'Senha incorreta:';
      this.nameInputRepeat = 'Senha incorreta:';
      this.verifyDiff.emit(false);
      return false;
    }
  }

  public savePin(): void {
    if (this.buttonAtived) {
      if (this.comparePassword(this.pin, this.pinRepeat)) {
        this.user.pin = this.pin;
        this.sendAction();
        this.changes.emit('save');
        this.option = '';
        this.pin = '';
        this.pinRepeat = '';
        this.buttonAtived = false;
      }
    }
  }

  public deletePin(): void {
    this.user.pin = this.pin;
    this.sendAction();
  }

  public forgetPassword(): void {
    this.OptionEvent.emit('sendEmail');
    this.option = 'sendEmail';
    this.optionTitle = 'Esqueci a senha';
  }

  public outputPin(inputVal: string): void {
    if (inputVal.length === 4) {
      this.resetInput = false;
      this.checkPin(inputVal);
    }
  }

  public InputOne(pin: string): void {
    this.pin = pin;
    this.newPin();
  }

  public InputTwo(pin: string): void {
    this.pinRepeat = pin;
    this.newPin();
  }

  public InputChange(lenght: number): void {
    if (lenght > this.inputLengthCounter) {
      this.inputLengthCounter = lenght;
      return;
    }

    this.buttonAtived = false;
    this.inputLengthCounter = lenght;
  }

  public checkPin(inputVal: string): void {
    this.user.pin = inputVal;
    this.sendAction();

    if (this.passwordVerify) {
      this.user.action = 'criar';
      this.sendAction();
      this.newPin();
    }
  }

  public getOption(param: string): void {
    this.resetInputs(param);
    this.OptionEvent.emit(param);
    this.user.action = param;
    switch (param) {
      case 'criar':
        this.optionTitle = 'Criar senha';
        break;
      default:
        this.changeTitle(param);
        break;
    }
  }

  public changeTitle(param: string): void {
    switch (param) {
      case 'editar':
        this.optionTitle = this.routePath ? 'Alterar senha' : 'Criar senha';
        this.nameInput = this.routePath ? 'Senha atual' : 'Nova senha';

        break;
      case 'excluir':
        this.optionTitle = this.routePath ? 'Excluir senha' : 'Criar senha';
        this.nameInput = this.routePath ? 'Senha atual' : 'Nova senha';
        break;
    }
  }

  private resetInputs(param: string): void {
    this.statusEdit = undefined;
    this.option = this.routePath ? param : 'criar';
    this.pin = '';
    this.pinRepeat = '';
    this.resetInput = this.resetInput ? false : true;
  }
}

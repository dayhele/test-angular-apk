import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { SmsComponent } from './sms/sms.component';
import { RegisterComponent } from './register/register.component';
import { PasswordRecoveryInsertEmailComponent } from './password-recovery-insert-email/password-recovery-insert-email.component';
import { PasswordRecoveryInsertPasswordComponent } from './password-recovery-insert-password/password-recovery-insert-password.component';
import { SuccessComponent } from './success/success.component';
import { AtivacaoComponent } from './ativacao/ativacao.component';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [
    LoginComponent,
    SmsComponent,
    RegisterComponent,
    PasswordRecoveryInsertEmailComponent,
    PasswordRecoveryInsertPasswordComponent,
    SuccessComponent,
    AtivacaoComponent
  ],
  imports: [CommonModule, LoginRoutingModule, SharedModule, SwiperModule]
})
export class LoginModule {}

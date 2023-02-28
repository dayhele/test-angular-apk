import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterGuard } from '../auth/register.guard';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register/register.component';
import { SmsComponent } from './sms/sms.component';
import { PasswordRecoveryInsertEmailComponent } from './password-recovery-insert-email/password-recovery-insert-email.component';
import { PasswordRecoveryInsertPasswordComponent } from './password-recovery-insert-password/password-recovery-insert-password.component';
import { SuccessComponent } from './success/success.component';
import { AtivacaoComponent } from './ativacao/ativacao.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'sms',
    component: SmsComponent
  },
  {
    path: 'voucher',
    component: SmsComponent
  },
  {
    path: 'planos',
    loadChildren: () =>
      import('./planos/planos.module').then((m) => m.PlanosModule)
  },
  {
    path: 'cadastro',
    component: RegisterComponent,
    canActivate: [RegisterGuard]
  },
  {
    path: 'success',
    component: SuccessComponent,
    canActivate: [RegisterGuard]
  },
  {
    path: 'esqueci-minha-senha',
    component: PasswordRecoveryInsertEmailComponent
  },
  {
    path: 'criar-nova-senha/:token',
    component: PasswordRecoveryInsertPasswordComponent
  },
  {
    path: 'activate',
    component: AtivacaoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {}

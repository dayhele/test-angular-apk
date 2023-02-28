import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { DenyAppGuard } from './auth/deny-app.guard';
import { LoggedGuard } from './auth/logged.guard';
import { OnlyMultiGuard } from './auth/only-multi.guard';
import { OnlyRealLoginGuard } from './auth/only-real-login.guard';
import { OnlyWatchGuard } from './auth/only-watch.guard';
import { ProfileGuard } from './auth/profile.guard';
import { UnloggedGuard } from './auth/unlogged.guard';
import { PageComponent } from './core/page/page/page.component';

const routes: Routes = [
  {
    path: '',
    component: PageComponent,
    children: [
      {
        path: 'welcome',
        loadChildren: () =>
          import('./welcome/welcome.module').then((m) => m.WelcomeModule),
        canActivate: [OnlyWatchGuard]
      },
      {
        path: 'welcome/:find',
        loadChildren: () =>
          import('./welcome/welcome.module').then((m) => m.WelcomeModule)
      },
      {
        path: 'try',
        loadChildren: () => import('./try/try.module').then((m) => m.TryModule),
        canActivate: [DenyAppGuard]
      },
      {
        path: 'activationVoucher',
        loadChildren: () =>
          import('./activationVoucher/activationVoucher.module').then(
            (m) => m.ActivationVoucherModule
          )
      },
      {
        path: 'canceled',
        loadChildren: () =>
          import('./canceled/canceled.module').then((m) => m.CanceledModule),
        canActivate: [AuthGuard, ProfileGuard]
      },

      {
        path: 'expired',
        loadChildren: () =>
          import('./expired/expired.module').then((m) => m.ExpiredModule)
      },
      // {
      //   path: 'directvgo',
      //   loadChildren: () =>
      //     import('./directvgo/directvgo.module').then((m) => m.DirectvgoModule),
      //   canActivate: [AuthGuard, ProfileGuard]
      // },
      // {
      //   path: 'hbomax',
      //   loadChildren: () =>
      //     import('./hbomax/hbomax.module').then((m) => m.HbomaxModule),
      //   canActivate: [AuthGuard, ProfileGuard]
      // },
      {
        path: 'series/:id',
        loadChildren: () =>
          import('./series/series.module').then((m) => m.SeriesModule),
        canActivate: [AuthGuard, ProfileGuard]
      },

      {
        path: 'series/:id/:category',
        loadChildren: () =>
          import('./series/series.module').then((m) => m.SeriesModule)
        // canActivate: [AuthGuard, ProfileGuard]
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./login/login.module').then((m) => m.LoginModule),
        canActivate: [LoggedGuard]
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
        canActivate: [AuthGuard, ProfileGuard]
      },
      {
        path: 'search',
        loadChildren: () =>
          import('./search/search.module').then((m) => m.SearchModule),
        canActivate: [AuthGuard, ProfileGuard]
      },
      {
        path: 'search-mob/:type',
        loadChildren: () =>
          import('./search-mobile/search-mobile.module').then(
            (m) => m.SearchMobileModule
          ),
        canActivate: [AuthGuard, ProfileGuard]
      },
      {
        path: 'favorites',
        loadChildren: () =>
          import('./favorites/favorites.module').then((m) => m.FavoritesModule),
        canActivate: [AuthGuard, ProfileGuard]
      },
      {
        path: 'now',
        loadChildren: () => import('./now/now.module').then((m) => m.NowModule),
        canActivate: [AuthGuard, ProfileGuard]
      },
      {
        path: 'highlights',
        loadChildren: () =>
          import('./highlights/highlights.module').then(
            (m) => m.HighlightsModule
          ),
        canActivate: [AuthGuard, ProfileGuard]
      },
      {
        path: 'sports',
        loadChildren: () =>
          import('./sports/sports.module').then((m) => m.SportsModule),
        canActivate: [AuthGuard, ProfileGuard]
      },
      {
        path: 'watch',
        loadChildren: () =>
          import('./watch/watch.module').then((m) => m.WatchModule),
        canActivate: [AuthGuard, ProfileGuard]
      },
      {
        path: 'account',
        loadChildren: () =>
          import('./account/account.module').then((m) => m.AccountModule),
        canActivate: [AuthGuard, ProfileGuard]
      },
      {
        path: 'details/:id/:type',
        loadChildren: () =>
          import('./movies-and-series/movies-and-series.module').then(
            (m) => m.MoviesAndSeriesModule
          )
      },
      {
        path: 'details/:id/:type/:isParamount',
        loadChildren: () =>
          import('./movies-and-series/movies-and-series.module').then(
            (m) => m.MoviesAndSeriesModule
          )
      },
      {
        path: 'planos',
        loadChildren: () =>
          import('./login/planos/planos.module').then((m) => m.PlanosModule)
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfileModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'rent',
        loadChildren: () =>
          import('./rent/rent.module').then((m) => m.RentModule),
        canActivate: [AuthGuard, ProfileGuard]
      },
      {
        path: 'rent/:id/:type',
        loadChildren: () =>
          import('./rent/rent.module').then((m) => m.RentModule),
        canActivate: [AuthGuard, ProfileGuard]
      },
      {
        path: 'opcoes',
        loadChildren: () =>
          import('./opcoes/opcoes.module').then((m) => m.OpcoesModule),
        canActivate: [AuthGuard, ProfileGuard]
      },
      {
        path: 'ver-mais',
        loadChildren: () =>
          import('./ver-mais/ver-mais.module').then((m) => m.VerMaisModule)
      },
      {
        path: 'faq',
        loadChildren: () => import('./faq/faq.module').then((m) => m.FaqModule)
      },
      {
        path: 'termos',
        loadChildren: () =>
          import('./terms-of-use/terms-of-use.module').then(
            (m) => m.TermsOfUseModule
          )
      },
      {
        path: 'pagamento',
        loadChildren: () =>
          import('./payment/payment.module').then((m) => m.PaymentModule)
      },
      {
        path: 'ativar',
        loadChildren: () =>
          import('./devices/devices.module').then((m) => m.DevicesModule),
        canActivate: [AuthGuard, ProfileGuard]
      },
      {
        path: 'retention',
        loadChildren: () =>
          import('./retention/retention.module').then((m) => m.RetentionModule)
      },
      {
        path: 'paramount',
        loadChildren: () =>
          import('./paramount/paramount.module').then((m) => m.ParamountModule)
      },
      {
        path: 'directvgo',
        loadChildren: () =>
          import('./directv-go/directv-go.module').then(
            (m) => m.DirectvGoModule
          )
      },
      {
        path: 'hbomax',
        loadChildren: () =>
          import('./hbo-max/hbo-max.module').then((m) => m.HboMaxModule)
      },
      {
        path: 'activate-account-sms',
        loadChildren: () =>
          import('./activate-account/activate-account.module').then(
            (m) => m.ActivateAccountModule
          )
      },
      {
        path: 'nsports',
        loadChildren: () =>
          import('./nsports/nsports.module').then((m) => m.NsportsModule),
        canActivate: [AuthGuard, ProfileGuard]
      },
      {
        path: 'produtos-adicionais',
        loadChildren: () =>
          import('./produtos-adicionais/produtos-adicionais.module').then(
            (m) => m.ProdutosAdicionaisModule
          )
      },
      {
        path: 'feedback',
        loadChildren: () =>
          import('./feedback/feedback.module').then((m) => m.FeedbackModule),
        canActivate: [AuthGuard, ProfileGuard]
      },
      {
        path: 'pre-lancamentos',
        loadChildren: () =>
          import('./pre-saves/pre-saves.module').then((m) => m.PreSavesModule),
        canActivate: [AuthGuard, ProfileGuard]
      },
      {
        path: 'institucional',
        loadChildren: () =>
          import('./institucional/institucional.module').then(
            (m) => m.InstitucionalModule
          ),
        canActivate: [OnlyMultiGuard, UnloggedGuard]
      },
      {
        path: 'institucional/:plans',
        loadChildren: () =>
          import('./institucional/institucional.module').then(
            (m) => m.InstitucionalModule
          ),
        canActivate: [OnlyMultiGuard, UnloggedGuard]
      },
      {
        path: 'libertadores',
        loadChildren: () =>
          import('./libertadores/libertadores.module').then((m) => m.LibertadoresModule),
        canActivate: [AuthGuard, ProfileGuard]
      },
    ]
  },
  {
    path: 'pagamento',
    loadChildren: () =>
      import('./payment/payment.module').then((m) => m.PaymentModule)
  },
  {
    path: 'enter',
    loadChildren: () =>
      import('./enter/enter.module').then((m) => m.EnterModule),
    canActivate: [LoggedGuard]
  },
  {
    path: 'new-here',
    loadChildren: () =>
      import('./new-here/new-here.module').then((m) => m.NewHereModule)
  },
  {
    path: 'promo',
    loadChildren: () =>
      import('./trial-voucher/trial-voucher.module').then(
        (m) => m.TrialVoucherModule
      ),
    canActivate: [OnlyMultiGuard, LoggedGuard]
  },
  {
    path: 'promo90',
    loadChildren: () =>
      import('./trial-voucher/trial-voucher.module').then(
        (m) => m.TrialVoucherModule
      ),
    canActivate: [OnlyMultiGuard, LoggedGuard]
  },
  {
    path: 'promo/cupom/:code',
    loadChildren: () =>
      import('./trial-voucher/trial-voucher.module').then(
        (m) => m.TrialVoucherModule
      ),
    canActivate: [OnlyMultiGuard, LoggedGuard]
  },
  {
    path: '404',
    loadChildren: () =>
      import('./errors/erro404/erro404.module').then((m) => m.Erro404Module)
  },
  {
    path: '500',
    loadChildren: () =>
      import('./errors/erro500/erro500.module').then((m) => m.Erro500Module)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
      scrollPositionRestoration: 'top'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

import { PlanUpgradeSuccessComponent } from './plan-upgrade-success/plan-upgrade-success.component';
import { MultilserPlanosComponent } from './multilaser/multilaser-planos/multilaser-planos.component';
import { PlanosComponent } from './planos.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SwiperModule } from 'swiper/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlanosRoutingModule } from './planos-routing.module';
import { PlanUpgradeComponent } from './plan-upgrade/plan-upgrade.component';
import { IconesPlanosComponent } from './multilaser/multilaser-planos/icones-planos/icones-planos.component';
import { SectionPlanosComponent } from './multilaser/multilaser-planos/section-planos/section-planos.component';
import { ChangePlanService } from 'src/app/shared/services/change-plan.service';
import {LOCALE_ID, DEFAULT_CURRENCY_CODE} from '@angular/core';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

registerLocaleData(ptBr);


@NgModule({
    declarations: [
        PlanosComponent,
        MultilserPlanosComponent,
        PlanUpgradeComponent,
        PlanUpgradeSuccessComponent,
        IconesPlanosComponent,
        SectionPlanosComponent
    ],
    imports: [CommonModule, SwiperModule, SharedModule, PlanosRoutingModule],
    providers: [ChangePlanService,{provide: LOCALE_ID, useValue: 'pt'},{provide:  DEFAULT_CURRENCY_CODE, useValue: 'BRL'},
    ]
})
export class PlanosModule {}

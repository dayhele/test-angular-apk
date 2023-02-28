import { NgModule, isDevMode } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpModule } from './core/modules/http/http.module';
import { Interceptor } from './core/modules/interceptor/interceptor.module';
import { PageComponent } from './core/page/page/page.component';
import { RentComponent } from './rent/rent.component';
import { PopupDisconnectedComponent } from './shared/components/popup-disconnected/popup-disconnected.component';
import { SharedModule } from './shared/shared.module';
import { SplashAppComponent } from './splash-app/splash-app.component';
import { HistoricComponent } from './historic/historic.component';
import { LibertadoresComponent } from './libertadores/libertadores.component';
import { PreSavesComponent } from './pre-saves/pre-saves.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    RentComponent,
    PopupDisconnectedComponent,
    SplashAppComponent,
    HistoricComponent,
    LibertadoresComponent,
    PreSavesComponent
  ],
  imports: [
    HttpModule,
    Interceptor,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
    NgxSkeletonLoaderModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [PopupDisconnectedComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SearchMobileRoutingModule } from './search-mobile-routing.module';
import { SearchMobileComponent } from './search-mobile.component';

@NgModule({
  declarations: [SearchMobileComponent],
  imports: [CommonModule, SearchMobileRoutingModule, SharedModule,
    InfiniteScrollModule]
})
export class SearchMobileModule {}

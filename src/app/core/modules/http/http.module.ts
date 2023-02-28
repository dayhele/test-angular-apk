import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Http } from '../../../shared/services/http.service';

@NgModule({
  declarations: [],
  imports: [HttpClientModule],
  providers: [Http]
})
export class HttpModule {}

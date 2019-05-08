import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_CONFIG, AppConfig } from './app.config';
import { HttpClientModule } from '@angular/common/http';
import {HoldersService} from './holders.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxDatatableModule,
    AppRoutingModule
  ],
  providers: [
    { provide: APP_CONFIG, useValue: AppConfig },
    HoldersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

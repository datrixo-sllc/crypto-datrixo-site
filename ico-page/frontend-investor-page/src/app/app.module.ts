import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { APP_CONFIG, AppConfig } from './app.config';
import { HttpClientModule } from '@angular/common/http';
import {HoldersService} from './holders.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {HoldersDatatableComponent} from './holders-datatable/holders-datatable.component';

@NgModule({
  declarations: [
    AppComponent,
    HoldersDatatableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxDatatableModule
  ],
  providers: [
    { provide: APP_CONFIG, useValue: AppConfig },
    HoldersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

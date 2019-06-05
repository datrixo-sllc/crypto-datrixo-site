import {CommonModule, HashLocationStrategy, LocationStrategy} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LanguageTranslationModule } from './shared/modules/language-translation/language-translation.module'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_CONFIG, AppConfig } from './app.config';
import { AuthGuard } from './shared';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Http, HttpModule } from '@angular/http';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        LanguageTranslationModule,
        AppRoutingModule,
        NgxSpinnerModule,
        HttpModule
    ],
    declarations: [AppComponent],
    providers: [
        AuthGuard,
        { provide: APP_CONFIG, useValue: AppConfig },
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        ],
    bootstrap: [AppComponent]
})
export class AppModule {}

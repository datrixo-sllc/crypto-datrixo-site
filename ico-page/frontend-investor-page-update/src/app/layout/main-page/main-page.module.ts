import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageComponent } from './main-page.component';
import {PageHeaderModule} from '../../shared/modules';
import {MainPageService} from './main-page.service';

@NgModule({
    imports: [CommonModule, MainPageRoutingModule, PageHeaderModule, MainPageComponent],
    providers: [MainPageService]
})
export class MainPageModule {}

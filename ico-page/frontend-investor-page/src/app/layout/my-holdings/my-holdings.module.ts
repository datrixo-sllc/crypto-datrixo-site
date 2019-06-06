import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyHoldingsRoutingModule } from './my-holdings-routing.module';
import { MyHoldingsComponent } from './my-holdings.component';
import { PageHeaderModule } from './../../shared';
import { FileSaverModule } from 'ngx-filesaver';
import {HoldersDatatableComponent} from './holders-datatable/holders-datatable.component';
import {MyHoldingsService} from './my-holdings.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
    imports: [
        CommonModule,
        MyHoldingsRoutingModule,
        PageHeaderModule,
        FileSaverModule,
        NgxDatatableModule
    ],
    declarations: [
        MyHoldingsComponent,
        HoldersDatatableComponent
    ],
    providers: [
        MyHoldingsService
    ]
})
export class MyHoldingsModule {}

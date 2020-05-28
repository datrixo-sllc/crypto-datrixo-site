import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyEquityHoldingsRoutingModule } from './my-equity-holdings-routing.module';
import { MyEquityHoldingsComponent } from './my-equity-holdings.component';
import { PageHeaderModule } from './../../shared';
import { FileSaverModule } from 'ngx-filesaver';
import {MyEquityHoldingDatatableComponent} from './my-equity-holding-datatable/my-equity-holding-datatable.component';
import {MyEquityHoldingsService} from './my-equity-holdings.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
    imports: [
        CommonModule,
        MyEquityHoldingsRoutingModule,
        PageHeaderModule,
        FileSaverModule,
        NgxDatatableModule
    ],
    declarations: [
        MyEquityHoldingsComponent,
        MyEquityHoldingDatatableComponent
    ],
    providers: [
        MyEquityHoldingsService
    ]
})
export class MyEquityHoldingsModule {}

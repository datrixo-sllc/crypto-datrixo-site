import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyEquityHoldingsRoutingModule } from './my-equity-holdings-routing.module';
import { MyEquityHoldingsComponent } from './my-equity-holdings.component';
import { MaterialModule, PageHeaderModule, SharedPipesModule} from './../../shared';
import { FileSaverModule } from 'ngx-filesaver';
import {MyEquityHoldingDatatableComponent} from './my-equity-holding-datatable/my-equity-holding-datatable.component';
import {MyEquityHoldingsService} from './my-equity-holdings.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {
    MyEquityHoldingDatatableResponsiveComponent
} from './my-equity-holding-datatable-responsive/my-equity-holding-datatable-responsive.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        MyEquityHoldingsRoutingModule,
        PageHeaderModule,
        FileSaverModule,
        NgxDatatableModule,
        MaterialModule,
        NgbModule
    ],
    declarations: [
        MyEquityHoldingsComponent,
        MyEquityHoldingDatatableComponent,
        MyEquityHoldingDatatableResponsiveComponent
    ],
    providers: [
        MyEquityHoldingsService
    ]
})
export class MyEquityHoldingsModule {}

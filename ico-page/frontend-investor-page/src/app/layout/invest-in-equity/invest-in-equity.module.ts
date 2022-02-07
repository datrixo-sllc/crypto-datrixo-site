import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvestInEquityRoutingModule } from './invest-in-equity-routing.module';
import { InvestInEquityComponent } from './invest-in-equity.component';
import { MaterialModule, PageHeaderModule, SharedPipesModule} from './../../shared';
import {FormsModule} from '@angular/forms';
import {InvestInEquityDownloadService} from './invest-in-equity-download.service';
import { FileSaverModule } from 'ngx-filesaver';
import {RecieveUtils} from './recieve-utils';
import {InvestInEquityUploadService} from './invest-in-equity-upload.service';
import {EquityHoldersDatatableComponent} from './equity-holders-datatable/equity-holders-datatable.component';
import {InvestInEquityService} from './invest-in-equity.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {
    EquityHoldersDatatableResponsiveComponent
} from './equity-holders-datatable-responsive/equity-holders-datatable-responsive.component';

@NgModule({
    imports: [
        CommonModule,
        InvestInEquityRoutingModule,
        PageHeaderModule,
        FileSaverModule,
        NgxDatatableModule,
        NgbModule,
        MaterialModule,
        SharedPipesModule,
    ],
    declarations: [
        InvestInEquityComponent,
        EquityHoldersDatatableComponent,
        EquityHoldersDatatableResponsiveComponent
    ],
    providers: [
        InvestInEquityService,
        InvestInEquityDownloadService,
        InvestInEquityUploadService,
        RecieveUtils
    ]
})
export class InvestInEquityModule {}

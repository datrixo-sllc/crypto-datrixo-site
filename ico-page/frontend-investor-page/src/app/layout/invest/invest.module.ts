import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvestRoutingModule } from './invest-routing.module';
import { InvestComponent } from './invest.component';
import { PageHeaderModule } from './../../shared';
import {FormsModule} from '@angular/forms';
import {InvestDownloadService} from './invest-download.service';
import { FileSaverModule } from 'ngx-filesaver';
import {RecieveUtils} from './recieve-utils';
import {InvestUploadService} from './invest-upload.service';
import {HoldersDatatableComponent} from './holders-datatable/holders-datatable.component';
import {InvestService} from './invest.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
    imports: [
        CommonModule,
        InvestRoutingModule,
        PageHeaderModule,
        FileSaverModule,
        NgxDatatableModule
    ],
    declarations: [
        InvestComponent,
        HoldersDatatableComponent
    ],
    providers: [
        InvestService,
        InvestDownloadService,
        InvestUploadService,
        RecieveUtils
    ]
})
export class InvestModule {}

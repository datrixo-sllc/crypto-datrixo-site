import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvestRoutingModule } from './invest-routing.module';
import { InvestComponent } from './invest.component';
import { MaterialModule, PageHeaderModule, SharedPipesModule} from './../../shared';
import {FormsModule} from '@angular/forms';
import {InvestDownloadService} from './invest-download.service';
import { FileSaverModule } from 'ngx-filesaver';
import {RecieveUtils} from './recieve-utils';
import {InvestUploadService} from './invest-upload.service';
import {HoldersDatatableComponent} from './holders-datatable/holders-datatable.component';
import {InvestService} from './invest.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {InvestStripeService} from './invest-stripe.service';
import {HoldersDatatableResponsiveComponent} from './holders-datatable-responsive/holders-datatable-responsive.component';

@NgModule({
    imports: [
        CommonModule,
        InvestRoutingModule,
        PageHeaderModule,
        FileSaverModule,
        NgxDatatableModule,
        NgbModule,
        FormsModule,
        MaterialModule,
        SharedPipesModule,
    ],
    declarations: [
        InvestComponent,
        HoldersDatatableComponent,
        HoldersDatatableResponsiveComponent
    ],
    providers: [
        InvestService,
        InvestDownloadService,
        InvestUploadService,
        InvestStripeService,
        RecieveUtils
    ]
})
export class InvestModule {}

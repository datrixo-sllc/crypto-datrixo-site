import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvestRoutingModule } from './invest-routing.module';
import { InvestComponent } from './invest.component';
import { PageHeaderModule } from './../../shared';
import {FormsModule} from '@angular/forms';
import {InvestDownloadService} from './invest-download.service';
import { FileSaverModule } from 'ngx-filesaver';
import {RecieveUtils} from './recieve-utils';

@NgModule({
    imports: [
        CommonModule,
        InvestRoutingModule,
        PageHeaderModule,
        FileSaverModule
    ],
    declarations: [InvestComponent],
    providers: [InvestDownloadService, RecieveUtils]
})
export class InvestModule {}

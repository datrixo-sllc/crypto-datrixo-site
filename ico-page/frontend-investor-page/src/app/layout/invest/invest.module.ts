import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvestRoutingModule } from './invest-routing.module';
import { InvestComponent } from './invest.component';
import { PageHeaderModule } from './../../shared';
import {FormsModule} from '@angular/forms';
import {InvestService} from './invest.service';
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
    providers: [InvestService, RecieveUtils]
})
export class InvestModule {}

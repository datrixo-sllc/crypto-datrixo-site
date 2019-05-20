import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvestRoutingModule } from './invest-routing.module';
import { InvestComponent } from './invest.component';
import { PageHeaderModule } from './../../shared';
import {FormsModule} from '@angular/forms';
import {InvestService} from './invest.service';

@NgModule({
    imports: [
        CommonModule,
        InvestRoutingModule,
        PageHeaderModule
    ],
    declarations: [InvestComponent],
    providers: [InvestService]
})
export class InvestModule {}

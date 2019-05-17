import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvestRoutingModule } from './invest-routing.module';
import { InvestComponent } from './invest.component';
import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [
        CommonModule,
        InvestRoutingModule,
        PageHeaderModule
    ],
    declarations: [InvestComponent]
})
export class InvestModule {}

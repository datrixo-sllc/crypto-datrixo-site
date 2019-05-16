import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvestRoutingModule } from './invest-routing.module';
import { InvestComponent } from './invest.component';

@NgModule({
    imports: [CommonModule, InvestRoutingModule],
    declarations: [InvestComponent]
})
export class InvestModule {}

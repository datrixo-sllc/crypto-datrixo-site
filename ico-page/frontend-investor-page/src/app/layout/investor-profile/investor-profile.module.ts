import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvestorProfileRoutingModule } from './investor-profile-routing.module';
import { InvestorProfileComponent } from './investor-profile.component';
import { PageHeaderModule } from './../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        InvestorProfileRoutingModule,
        PageHeaderModule,
        NgbModule
    ],
    declarations: [InvestorProfileComponent]
})
export class InvestorProfileModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvestorProfileRoutingModule } from './investor-profile-routing.module';
import { InvestorProfileComponent } from './investor-profile.component';
import { PageHeaderModule } from './../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {InvestorProfileService} from './investor-profile.service';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        InvestorProfileRoutingModule,
        PageHeaderModule,
        NgbModule
    ],
    declarations: [InvestorProfileComponent],
    providers: [InvestorProfileService]
})
export class InvestorProfileModule {}

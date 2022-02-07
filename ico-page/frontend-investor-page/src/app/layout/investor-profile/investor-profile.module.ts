import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvestorProfileRoutingModule } from './investor-profile-routing.module';
import { InvestorProfileComponent } from './investor-profile.component';
import { MaterialModule, PageHeaderModule, SharedPipesModule} from './../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {InvestorProfileService} from './investor-profile.service';
import {FormsModule} from '@angular/forms';
import {HoldingDatatableResponsiveComponent} from './holding-datatable-responsive/holding-datatable-responsive.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        InvestorProfileRoutingModule,
        PageHeaderModule,
        NgbModule,
        MaterialModule,
        SharedPipesModule,
    ],
    declarations: [InvestorProfileComponent, HoldingDatatableResponsiveComponent],
    providers: [InvestorProfileService]
})
export class InvestorProfileModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvestorProfileRoutingModule } from './investor-profile-routing.module';
import { InvestorProfileComponent } from './investor-profile.component';
import { MaterialModule, SharedPipesModule} from './../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {InvestorProfileService} from './investor-profile.service';
import {FormsModule} from '@angular/forms';
import {HoldingDatatableResponsiveComponent} from './holding-datatable-responsive/holding-datatable-responsive.component';
import { PageHeaderComponent } from 'src/app/shared/modules/page-header/page-header.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        InvestorProfileRoutingModule,
        PageHeaderComponent,
        NgbModule,
        MaterialModule,
        SharedPipesModule,
        HoldingDatatableResponsiveComponent,
        InvestorProfileComponent
    ],
    providers: [InvestorProfileService]
})
export class InvestorProfileModule {}

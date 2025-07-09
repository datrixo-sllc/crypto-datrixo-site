import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyHoldingsRoutingModule } from './my-holdings-routing.module';
import { MyHoldingsComponent } from './my-holdings.component';
import { MaterialModule, PageHeaderModule, SharedPipesModule} from './../../shared';
import { FileSaverModule } from 'ngx-filesaver';
import {HoldersDatatableComponent} from './holders-datatable/holders-datatable.component';
import {MyHoldingsService} from './my-holdings.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {MyHoldingDatatableResponsiveComponent} from './my-holding-datatable-responsive/my-holding-datatable-responsive.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        MyHoldingsRoutingModule,
        PageHeaderModule,
        FileSaverModule,
        NgxDatatableModule,
        MaterialModule,
        SharedPipesModule,
        NgbModule
    ],
    declarations: [
        MyHoldingsComponent,
        HoldersDatatableComponent,
        MyHoldingDatatableResponsiveComponent
    ],
    providers: [
        MyHoldingsService
    ]
})
export class MyHoldingsModule {}

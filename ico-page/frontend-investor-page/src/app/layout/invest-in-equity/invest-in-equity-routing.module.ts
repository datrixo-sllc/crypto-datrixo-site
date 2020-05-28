import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvestInEquityComponent } from './invest-in-equity.component';

const routes: Routes = [
    {
        path: '',
        component: InvestInEquityComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InvestInEquityRoutingModule {}

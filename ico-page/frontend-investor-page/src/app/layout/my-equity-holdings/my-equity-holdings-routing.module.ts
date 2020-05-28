import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyEquityHoldingsComponent } from './my-equity-holdings.component';

const routes: Routes = [
    {
        path: '',
        component: MyEquityHoldingsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MyEquityHoldingsRoutingModule {}

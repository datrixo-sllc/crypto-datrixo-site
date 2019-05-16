import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvestorProfileComponent } from './investor-profile.component';

const routes: Routes = [
    {
        path: '',
        component: InvestorProfileComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InvestorProfileRoutingModule {}

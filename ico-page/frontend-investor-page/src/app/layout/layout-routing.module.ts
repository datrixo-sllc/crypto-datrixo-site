import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'investor-profile' },
            { path: 'investor-profile', loadChildren: './investor-profile/investor-profile.module#InvestorProfileModule' },
            { path: 'invest', loadChildren: './invest/invest.module#InvestModule' },
            { path: 'my-holdings', loadChildren: './my-holdings/my-holdings.module#MyHoldingsModule' }

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}

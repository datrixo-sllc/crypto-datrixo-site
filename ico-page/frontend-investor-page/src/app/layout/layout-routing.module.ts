import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'main-page' },
            { path: 'main-page', loadChildren: './main-page/main-page.module#MainPageModule' },
            { path: 'investor-profile', loadChildren: './investor-profile/investor-profile.module#InvestorProfileModule' },
            { path: 'invest', loadChildren: './invest/invest.module#InvestModule' },
            { path: 'invest-in-equity', loadChildren: './invest-in-equity/invest-in-equity.module#InvestInEquityModule' },
            { path: 'my-holdings', loadChildren: './my-holdings/my-holdings.module#MyHoldingsModule' },
            { path: 'my-equity-holdings', loadChildren: './my-equity-holdings/my-equity-holdings.module#MyEquityHoldingsModule' }

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import {RedirectDocumentsForDownloadComponent} from './documents-for-download/redirect-documents-for-download.component';
import {RedirectSignedDocumentsComponent} from './signed-documents/redirect-signed-documents.component';
import {RedirectAdminUsersComponent} from './admin-users/redirect-admin-users.component';

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
            { path: 'my-equity-holdings', loadChildren: './my-equity-holdings/my-equity-holdings.module#MyEquityHoldingsModule' },


            { path: 'admin-users',
                loadChildren: './admin-users/admin-users.module#AdminUsersModule' },
            {path: 'redirect-admin-users', component: RedirectAdminUsersComponent},
            { path: 'documents-for-download',
                loadChildren: './documents-for-download/documents-for-download.module#DocumentsForDownloadModule' },
            {path: 'redirect-documents-for-download', component: RedirectDocumentsForDownloadComponent},
            { path: 'signed-documents',
                loadChildren: './signed-documents/signed-documents.module#SignedDocumentsModule' },
            {path: 'redirect-signed-documents', component: RedirectSignedDocumentsComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}

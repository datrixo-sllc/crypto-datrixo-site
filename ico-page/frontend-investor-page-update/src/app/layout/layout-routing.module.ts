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
            { path: 'main-page', loadChildren: () => import('./main-page/main-page.module').then(m => m.MainPageModule) },
            { path: 'investor-profile', loadChildren: () => import('./investor-profile/investor-profile.module').then(m => m.InvestorProfileModule) },
            { path: 'invest', loadChildren: () => import('./invest/invest.module').then(m => m.InvestModule) },
            { path: 'invest-in-equity', loadChildren: () => import('./invest-in-equity/invest-in-equity.module').then(m => m.InvestInEquityModule) },
            { path: 'my-holdings', loadChildren: () => import('./my-holdings/my-holdings.module').then(m => m.MyHoldingsModule) },
            { path: 'my-equity-holdings', loadChildren: () => import('./my-equity-holdings/my-equity-holdings.module').then(m => m.MyEquityHoldingsModule) },


            { path: 'admin-users', loadChildren: () => import('./admin-users/admin-users.module').then(m => m.AdminUsersModule) },
            {path: 'redirect-admin-users', component: RedirectAdminUsersComponent},
            { path: 'documents-for-download', loadChildren: () => import('./documents-for-download/documents-for-download.module').then(m => m.DocumentsForDownloadModule) },
            {path: 'redirect-documents-for-download', component: RedirectDocumentsForDownloadComponent},
            { path: 'signed-documents', loadChildren: () => import('./signed-documents/signed-documents.module').then(m => m.SignedDocumentsModule) },
            {path: 'redirect-signed-documents', component: RedirectSignedDocumentsComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}

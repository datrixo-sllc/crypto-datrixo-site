import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import {RedirectDocumentsForDownloadComponent} from './documents-for-download/redirect-documents-for-download.component';
import {RedirectSignedDocumentsComponent} from './signed-documents/redirect-signed-documents.component';
import {RedirectAdminUsersComponent} from './admin-users/redirect-admin-users.component';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        NgbDropdownModule,
        RouterModule,
        FormsModule,
        RedirectAdminUsersComponent,
        HeaderComponent,
        RedirectDocumentsForDownloadComponent,
        RedirectSignedDocumentsComponent,
        LayoutComponent,
        SidebarComponent
    ],
    declarations: [
    ]
})
export class LayoutModule {}

/**
 * Created by Yuri Nikiforov.
 * Date: 05.10.2020
 * Time: 19:49
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule, PageHeaderModule} from '../../shared/modules';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminUsersComponent} from './admin-users.component';
import {AdminUsersRoutingModule} from './admin-users-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Utils} from '../../shared/utilites/Utils';
import {AdminUsersService} from './admin-users.service';
import {AdminUsersEditComponent} from './admin-users-edit/admin-users-edit.component';
import {AdminUsersDetailComponent} from './admin-users-detail/admin-users-detail.component';
import {UpdateAdminUsersUploadService} from './update-admin-users-upload.service';
import {AddAdminUserUploadService} from './add-admin-user-upload.service';
import {AdminUsersAddComponent} from './admin-users-add/admin-users-add.component';
import {AdminUsersDatatableResponsiveComponent} from './admin-users-datatable-responsive/admin-users-datatable-responsive.component';
import {SharedPipesModule} from '../../shared';

@NgModule({
    imports: [
        CommonModule,
        AdminUsersRoutingModule,
        PageHeaderModule,
        NgxDatatableModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        MaterialModule,
        SharedPipesModule,
        AdminUsersComponent,
        AdminUsersDatatableResponsiveComponent,
        AdminUsersDetailComponent,
        AdminUsersEditComponent,
        AdminUsersAddComponent
    ],
    providers: [
        AdminUsersService,
        UpdateAdminUsersUploadService,
        AddAdminUserUploadService,
        Utils
    ]
})
export class AdminUsersModule {
}

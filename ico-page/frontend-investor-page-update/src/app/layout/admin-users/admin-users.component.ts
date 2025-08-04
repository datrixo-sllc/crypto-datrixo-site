/**
 * Created by Yuri Nikiforov.
 * Date: 05.10.2020
 * Time: 20:05
 */
import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {routerTransition} from '../../router.animations';
import {NgxSpinnerService} from 'ngx-spinner';
import {User} from './user';
import {NavigationEnd, Router} from '@angular/router';
import {Utils} from '../../shared/utilites/Utils';
import {AdminUsersService} from './admin-users.service';
import {UserList} from './user-list';
import {UpdateAdminUsersUploadService} from './update-admin-users-upload.service';
import * as Noty from 'noty';
import { DinamicPageHeaderComponent } from 'src/app/shared/modules/page-header/dinamic-header/dinamic-page-header.component';
import { AdminUsersDatatableResponsiveComponent } from './admin-users-datatable-responsive/admin-users-datatable-responsive.component';
import { AdminUsersDetailComponent } from './admin-users-detail/admin-users-detail.component';
import { AdminUsersEditComponent } from './admin-users-edit/admin-users-edit.component';
import { AdminUsersAddComponent } from './admin-users-add/admin-users-add.component';
import { SharedPipesModule } from 'src/app/shared';

@Component({
    selector: 'app-admin-users',
    standalone: true,
    imports: [
        DinamicPageHeaderComponent, 
        CommonModule, 
        AdminUsersDatatableResponsiveComponent,
        AdminUsersDetailComponent,
        AdminUsersEditComponent,
        AdminUsersAddComponent,
        SharedPipesModule
    ],
    templateUrl: './admin-users.component.html',
    styleUrls: ['./admin-users.component.scss'],
    animations: [routerTransition()]
})
export class AdminUsersComponent implements OnInit {
    readonly header = 'Users';
    readonly headingStr1 = 'Users';
    readonly icon = 'fa-cubes';
    headingStr = this.headingStr1;
    redirect = '/redirect-admin-users';

    items: User[];
    response: UserList;
    selectedItem: User;
    itemForEdit = false;
    viewList: boolean;
    itemForAdd = false;
    username: string;

    alertTitle: string;
    confirmTitle: string;
    alertBody: string;
    confirmBody: string;

    constructor(
        private listService: AdminUsersService,
        private updateItemUploadService: UpdateAdminUsersUploadService,
        private spinner: NgxSpinnerService,
        private router: Router,
        private utils: Utils
    ) {
    }

    ngOnInit() {
        this.username = localStorage.getItem('username');
        if (!this.viewList) {
            this.viewList = true;
        }
        this.getListPage();

        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0);
        });
    }

    getListPage(): void {
        this.spinner.show();
        this.alertTitle = 'Users';
        this.listService.getList()
            .subscribe(value => {
                if (value) {
                    this.response = value as UserList;
                    this.items = this.response.users;
                    this.alertBody = 'Successfully loaded';
                    this.spinner.hide();
                    this.notyMessage(this.alertTitle, this.alertBody, 'success').show();
                }
            }, error => {
                this.alertTitle = 'Users';
                this.alertBody = 'Server error: ' + error;
                this.spinner.hide();
                this.utils.clearLocalStorage();
                this.notyMessage(this.alertTitle, this.alertBody, 'error').show();
                this.router.navigate(['/login']);
            });
    }

    notyMessage(alertTitle: string, alertBody: string, messageType: Noty.Type): Noty {
        return new Noty({
            type: messageType,
            text: '<strong>' + alertTitle + '</strong><br /> ' + alertBody,
            timeout: 3000
        });
    }

    onSelect(item: User): void {
        if (this.items.includes(item)) {
            this.selectedItem = item;
        } else {
            this.selectedItem = this.items[0];
        }
        this.headingStr = this.headingStr1 + ' / ' + this.selectedItem.username + ' / ' + this.selectedItem.userType;
        this.viewList = false;
        this.itemForEdit = true;
    }

    onEdit(id: number): void {
        const index = this.items.findIndex(value => value.id === id);
        this.selectedItem = this.items[index];
        this.headingStr = this.headingStr1 + ' / ' + this.selectedItem.username + ' / ' + this.selectedItem.userType;
        this.viewList = false;
        this.itemForEdit = true;
    }

    onCloseDetail(str: string) {
        this.viewList = true;
        this.headingStr = this.headingStr1;
        this.router.navigate([this.redirect]);
    }

    onEditDetail(str: string) {
        this.itemForEdit = true;
    }

    onAddItem(str: string) {
        this.itemForAdd = true;
    }

    onBackList(str: string) {
        this.viewList = true;
        this.itemForEdit = false;
        this.itemForAdd = false;
        this.headingStr = this.headingStr1;
        this.router.navigate([this.redirect]);
    }

    onBackItem(str: string) {
        this.itemForEdit = false;
    }

    onViewItem(id: number) {
        const index = this.items.findIndex(value => value.id === id);
        this.selectedItem = this.items[index];
        this.headingStr = this.headingStr1 + ' / ' + this.selectedItem.username + ' / ' + this.selectedItem.userType;
        this.viewList = false;
        this.itemForEdit = false;
    }

    onRefresh(str: string) {
        this.getListPage();
    }
}

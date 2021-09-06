/**
 * Created by Yuri Nikiforov.
 * Date: 05.10.2020
 * Time: 20:05
 */
import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {NgxSpinnerService} from 'ngx-spinner';
import {User} from './user';
import {NavigationEnd, Router} from '@angular/router';
import {Utils} from '../../shared/utilites/Utils';
import {AdminUsersService} from './admin-users.service';
import {UserList} from './user-list';
import {HttpResponse} from '@angular/common/http';
import {UpdateAdminUsersUploadService} from './update-admin-users-upload.service';

@Component({
    selector: 'app-admin-users',
    templateUrl: './admin-users.component.html',
    styleUrls: ['./admin-users.component.scss'],
    animations: [routerTransition()]
})
export class AdminUsersComponent implements OnInit {
    readonly header = 'Users';
    readonly headingStr1 = 'Users';
    readonly icon = 'fa-cutlery';
    headingStr = this.headingStr1;
    redirect = '/redirect-admin-users';

    items: User[];
    response: UserList;
    selectedItem: User;
    itemForEdit = false;
    viewList: boolean;
    itemForAdd = false;
    username: string;

    constructor(
        private listService: AdminUsersService,
        private updateItemUploadService: UpdateAdminUsersUploadService,
        private spinner: NgxSpinnerService,
        private _router: Router,
        private utils: Utils
    ) {
    }

    ngOnInit() {
        this.username = localStorage.getItem('username');
        if (!this.viewList) {
            this.viewList = true;
        }
        this.getListPage();

        this._router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0);
        });
    }

    getListPage(): void {
        this.spinner.show();
        this.listService.getList()
            .subscribe(value => {
                if (value) {
                    this.response = value as UserList;
                    this.items = this.response.users;
                    this.spinner.hide();
                }
            }, error => {
                this.spinner.hide();
                // alert('Server error: ' + error.message);
                this.utils.clearLocalStorage();
                this._router.navigate(['/login']);
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
        this._router.navigate([this.redirect]);
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
        this._router.navigate([this.redirect]);
    }

    onBackItem(str: string) {
        this.itemForEdit = false;
    }

    onChangeItemStatus(id: number) {

    }

    onRefresh(str: string) {
        this.getListPage();
    }
}

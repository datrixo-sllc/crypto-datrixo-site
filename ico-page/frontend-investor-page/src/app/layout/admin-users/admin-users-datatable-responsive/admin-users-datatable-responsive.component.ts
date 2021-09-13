/**
 * Created by Yuri Nikiforov.
 * Date: 22.07.2021
 * Time: 21:38
 */

import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {User} from '../user';


@Component({
    selector: 'app-admin-users-datatable-responsive',
    styleUrls: ['admin-users-datatable-responsive.component.scss'],
    templateUrl: 'admin-users-datatable-responsive.component.html',
})
export class AdminUsersDatatableResponsiveComponent implements OnInit, OnChanges {
    @Input() items: User[];
    @Output() onAddItemEmit = new EventEmitter<string>();
    @Output() onViewItemEmit = new EventEmitter<number>();
    @Output() onEditItemEmit = new EventEmitter<number>();
    @Output() onRefreshEmit = new EventEmitter<string>();


    displayedColumns: string[] = ['imageContent', 'username', 'firstName', 'lastName', 'userType', 'companyName', 'phone', 'star'];
    dataSource = new MatTableDataSource<User>();
    dataSourceLenth: number;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(public sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this.dataSource = new MatTableDataSource<User>(this.items);
        this.dataSource.paginator = this.paginator;
        this.dataSourceLenth = this.dataSource.data.length;
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.dataSource = new MatTableDataSource<User>(this.items);
        this.dataSource.paginator = this.paginator;
        this.dataSourceLenth = this.dataSource.data.length;
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    onEditItem(id: number) {
        this.onEditItemEmit.emit(id);
    }

    onItemView(id: number) {
        this.onViewItemEmit.emit(id);

    }

    onAddItem() {
        this.onAddItemEmit.emit('addItem');
    }

    onRefresh() {
        this.onRefreshEmit.emit('refresh');
    }

}



/**
 * Created by Yuri Nikiforov.
 * Date: 22.07.2021
 * Time: 21:38
 */

import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, AfterViewInit} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {User} from '../user';
import { SharedPipesModule } from '../../../shared/pipes/shared-pipes.module';


@Component({
    selector: 'app-admin-users-datatable-responsive',
    standalone: true,
    imports: [CommonModule, MatTableModule, MatPaginatorModule, MatMenuModule, MatIconModule, SharedPipesModule],
    styleUrls: ['admin-users-datatable-responsive.component.scss'],
    templateUrl: 'admin-users-datatable-responsive.component.html',
})
export class AdminUsersDatatableResponsiveComponent implements OnInit, OnChanges, AfterViewInit {
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
        this.dataSourceLenth = this.dataSource.data.length;
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.dataSource = new MatTableDataSource<User>(this.items);
        this.dataSourceLenth = this.dataSource.data.length;
        if (this.paginator) {
            this.dataSource.paginator = this.paginator;
        }
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
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



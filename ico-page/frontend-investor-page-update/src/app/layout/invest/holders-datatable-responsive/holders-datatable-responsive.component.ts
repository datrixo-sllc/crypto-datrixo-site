/**
 * Created by Yuri Nikiforov.
 * Date: 22.07.2021
 * Time: 21:38
 */

import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, AfterViewInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import {DomSanitizer} from '@angular/platform-browser';
import {HolderResponce} from '../holder-responce';


@Component({
    selector: 'app-holders-datatable-responsive',
    styleUrls: ['holders-datatable-responsive.component.scss'],
    templateUrl: 'holders-datatable-responsive.component.html',
    standalone: true,
    imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule],
})
export class HoldersDatatableResponsiveComponent implements OnInit, OnChanges, AfterViewInit {
    @Input() items: HolderResponce[];
    etherNet = 'etherscan.io';
    displayedColumns: string[] = ['address', 'createDate', 'equityTokens', 'sharePercent'];
    dataSource = new MatTableDataSource<HolderResponce>();
    dataSourceLenth: number;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(public sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this.dataSource = new MatTableDataSource<HolderResponce>(this.items);
        this.dataSourceLenth = this.dataSource.data.length;
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.dataSource = new MatTableDataSource<HolderResponce>(this.items);
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
}



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
import {DomSanitizer} from '@angular/platform-browser';
import {HolderResponce} from '../holder-responce';


@Component({
    selector: 'app-equity-holders-datatable-responsive',
    standalone: true,
    imports: [CommonModule, MatTableModule, MatPaginatorModule],
    styleUrls: ['equity-holders-datatable-responsive.component.scss'],
    templateUrl: 'equity-holders-datatable-responsive.component.html',
})
export class EquityHoldersDatatableResponsiveComponent implements OnInit, OnChanges, AfterViewInit {
    @Input() items: HolderResponce[];
    etherNet = 'etherscan.io';
    displayedColumns: string[] = ['address', 'createDate', 'sharePercent'];
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



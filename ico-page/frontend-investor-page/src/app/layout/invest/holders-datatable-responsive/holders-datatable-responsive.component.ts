/**
 * Created by Yuri Nikiforov.
 * Date: 22.07.2021
 * Time: 21:38
 */

import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {HolderResponce} from '../holder-responce';


@Component({
    selector: 'app-holders-datatable-responsive',
    styleUrls: ['holders-datatable-responsive.component.scss'],
    templateUrl: 'holders-datatable-responsive.component.html',
})
export class HoldersDatatableResponsiveComponent implements OnInit, OnChanges {
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
        this.dataSource.paginator = this.paginator;
        this.dataSourceLenth = this.dataSource.data.length;
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.dataSource = new MatTableDataSource<HolderResponce>(this.items);
        this.dataSource.paginator = this.paginator;
        this.dataSourceLenth = this.dataSource.data.length;
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}



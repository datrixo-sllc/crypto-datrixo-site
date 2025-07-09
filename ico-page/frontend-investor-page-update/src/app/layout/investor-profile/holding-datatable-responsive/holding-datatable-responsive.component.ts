/**
 * Created by Yuri Nikiforov.
 * Date: 22.07.2021
 * Time: 21:38
 */

import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {Holder} from '../holder';


@Component({
    selector: 'app-holding-datatable-responsive',
    styleUrls: ['holding-datatable-responsive.component.scss'],
    templateUrl: 'holding-datatable-responsive.component.html',
})
export class HoldingDatatableResponsiveComponent implements OnInit, OnChanges {
    @Input() items: Holder[];
    etherNet = 'etherscan.io';
    displayedColumns: string[] = ['address', 'createDate', 'paidPrice', 'initialInvest', 'equityTokens', 'sharePercent'];
    dataSource = new MatTableDataSource<Holder>();
    dataSourceLenth: number;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(public sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this.dataSource = new MatTableDataSource<Holder>(this.items);
        this.dataSource.paginator = this.paginator;
        this.dataSourceLenth = this.dataSource.data.length;
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.dataSource = new MatTableDataSource<Holder>(this.items);
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



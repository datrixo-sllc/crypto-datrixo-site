/**
 * Created by Yuri Nikiforov.
 * Date: 22.07.2021
 * Time: 21:38
 */

import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {DomSanitizer} from '@angular/platform-browser';
import {HolderResponce} from '../holder-responce';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-my-equity-holding-datatable-responsive',
    standalone: true,
    imports: [CommonModule, MatPaginatorModule, MatTableModule],
    styleUrls: ['my-equity-holding-datatable-responsive.component.scss'],
    templateUrl: 'my-equity-holding-datatable-responsive.component.html',
})
export class MyEquityHoldingDatatableResponsiveComponent implements OnInit, OnChanges {
    @Input() items: HolderResponce[];
    etherNet = 'etherscan.io';
    displayedColumns: string[] = ['asset', 'createDate', 'equityTokens', 'paidPrice', 'valuePerToken',
        'totalValueEstimate', 'docs'];
    dataSource = new MatTableDataSource<HolderResponce>();
    dataSourceLenth: number;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    modal: NgbModalRef;
    @ViewChild('modalDocsWindow') templateDocsRef: TemplateRef<any>;
    arrayDocs: string[] = [];

    constructor(
        public sanitizer: DomSanitizer,
        private modalService: NgbModal) {
    }

    ngOnInit() {
        this.items.forEach(function(item) {
            item.docs = ['Document 1', 'Document 2'];
        });
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

    onOpenDocsWindow(docs: []) {
        this.arrayDocs = docs;
        this.modal = this.modalService.open(this.templateDocsRef);
    }
}



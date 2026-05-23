/**

 * Created by Yuri Nikiforov.

 * Date: 22.07.2021

 * Time: 21:38

 */



import {

    AfterViewInit,

    Component,

    Input,

    OnChanges,

    OnInit,

    SimpleChanges,

    TemplateRef,

    ViewChild

} from '@angular/core';

import {MatTableDataSource} from '@angular/material/table';

import {MatPaginator} from '@angular/material/paginator';

import {MatPaginatorModule} from '@angular/material/paginator';

import {MatTableModule} from '@angular/material/table';

import {DomSanitizer} from '@angular/platform-browser';

import {NgbModal, NgbModalModule, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

import {CommonModule, formatDate} from '@angular/common';

import {HolderAccount} from '../holder-account';

import {SignedDocument} from '../../signed-documents/signed-document';
import {openSignedDocumentInNewWindow} from '../../signed-documents/signed-document-content.util';




@Component({

    selector: 'app-my-holding-datatable-responsive',

    standalone: true,

    imports: [CommonModule, MatPaginatorModule, MatTableModule, NgbModalModule],

    styleUrls: ['my-holding-datatable-responsive.component.scss'],

    templateUrl: 'my-holding-datatable-responsive.component.html',

})

export class MyHoldingDatatableResponsiveComponent implements OnInit, OnChanges, AfterViewInit {

    @Input() items: HolderAccount[] = [];

    etherNet = 'etherscan.io';

    displayedColumns: string[] = ['asset', 'address', 'createDate', 'initialInvest', 'paidPrice', 'docs'];

    dataSource = new MatTableDataSource<HolderAccount>([]);

    dataSourceLenth: number;



    @ViewChild(MatPaginator) paginator: MatPaginator;



    modal: NgbModalRef;

    @ViewChild('modalDocsWindow') templateDocsRef: TemplateRef<any>;

    arrayDocs: SignedDocument[] = [];



    constructor(

        public sanitizer: DomSanitizer,

        private modalService: NgbModal) {

    }



    ngOnInit(): void {

        this.refreshDataSource();

    }



    ngOnChanges(changes: SimpleChanges): void {

        if (changes['items']) {

            this.refreshDataSource();

        }

    }



    ngAfterViewInit(): void {

        this.dataSource.paginator = this.paginator;

    }



    private refreshDataSource(): void {

        const items = this.items ?? [];

        this.dataSource = new MatTableDataSource<HolderAccount>(items);

        this.dataSource.paginator = this.paginator;

        this.dataSourceLenth = this.dataSource.data.length;

    }



    applyFilter(filterValue: string) {

        this.dataSource.filter = filterValue.trim().toLowerCase();



        if (this.dataSource.paginator) {

            this.dataSource.paginator.firstPage();

        }

    }



    onOpenDocsWindow(docs: SignedDocument[] = []) {
        this.arrayDocs = docs;
        this.modal = this.modalService.open(this.templateDocsRef);
    }

    getDocLabel(doc: SignedDocument): string {
        const dateLabel = doc.loadDate ? formatDate(doc.loadDate, 'yyyy-MM-dd', 'en-US') : 'Document';
        return `${doc.docType} | ${dateLabel}`;
    }

    onViewDocument(doc: SignedDocument, event?: Event): void {
        event?.preventDefault();
        openSignedDocumentInNewWindow(doc);
    }

}



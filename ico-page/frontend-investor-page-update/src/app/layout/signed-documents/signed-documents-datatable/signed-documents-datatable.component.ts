/**
 * Created by Yuri Nikiforov.
 * Date: 05.02.2019
 * Time: 19:30
 */
import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomSanitizer} from '@angular/platform-browser';
import {SignedDocument} from '../signed-document';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SharedPipesModule } from '../../../shared/pipes/shared-pipes.module';

@Component({
    selector: 'app-signed-documents-datatable',
    standalone: true,
    imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatMenuModule, MatIconModule, MatButtonModule, SharedPipesModule],
    styleUrls: ['./signed-documents-datatable.component.scss'],
    templateUrl: './signed-documents-datatable.component.html'
})
export class SignedDocumentsDatatableComponent implements OnChanges {
    @Input() items: SignedDocument[];
    @Output() onViewItemEmit = new EventEmitter<SignedDocument>();
    @Output() onEditItemEmit = new EventEmitter<SignedDocument>();
    @Output() onAddItemEmit = new EventEmitter<string>();
    etherNet = 'etherscan.io';

    displayedColumns: string[] = ['userName', 'holderAccount', 'docType', 'loadDate', 'star'];
    dataSource = new MatTableDataSource<SignedDocument>();
    dataSourceLenth: number;


    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(public sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this.initializeDataSource();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.initializeDataSource();
        if (this.paginator) {
            this.dataSource.paginator = this.paginator;
        }
    }
  
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    applyFilter(filterValue: string | Event) {
        const value = typeof filterValue === 'string'
            ? filterValue
            : (filterValue.target as HTMLInputElement)?.value || '';

        this.dataSource.filter = value.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    onEditItem(item: SignedDocument) {
        this.onEditItemEmit.emit(item);
    }

    onItemView(item: SignedDocument) {
        this.onViewItemEmit.emit(item);

    }

    onAddItem() {
        this.onAddItemEmit.emit('addItem');
    }

    private initializeDataSource() {
        this.dataSource = new MatTableDataSource<SignedDocument>(this.items);
        this.dataSource.filterPredicate = (data: SignedDocument, filter: string): boolean => {
            const row = data as SignedDocument & { username?: string };
            const userName = (row.user?.username || row.username || '').toLowerCase();
            const loadDate = data.loadDate ? new Date(data.loadDate).toLocaleDateString().toLowerCase() : '';
            return userName.includes(filter) || loadDate.includes(filter);
        };
        this.dataSourceLenth = this.dataSource.data.length;
    }

    openTransaction(row: SignedDocument, mouseEvent: MouseEvent) {
        mouseEvent.stopPropagation();
        mouseEvent.stopImmediatePropagation();
    }
}

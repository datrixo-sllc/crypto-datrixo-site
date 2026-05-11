/**
 * Created by Yuri Nikiforov.
 * Date: 05.02.2019
 * Time: 19:30
 */
import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {DocumentForDownload} from '../document-for-download';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SharedPipesModule } from '../../../shared/pipes/shared-pipes.module';

@Component({
    selector: 'app-documents-for-download-datatable',
    standalone: true,
    imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatMenuModule, MatIconModule, MatButtonModule, SharedPipesModule],
    styleUrls: ['./documents-for-download-datatable.component.scss'],
    templateUrl: './documents-for-download-datatable.component.html'
})
export class DocumentsForDownloadDatatableComponent implements OnChanges {
    @Input() items: DocumentForDownload[];
    @Output() onViewItemEmit = new EventEmitter<number>();
    @Output() onEditItemEmit = new EventEmitter<number>();
    @Output() onAddItemEmit = new EventEmitter<string>();

    displayedColumns: string[] = ['docType', 'actual', 'startDate', 'star'];
    dataSource = new MatTableDataSource<DocumentForDownload>();
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

    onEditItem(id: number) {
        this.onEditItemEmit.emit(id);
    }

    onItemView(id: number) {
        this.onViewItemEmit.emit(id);

    }

    onAddItem() {
        this.onAddItemEmit.emit('addItem');
    }

    private initializeDataSource() {
        this.dataSource = new MatTableDataSource<DocumentForDownload>(this.items);
        this.dataSource.filterPredicate = (data: DocumentForDownload, filter: string): boolean => {
            const docType = data.docType ? data.docType.toLowerCase() : '';
            const startDate = data.startDate ? new Date(data.startDate).toLocaleDateString().toLowerCase() : '';
            return docType.includes(filter) || startDate.includes(filter);
        };
        this.dataSourceLenth = this.dataSource.data.length;
    }
}

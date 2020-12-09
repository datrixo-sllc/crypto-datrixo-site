/**
 * Created by Yuri Nikiforov.
 * Date: 05.02.2019
 * Time: 19:30
 */
import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {DomSanitizer} from '@angular/platform-browser';
import {DocumentForDownload} from '../document-for-download';

@Component({
    selector: 'app-documents-for-download-datatable',
    styleUrls: ['./documents-for-download-datatable.component.scss'],
    templateUrl: './documents-for-download-datatable.component.html'
})
export class DocumentsForDownloadDatatableComponent implements OnChanges {
    @Input() items: DocumentForDownload[];
    @Output() onSelectedItem = new EventEmitter<DocumentForDownload>();
    @Output() onAddItemEmit = new EventEmitter<string>();
    rows = [];
    temp = [];

    selected: DocumentForDownload[] = [];
    @ViewChild(DatatableComponent) table: DatatableComponent;

    constructor(public sanitizer: DomSanitizer) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.temp = this.items;
        this.rows = this.items;
        /*if (this.selected.length === 0) {
            this.selected.push(this.rows[0]);
        } else {
            const art = this.selected[0];
            this.selected = [];
            let newArt = null;
            this.rows.forEach(value => {
                if (art.id === value.id) {
                    newArt = value;
                    return;
                }
            });
            if (newArt != null) {
                this.selected.push(newArt);
            } else {
                this.selected.push(this.rows[0]);
            }
        }
        this.onSelectedArt.emit(this.selected[0]);*/
    }

    onSelect({selected}) {
        this.selected = [];
        this.selected.push(selected[0]);
        this.onSelectedItem.emit(selected[0]);
    }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        // filter our data
        // const temp = this.temp.filter(function(d) {
        //    return d.number.toLowerCase().indexOf(val) !== -1 || !val;
        // });

        // filter our data
        const temp = this.temp.filter(function (d) {
            let returnData: any;
            if (d.docType && d.docType.toLowerCase().indexOf(val) !== -1 || !val) {
                returnData = d.docType.toLowerCase().indexOf(val) !== -1 || !val;
            } else if (d.startDate && d.startDate.toLowerCase().indexOf(val) !== -1 || !val) {
                returnData = d.startDate.toLowerCase().indexOf(val) !== -1 || !val;
            }
            return returnData;
        });


        // update the rows
        this.rows = temp;
        // Whenever the filter changes, always go back to the first page
        this.table.offset = 0;
    }

    onAddItem() {
        this.onAddItemEmit.emit('addItem');
    }
}

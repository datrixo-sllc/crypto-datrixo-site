/**
 * Created by Yuri Nikiforov.
 * Date: 05.02.2019
 * Time: 19:30
 */
import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {DomSanitizer} from '@angular/platform-browser';
import {SignedDocument} from '../signed-document';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@Component({
    selector: 'app-signed-documents-datatable',
    standalone: true,
    imports: [NgxDatatableModule],
    styleUrls: ['./signed-documents-datatable.component.scss'],
    templateUrl: './signed-documents-datatable.component.html'
})
export class SignedDocumentsDatatableComponent implements OnChanges {
    @Input() items: SignedDocument[];
    @Output() onSelectedItem = new EventEmitter<SignedDocument>();
    @Output() onAddItemEmit = new EventEmitter<string>();
    rows = [];
    temp = [];

    selected: SignedDocument[] = [];
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
            if (d.username && d.username.toLowerCase().indexOf(val) !== -1 || !val) {
                returnData = d.username.toLowerCase().indexOf(val) !== -1 || !val;
            } else if (d.loadDate && d.loadDate.toLowerCase().indexOf(val) !== -1 || !val) {
                returnData = d.loadDate.toLowerCase().indexOf(val) !== -1 || !val;
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

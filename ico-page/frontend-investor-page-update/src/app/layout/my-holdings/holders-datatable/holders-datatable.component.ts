/**
 * Created by Yuri Nikiforov.
 * Date: 05.02.2019
 * Time: 19:30
 */
import {Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {HolderResponce} from '../holder-responce';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@Component({
    selector: 'app-holders-datatable',
    standalone: true,
    imports: [NgxDatatableModule],
    styleUrls: ['./holders-datatable.component.scss'],
    templateUrl: './holders-datatable.component.html'
})
export class HoldersDatatableComponent implements OnChanges {
    @Input() holders: HolderResponce[];
    rows = [];
    temp = [];

    @ViewChild('table') table: any;

    ngOnChanges(changes: SimpleChanges): void {
        this.temp = this.holders;
        this.rows = this.holders;
    }

    onDetailToggle(event) {
        // console.log('Detail Toggled', event);
    }

    toggleExpandRow(row) {
        // console.log('Toggled Expand Row!', row);
        this.table.rowDetail.toggleExpandRow(row);
    }
}

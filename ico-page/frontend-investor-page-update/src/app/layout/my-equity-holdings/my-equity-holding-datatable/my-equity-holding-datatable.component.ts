/**
 * Created by Yuri Nikiforov.
 * Date: 05.02.2019
 * Time: 19:30
 */
import {Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {HolderResponce} from '../holder-responce';

@Component({
    selector: 'app-my-equity-holding-datatable',
    styleUrls: ['./my-equity-holding-datatable.component.scss'],
    templateUrl: './my-equity-holding-datatable.component.html'
})
export class MyEquityHoldingDatatableComponent implements OnChanges {
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

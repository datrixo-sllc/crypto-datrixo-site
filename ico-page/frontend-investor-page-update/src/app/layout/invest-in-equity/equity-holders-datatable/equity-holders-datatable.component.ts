/**
 * Created by Yuri Nikiforov.
 * Date: 05.02.2019
 * Time: 19:30
 */
import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {HolderResponce} from '../holder-responce';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-equity-holders-datatable',
  standalone: true,
  imports: [NgxDatatableModule],
  styleUrls: ['./equity-holders-datatable.component.scss'],
  templateUrl: './equity-holders-datatable.component.html'
})
export class EquityHoldersDatatableComponent implements OnChanges {
  @Input() holders: HolderResponce[];
  rows = [];
  temp = [];

  ngOnChanges(changes: SimpleChanges): void {
    this.temp = this.holders;
    this.rows = this.holders;
  }
}

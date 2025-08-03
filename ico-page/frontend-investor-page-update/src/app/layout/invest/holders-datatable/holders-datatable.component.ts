/**
 * Created by Yuri Nikiforov.
 * Date: 05.02.2019
 * Time: 19:30
 */
import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {HolderResponce} from '../holder-responce';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {DatePipe, CommonModule} from '@angular/common';

@Component({
  selector: 'app-holders-datatable',
  styleUrls: ['./holders-datatable.component.scss'],
  templateUrl: './holders-datatable.component.html',
  standalone: true,
    imports: [NgxDatatableModule, DatePipe, CommonModule]
})
export class HoldersDatatableComponent implements OnChanges {
  @Input() holders: HolderResponce[];
  rows = [];
  temp = [];

  ngOnChanges(changes: SimpleChanges): void {
    this.temp = this.holders;
    this.rows = this.holders;
  }
}

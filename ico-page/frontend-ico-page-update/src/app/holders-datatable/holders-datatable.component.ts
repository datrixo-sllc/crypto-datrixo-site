/**
 * Created by Yuri Nikiforov.
 * Date: 05.02.2019
 * Time: 19:30
 */
import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {HolderResponce} from '../holder-responce';

@Component({
  selector: 'app-holders-datatable',
  standalone: false,
  styleUrls: ['./holders-datatable.component.scss'],
  templateUrl: './holders-datatable.component.html'
})
export class HoldersDatatableComponent implements OnChanges{
  @Input() holders: HolderResponce[];
  rows = [];
  temp = [];

  ngOnChanges(changes: SimpleChanges): void {
    this.temp = this.holders;
    this.rows = this.holders;
  }
}

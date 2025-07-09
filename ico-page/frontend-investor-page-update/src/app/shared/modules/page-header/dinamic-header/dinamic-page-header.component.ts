/**
 * Created by Yuri Nikiforov.
 * Date: 23.09.2019
 * Time: 18:42
 */
import {PageHeaderComponent} from '../page-header.component';
import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-dinamic-page-header',
    templateUrl: './dinamic-page-header.component.html'
})
export class DinamicPageHeaderComponent extends PageHeaderComponent {
    @Input() header: string;
    constructor() {
        super();
    }
}

import { Component, OnInit } from '@angular/core';
import {routerTransition} from '../../router.animations';

@Component({
    selector: 'app-invest',
    templateUrl: './invest.component.html',
    styleUrls: ['./invest.component.scss'],
    animations: [routerTransition()]
})
export class InvestComponent implements OnInit {
    constructor() {}

    ngOnInit() {}

    onNavigate() {
        window.open('http://datrixo.com', '_blank');
    }

    onPPMDownload() {}

    onGetInvoice() {}
}

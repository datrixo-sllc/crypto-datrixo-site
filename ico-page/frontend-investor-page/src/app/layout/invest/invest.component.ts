import { Component, OnInit } from '@angular/core';
import {routerTransition} from '../../router.animations';
import {InvestService} from './invest.service';
import {Response} from '@angular/http';
import { NgxSpinnerService } from 'ngx-spinner';
import {RecieveUtils} from './recieve-utils';

@Component({
    selector: 'app-invest',
    templateUrl: './invest.component.html',
    styleUrls: ['./invest.component.scss'],
    animations: [routerTransition()]
})
export class InvestComponent implements OnInit {
    private static readonly  FN_PPM: string = 'ppm.pdf';

    constructor(private investService: InvestService,
                private spinner: NgxSpinnerService,
                private recieveUtils: RecieveUtils) {}

    ngOnInit() {}

    onNavigate() {
        window.open('http://datrixo.com', '_blank');
    }

    onSubmitPPMDownload() {
        this.spinner.show();
        this.investService.getPPM()
            .toPromise()
            .then((response: Response) => {
                    this.recieveUtils.recieveResponseBinaryFile(response, InvestComponent.FN_PPM);
                    this.spinner.hide();
                },
                error => {
                    this.spinner.hide();
                    alert('Server pull error: ' + error.text());
                });
    }

    onGetInvoice() {}
}

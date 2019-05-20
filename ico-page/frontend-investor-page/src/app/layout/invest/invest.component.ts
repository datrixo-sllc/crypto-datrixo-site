import { Component, OnInit } from '@angular/core';
import {routerTransition} from '../../router.animations';
import {InvestService} from './invest.service';
import {Response} from '@angular/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-invest',
    templateUrl: './invest.component.html',
    styleUrls: ['./invest.component.scss'],
    animations: [routerTransition()]
})
export class InvestComponent implements OnInit {
    constructor(private investService: InvestService,
                private spinner: NgxSpinnerService) {}

    ngOnInit() {}

    onNavigate() {
        window.open('http://datrixo.com', '_blank');
    }

    onPPMDownload() {
        this.spinner.show();
        this.investService.getPPM()
            .toPromise()
            .then((response: Response) => {
                    if (response && response.json()) {
                        alert('Сервер вернул ответ:' + response.text());
                    }
                    this.spinner.hide();
                },
                error => {
                    this.spinner.hide();
                    alert('Сервер вернул ошибку: ' + error);
                });
    }

    onGetInvoice() {}
}

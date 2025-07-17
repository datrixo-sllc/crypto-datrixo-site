import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {NgxSpinnerService} from 'ngx-spinner';
import {MainPageService} from './main-page.service';
import {RespUserMainData} from './resp-user-main-data';
import * as Noty from 'noty';
import {Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../../shared/modules/page-header/page-header.component';

@Component({
    selector: 'app-main-page',
    standalone: true,
    imports: [CommonModule, PageHeaderComponent],
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
    animations: [routerTransition()]
})
export class MainPageComponent implements OnInit {

    userData: RespUserMainData = new RespUserMainData();
    alertTitle: string;
    alertBody: string;

    constructor(private spinner: NgxSpinnerService,
                private _router: Router,
                private mainPageService: MainPageService) {
    }

    ngOnInit() {
        this.spinner.show();
        this.alertTitle = 'Investor Data';
        this.mainPageService.getUserMainData()
            .toPromise()
            .then((value: any) => {
                    this.userData = value as RespUserMainData;
                    this.alertBody = 'Successfully loaded';
                    this.spinner.hide();
                    this.notyMessage(this.alertTitle, this.alertBody, 'success').show();
                },
                (reason: Error) => {
                    this.alertTitle = 'Investor Data';
                    this.alertBody = 'Server error: ' + reason;
                    this.spinner.hide();
                    this.notyMessage(this.alertTitle, this.alertBody, 'error').show();
                    this._router.navigate(['/login']);
                });

    }

    notyMessage(alertTitle: string, alertBody: string, messageType: Noty.Type): Noty {
        return new Noty({
            type: messageType,
            text: '<strong>' + alertTitle + '</strong><br /> ' + alertBody,
            timeout: 3000
        });
    }

}

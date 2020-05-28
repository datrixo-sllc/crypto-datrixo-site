import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {Response} from '@angular/http';
import { NgxSpinnerService } from 'ngx-spinner';
import {MyEquityHoldingsService} from './my-equity-holdings.service';
import {HolderResponce} from './holder-responce';
import {IcoPageResponse} from './ico-page-response';
import {interval, Subscription} from 'rxjs';
import {switchMap} from 'rxjs/internal/operators/switchMap';

@Component({
    selector: 'app-my-equity-holdings',
    templateUrl: './my-equity-holdings.component.html',
    styleUrls: ['./my-equity-holdings.component.scss'],
    animations: [routerTransition()]
})
export class MyEquityHoldingsComponent implements OnInit, OnDestroy {

    holders: HolderResponce[];
    response: IcoPageResponse;

    subscriber: Subscription;

    constructor(
        private myHoldingsService: MyEquityHoldingsService,
        private spinner: NgxSpinnerService) {}

    ngOnInit() {
        this.getIcoPage();
        this.unSubscribe();
        this.subscriber = interval(300000/*5 min*/).pipe(
            switchMap(() => this.myHoldingsService.getIcoPage())
        ).subscribe(value => {
            if (value) {
                this.response = value as IcoPageResponse;
                this.fillValues();
            }
        }, error => this.unSubscribe());
    }




    getIcoPage(): void {
        this.myHoldingsService.getIcoPage()
            .subscribe(value => {
                if (value) {
                    this.response = value as IcoPageResponse;
                    this.fillValues();
                }
            });
    }

    ngOnDestroy(): void {
        this.unSubscribe();

    }

    unSubscribe(): void {
        if (this.subscriber) {
            this.subscriber.unsubscribe();
        }
    }


    private fillValues() {
        if (this.response) {
            this.holders = this.response.holders;
        }
    }
}

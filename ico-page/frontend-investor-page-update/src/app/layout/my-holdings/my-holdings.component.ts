import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {routerTransition} from '../../router.animations';
import { NgxSpinnerService } from 'ngx-spinner';
import {MyHoldingsService} from './my-holdings.service';
import {HolderResponce} from './holder-responce';
import {IcoPageResponse} from './ico-page-response';
import {interval, Subscription} from 'rxjs';
import {switchMap} from 'rxjs/internal/operators/switchMap';
import {Router} from '@angular/router';
import { PageHeaderComponent } from '../../shared/modules/page-header/page-header.component';
import { CommonModule } from '@angular/common';
import { MyHoldingDatatableResponsiveComponent } from './my-holding-datatable-responsive/my-holding-datatable-responsive.component';
import { MyHoldingsResponce } from './my-holdings-responce';
import { HolderAccount } from './holder-account';

@Component({
    selector: 'app-my-holdings',
    standalone: true,
    imports: [PageHeaderComponent, CommonModule, MyHoldingDatatableResponsiveComponent],
    templateUrl: './my-holdings.component.html',
    styleUrls: ['./my-holdings.component.scss'],
    animations: [routerTransition()]
})
export class MyHoldingsComponent implements OnInit, OnDestroy {


    response: MyHoldingsResponce;
    holderAccounts: HolderAccount[] = [];
    subscriber: Subscription;

    constructor(
        private myHoldingsService: MyHoldingsService,
        private _router: Router,
        private spinner: NgxSpinnerService) {}

    ngOnInit() {
        this.getMyHoldings();
        this.unSubscribe();
        this.subscriber = interval(300000/*5 min*/).pipe(
            switchMap(() => this.myHoldingsService.getMyHoldings())
        ).subscribe(value => {
            if (value) {
                this.response = value as MyHoldingsResponce;
                this.fillValues();
            }
        }, error => {this.unSubscribe();
            this._router.navigate(['/login']);
        });
    }




    getMyHoldings(): void {
        this.spinner.show();
        this.myHoldingsService.getMyHoldings()
            .subscribe(value => {
                if (value) {
                    this.response = value as MyHoldingsResponce;
                    this.fillValues();
                    this.spinner.hide();
                }
            }, error => {
                this.spinner.hide();
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
            this.holderAccounts = this.response.holderAccountList;
        }
    }
}

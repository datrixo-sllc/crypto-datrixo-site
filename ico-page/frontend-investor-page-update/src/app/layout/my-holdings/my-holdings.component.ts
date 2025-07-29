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

@Component({
    selector: 'app-my-holdings',
    standalone: true,
    imports: [PageHeaderComponent, CommonModule],
    templateUrl: './my-holdings.component.html',
    styleUrls: ['./my-holdings.component.scss'],
    animations: [routerTransition()]
})
export class MyHoldingsComponent implements OnInit, OnDestroy {

    holders: HolderResponce[];
    response: IcoPageResponse;

    subscriber: Subscription;

    constructor(
        private myHoldingsService: MyHoldingsService,
        private _router: Router,
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
        }, error => {this.unSubscribe();
            this._router.navigate(['/login']);
        });
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

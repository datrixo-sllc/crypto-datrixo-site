import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {HoldersService} from './holders.service';
import {switchMap} from 'rxjs/operators';
import {IcoPageResponse} from './ico-page-response';
import {HolderResponce} from './holder-responce';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  totalSupply: string;
  sold: string;
  holdersCount: string;
  holders: HolderResponce[];
  response: IcoPageResponse;

  subscriber: Subscription;

  constructor(private holdersService: HoldersService) {}

  ngOnInit(): void {
    this.getIcoPage();
    this.unSubscribe();
    this.subscriber = interval(300000/*5 min*/).pipe(
      switchMap(() => this.holdersService.getIcoPage())
    ).subscribe(value => {
      if (value) {
        this.response = value as IcoPageResponse;
        this.fillValues();
      }
    }, error => this.unSubscribe());

  }

  getIcoPage(): void {
    this.holdersService.getIcoPage()
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
      this.totalSupply = this.response.totalSupplyTokens;
      this.sold = this.response.soldTokens;
      this.holdersCount = this.response.holdersCount;
      this.holders = this.response.holders;
    }
  }
}

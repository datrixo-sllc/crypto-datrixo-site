import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {HoldersService} from './holders.service';
import {switchMap} from 'rxjs/operators';
import {IcoPageResponce} from './ico-page-responce';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  totalSupply: string;
  sold: string;
  responce: IcoPageResponce;

  subscriber: Subscription;

  constructor(private holdersService: HoldersService) {}

  ngOnInit(): void {
    this.unSubscribe();
    this.subscriber = interval(1500).pipe(
      switchMap(() => this.holdersService.getIcoPage())
    ).subscribe(value => {
      if (value) {
        this.responce = value as IcoPageResponce;
        this.fillValues();
      }
    }, error => this.unSubscribe());

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
    if (this.responce) {
      this.totalSupply = this.responce.totalSupplyTokens;
      this.sold = this.responce.soldTokens;
    }
  }
}

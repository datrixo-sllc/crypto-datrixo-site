/**
 * Created by Yuri Nikiforov.
 * Date: 01.09.2021
 * Time: 13:40
 */

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { loadStripe } from '@stripe/stripe-js';
import {Inject} from '@angular/core';
import {APP_CONFIG} from '../../app.config';
import {IAppConfig} from '../../i-app-config';
import {Observable} from 'rxjs/internal/Observable';

export class InvestStripeService {
    private static readonly SLASH: string = '/';
    private static readonly PAYMENT: string = 'payment';
    private static readonly STRIPE: string = 'stripe';

    constructor(
        @Inject(APP_CONFIG) private config: IAppConfig,
        private http: HttpClient
    ) {}

    payment(payment: object): Observable<any> {
        return this.http
            .post(this.config.apiEndpoint + InvestStripeService.STRIPE + InvestStripeService.SLASH + InvestStripeService.PAYMENT,
                payment, {withCredentials: true});
    }

}

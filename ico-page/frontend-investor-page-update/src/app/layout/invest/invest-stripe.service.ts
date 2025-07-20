/**
 * Created by Yuri Nikiforov.
 * Date: 01.09.2021
 * Time: 13:40
 */

import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { loadStripe } from '@stripe/stripe-js';
import {Inject, Injectable} from '@angular/core';
import {APP_CONFIG} from '../../app.config';
import {IAppConfig} from '../../i-app-config';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class InvestStripeService {
    private static readonly SLASH: string = '/';
    private static readonly PAYMENT: string = 'payment';
    private static readonly STRIPE: string = 'stripe';

    constructor(
        @Inject(APP_CONFIG) private config: IAppConfig,
        private http: HttpClient
    ) {}

    payment(payment: object): Observable<any> {
        const headers = this.createHeaders();
        return this.http
            .post(this.config.apiEndpoint + InvestStripeService.STRIPE + InvestStripeService.SLASH + InvestStripeService.PAYMENT,
                payment, {headers});
    }

    private createHeaders(): HttpHeaders {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Authentication token not found');
        }
        return new HttpHeaders()
            .set('Authorization', `Bearer ${token}`);
    }

}

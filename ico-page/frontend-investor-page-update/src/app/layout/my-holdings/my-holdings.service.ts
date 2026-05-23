/**
 * Created by Yuri Nikiforov.
 * Date: 06.06.2019
 * Time: 8:59
 */
import {Inject, Injectable} from '@angular/core';
import {APP_CONFIG} from '../../app.config';
import {IAppConfig} from '../../i-app-config';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class MyHoldingsService {

    private static readonly SLASH: string = '/';
    private static readonly INVESTOR: string = 'investor';
    private static readonly HOLDINGS: string = 'holdings';
    private static readonly USER_HOLDINGS: string = 'user-holdings';
    private static readonly MY_HOLDINGS: string = 'my-holdings';

    constructor(
        @Inject(APP_CONFIG) private config: IAppConfig,
        private http: HttpClient
    ) {
    }

    getIcoPage(): Observable<any> {
        const url = this.config.apiEndpoint + MyHoldingsService.INVESTOR + MyHoldingsService.SLASH + MyHoldingsService.HOLDINGS;
        const headers = this.createHeaders();
        return this.http.get(url, {headers});
    }


    getUserHoldings(id: number): Observable<any> {
        const url = this.config.apiEndpoint + MyHoldingsService.INVESTOR + MyHoldingsService.SLASH + MyHoldingsService.USER_HOLDINGS + MyHoldingsService.SLASH + id;
        const headers = this.createHeaders();
        return this.http.get(url, {headers});
    }

    getMyHoldings(): Observable<any> {
        const url = this.config.apiEndpoint + MyHoldingsService.INVESTOR + MyHoldingsService.SLASH + MyHoldingsService.MY_HOLDINGS;
        const headers = this.createHeaders();
        return this.http.get(url, {headers});
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

/**
 * Created by Yuri Nikiforov.
 * Date: 03.06.2020
 * Time: 16:59
 */
import {Inject, Injectable} from '@angular/core';
import {APP_CONFIG} from '../../app.config';
import {IAppConfig} from '../../i-app-config';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class MainPageService {

    private static readonly SLASH: string = '/';
    private static readonly INVESTOR: string = 'investor';
    private static readonly USER_MAIN_DATA: string = 'user-main-data';

    constructor(
        @Inject(APP_CONFIG) private config: IAppConfig,
        private http: HttpClient
    ) {
    }
    getUserMainData(): Observable<any> {
        const url = this.config.apiEndpoint + MainPageService.INVESTOR + MainPageService.SLASH +
            MainPageService.USER_MAIN_DATA;

        const headers = this.createHeaders();

        return this.http
            .get(url, {headers});
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

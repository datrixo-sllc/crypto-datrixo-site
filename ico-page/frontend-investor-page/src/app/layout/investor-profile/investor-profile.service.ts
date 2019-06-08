/**
 * Created by Yuri Nikiforov.
 * Date: 06.06.2019
 * Time: 8:59
 */
import {Inject, Injectable} from '@angular/core';
import {APP_CONFIG} from '../../app.config';
import {IAppConfig} from '../../i-app-config';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {RequestUpdateUserData} from './request-update-user-data';

@Injectable()
export class InvestorProfileService {

    private static readonly SLASH: string = '/';
    private static readonly INVESTOR: string = 'investor';
    private static readonly USER_DATA: string = 'user-data';
    private static readonly UPDATE_USER_DATA: string = 'update-user-data';

    constructor(
        @Inject(APP_CONFIG) private config: IAppConfig,
        private http: HttpClient
    ) {
    }

    getUserData(): Observable<any> {
        const url = this.config.apiEndpoint + InvestorProfileService.INVESTOR + InvestorProfileService.SLASH +
            InvestorProfileService.USER_DATA;
        return this.http
            .get(url, {withCredentials: true});
    }

    updateUserData(request: RequestUpdateUserData): Observable<any> {
        const url = this.config.apiEndpoint + InvestorProfileService.INVESTOR + InvestorProfileService.SLASH +
            InvestorProfileService.UPDATE_USER_DATA;
        return this.http
            .post(url, request, {withCredentials: true});
    }

}

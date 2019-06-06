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

@Injectable()
export class MyHoldingsService {

    private static readonly SLASH: string = '/';
    private static readonly ICO: string = 'ico';
    private static readonly ICO_PAGE: string = 'ico-page';

    constructor(
        @Inject(APP_CONFIG) private config: IAppConfig,
        private http: HttpClient
    ) {
    }

    getIcoPage(): Observable<any> {
        const url = this.config.apiEndpoint + MyHoldingsService.ICO + MyHoldingsService.SLASH + MyHoldingsService.ICO_PAGE;
        return this.http.get(url);
    }

}

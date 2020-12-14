/**
 * Created by Yuri Nikiforov.
 * Date: 21.05.2019
 * Time: 1:45
 */
import {Inject, Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response, ResponseContentType} from '@angular/http';
import {IAppConfig} from '../../i-app-config';
import {APP_CONFIG} from '../../app.config';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class InvestDownloadService {
    private static URL_INVESTOR = 'investor';
    private static URL_PPM = 'ppm';
    private static URL_SUBSCR_AGRMNT = 'subscr_agrmnt';
    private static URL_SAFE_T = 'safe_t';
    private static SLASH = '/';
    private headers = new Headers({'content-type': 'application/octet-binary;charset=utf-8'});
    private options = new RequestOptions({ responseType: ResponseContentType.Blob, headers: this.headers });

    constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: Http) {
        this.options.withCredentials = true;
    }
    getPPM(): Observable<Response>  {
        const url = this.config.apiEndpoint + InvestDownloadService.URL_INVESTOR +
            InvestDownloadService.SLASH + InvestDownloadService.URL_PPM;
        return this.http
            .get(url, this.options);
    }

    getSubscrAgrmnt(): Observable<Response>  {
        const url = this.config.apiEndpoint + InvestDownloadService.URL_INVESTOR +
            InvestDownloadService.SLASH + InvestDownloadService.URL_SUBSCR_AGRMNT;
        return this.http
            .get(url, this.options);
    }

    getSafeT(): Observable<Response>  {
        const url = this.config.apiEndpoint + InvestDownloadService.URL_INVESTOR +
            InvestDownloadService.SLASH + InvestDownloadService.URL_SAFE_T;
        return this.http
            .get(url, this.options);
    }
}

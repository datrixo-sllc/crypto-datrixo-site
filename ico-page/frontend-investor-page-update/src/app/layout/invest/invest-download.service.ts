/**
 * Created by Yuri Nikiforov.
 * Date: 21.05.2019
 * Time: 1:45
 */
import {Inject, Injectable} from '@angular/core';
import {IAppConfig} from '../../i-app-config';
import {APP_CONFIG} from '../../app.config';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

@Injectable()
export class InvestDownloadService {
    private static URL_DOCUMENTS_FOR_DOWNLOAD = 'documents-for-download';
    private static URL_ACTUAL = 'actual';
    private static URL_INVESTOR = 'investor';
    private static URL_PPM = 'ppm';
    private static URL_SUBSCR_AGRMNT = 'subscr_agrmnt';
    private static URL_SAFE_T = 'safe_t';
    private static SLASH = '/';

    constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient) {}

    getActualByDocType(doctype: String): Observable<HttpResponse<Blob>>  {
        const url = this.config.apiEndpoint + InvestDownloadService.URL_DOCUMENTS_FOR_DOWNLOAD +
            InvestDownloadService.SLASH + InvestDownloadService.URL_ACTUAL +
            InvestDownloadService.SLASH + doctype;
        const headers = this.createHeaders();
        return this.http.get(url, { observe: 'response', responseType: 'blob', headers });
    }


    getPPM(): Observable<HttpResponse<Blob>>  {
        const url = this.config.apiEndpoint + InvestDownloadService.URL_INVESTOR +
            InvestDownloadService.SLASH + InvestDownloadService.URL_PPM;
        const headers = this.createHeaders();
        return this.http.get(url, { observe: 'response', responseType: 'blob', headers });
    }

    getSubscrAgrmnt(): Observable<HttpResponse<Blob>>  {
        const url = this.config.apiEndpoint + InvestDownloadService.URL_INVESTOR +
            InvestDownloadService.SLASH + InvestDownloadService.URL_SUBSCR_AGRMNT;
        const headers = this.createHeaders();
        return this.http.get(url, {observe: 'response', responseType: 'blob', headers });
    }

    getSafeT(): Observable<HttpResponse<Blob>>  {
        const url = this.config.apiEndpoint + InvestDownloadService.URL_INVESTOR +
            InvestDownloadService.SLASH + InvestDownloadService.URL_SAFE_T;
        const headers = this.createHeaders();
        return this.http.get(url, {observe: 'response', responseType: 'blob', headers });
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

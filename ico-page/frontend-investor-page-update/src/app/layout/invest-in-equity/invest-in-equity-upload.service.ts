/**
 * Created by Yuri Nikiforov.
 * Date: 24.05.2019
 * Time: 13:46
 */
import {Inject, Injectable} from '@angular/core';
import {APP_CONFIG} from '../../app.config';
import {IAppConfig} from '../../i-app-config';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';

@Injectable()
export class InvestInEquityUploadService {

    private static readonly SLASH: string = '/';
    private static readonly URL_INVESTOR: string = 'investor';
    private static readonly URL_SIGNED_AGREEMENT: string = 'signed-agreement';


    constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: Http) {
    }

    public postSignedAgreement(fileToUpload: File): Observable<any> {
        const urlSignedAgreement = InvestInEquityUploadService.URL_INVESTOR + InvestInEquityUploadService.SLASH +
            InvestInEquityUploadService.URL_SIGNED_AGREEMENT;
        return this.postFileToURL(urlSignedAgreement, fileToUpload);
    }

    private postFileToURL(partUrl: string, fileToUpload: File): Observable<any> {
        const url = this.config.apiEndpoint + partUrl;
        const formData: FormData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        const urlOptions = this.createUrlOptions();
        return this.http.post(url, formData, urlOptions);
    }

    private createUrlOptions(): RequestOptions {
        const urlHeaders = new Headers(/*{'content-type': 'multipart/form-data'}*/);
        const urlOptions = new RequestOptions({headers: urlHeaders});
        urlOptions.withCredentials = true;
        return urlOptions;
    }

}

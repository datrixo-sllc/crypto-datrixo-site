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
import {User} from './user';

@Injectable()
export class AddAdminUserUploadService {

    private static readonly URL_USER: string = 'user';
    private static readonly SLASH: string = '/';
    private static readonly CHECK: string = 'check';
    private static readonly NAME: string = 'name';

    constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: Http) {
    }

    public postItemAdd(fileToUpload: File, itemData: User): Observable<any> {
        const urlSignedAgreement = AddAdminUserUploadService.URL_USER;
        return this.postDataToURL(urlSignedAgreement, fileToUpload, itemData);
    }

    private postDataToURL(partUrl: string, fileToUpload: File, itemData: User): Observable<any> {
        const url = this.config.apiEndpoint + partUrl;
        const formData: FormData = new FormData();
        if (fileToUpload != null) {
            formData.append('file', fileToUpload, fileToUpload.name);
        }
        formData.append('itemdata', JSON.stringify(itemData));
        const urlOptions = this.createUrlOptions();
        return this.http.post(url, formData, urlOptions);
    }

    private createUrlOptions(): RequestOptions {
        const urlHeaders = new Headers(/*{'content-type': 'multipart/form-data'}*/);
        const urlOptions = new RequestOptions({headers: urlHeaders});
        urlOptions.withCredentials = true;
        return urlOptions;
    }

    getCheck(): Observable<any> {
        const url = this.config.apiEndpoint + AddAdminUserUploadService.URL_USER +
            AddAdminUserUploadService.SLASH + AddAdminUserUploadService.CHECK;
        return this.http.get(url, {withCredentials: true});
    }

    getUsername(): Observable<any> {
        const url = this.config.apiEndpoint + AddAdminUserUploadService.URL_USER +
            AddAdminUserUploadService.SLASH + AddAdminUserUploadService.NAME;
        return this.http.post(url, '', {withCredentials: true});
    }
}

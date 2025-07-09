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
import {HttpResponse} from '@angular/common/http';
import {DocumentForDownload} from './document-for-download';

@Injectable()
export class UpdateDocumentsForDownloadUploadService {

    private static readonly URL: string = 'documents-for-download';


    constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: Http) {
    }

    public putItemUpdate(itemData: DocumentForDownload): Observable<HttpResponse<Object>> {
        const urlString = UpdateDocumentsForDownloadUploadService.URL;
        return this.putDataToURL(urlString, itemData);
    }

    private putDataToURL(partUrl: string, itemData: DocumentForDownload): Observable<any> {
        const url = this.config.apiEndpoint + partUrl;
        const formData: FormData = new FormData();
        formData.append('itemdata', JSON.stringify(itemData));
        const urlOptions = this.createUrlOptions();
        return this.http.put(url, formData, urlOptions);
    }

    private createUrlOptions(): RequestOptions {
        const urlHeaders = new Headers(/*{'content-type': 'multipart/form-data'}*/);
        const urlOptions = new RequestOptions({headers: urlHeaders});
        urlOptions.withCredentials = true;
        return urlOptions;
    }

}

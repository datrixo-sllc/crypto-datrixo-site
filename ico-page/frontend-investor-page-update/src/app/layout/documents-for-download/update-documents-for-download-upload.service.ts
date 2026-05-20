/**
 * Created by Yuri Nikiforov.
 * Date: 24.05.2019
 * Time: 13:46
 */
import {Inject, Injectable} from '@angular/core';
import {APP_CONFIG} from '../../app.config';
import {IAppConfig} from '../../i-app-config';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {DocumentForDownload} from './document-for-download';

@Injectable()
export class UpdateDocumentsForDownloadUploadService {

    private static readonly URL: string = 'documents-for-download';
    private static readonly URL_UPDATE: string = 'documents-for-download/document';


    constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient) {
    }

    public putItemUpdate(itemData: DocumentForDownload): Observable<HttpResponse<Object>> {
        const urlString = UpdateDocumentsForDownloadUploadService.URL;
        return this.putDataToURL(urlString, itemData);
    }

    public putItemUpdateByDocument(itemData: DocumentForDownload): Observable<HttpResponse<Object>> {
        const urlString = UpdateDocumentsForDownloadUploadService.URL_UPDATE;
        return this.putDataToURL(urlString, itemData);
    }


    private putDataToURL(partUrl: string, itemData: DocumentForDownload): Observable<any> {
        const url = this.config.apiEndpoint + partUrl;
        const formData: FormData = new FormData();
        formData.append('itemdata', JSON.stringify(itemData));
        const headers = this.createHeaders();
        return this.http.put(url, formData, { headers });
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

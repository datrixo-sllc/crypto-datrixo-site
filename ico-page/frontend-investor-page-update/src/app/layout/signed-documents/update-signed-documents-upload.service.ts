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
import {SignedDocument} from './signed-document';

@Injectable()
export class UpdateSignedDocumentsUploadService {

    private static readonly URL: string = 'signed-documents';
    private static readonly URL_UPDATE: string = 'signed-documents/document';


    constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient) {
    }

    public putItemUpdate(itemData: SignedDocument): Observable<HttpResponse<Object>> {
        const urlString = UpdateSignedDocumentsUploadService.URL;
        return this.putDataToURL(urlString, itemData);
    }

    public putItemUpdateByDocument(itemData: SignedDocument): Observable<HttpResponse<Object>> {
        const urlString = UpdateSignedDocumentsUploadService.URL_UPDATE;
        return this.putDataToURL(urlString, itemData);
    }


    private putDataToURL(partUrl: string, itemData: SignedDocument): Observable<HttpResponse<Object>> {
        const url = this.config.apiEndpoint + partUrl;
        const formData: FormData = new FormData();
        formData.append('itemdata', JSON.stringify(itemData));
        const headers = this.createHeaders();
        // Возвращаем полный HttpResponse, чтобы в компоненте были доступны status и statusText
        return this.http.put<Object>(url, formData, {
            headers,
            observe: 'response'
        });
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

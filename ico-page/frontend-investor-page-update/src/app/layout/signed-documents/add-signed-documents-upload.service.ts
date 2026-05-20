/**
 * Created by Yuri Nikiforov.
 * Date: 24.05.2019
 * Time: 13:46
 */
import {Inject, Injectable} from '@angular/core';
import {APP_CONFIG} from '../../app.config';
import {IAppConfig} from '../../i-app-config';
import {Observable} from 'rxjs';
import {SignedDocument} from './signed-document';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class AddSignedDocumentsUploadService {

    private static readonly URL: string = 'signed-documents';
    private static readonly SLASH: string = '/';
    private static readonly BYADMIN: string = 'byadmin';
    private static readonly CHECK: string = 'check';

    constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient) {
    }

    public postItemAdd(fileToUpload: File, itemData: SignedDocument): Observable<any> {
        const urlString = AddSignedDocumentsUploadService.URL;
        return this.postDataToURL(urlString, fileToUpload, itemData);
    }

    public postItemAddByAdmin(fileToUpload: File, itemData: SignedDocument): Observable<any> {
        const urlString = AddSignedDocumentsUploadService.URL + AddSignedDocumentsUploadService.SLASH +
        AddSignedDocumentsUploadService.BYADMIN;
        return this.postDataToURL(urlString, fileToUpload, itemData);
    }

    private postDataToURL(partUrl: string, fileToUpload: File, itemData: SignedDocument): Observable<any> {
        const url = this.config.apiEndpoint + partUrl;
        const formData: FormData = new FormData();
        if (fileToUpload != null) {
            formData.append('file', fileToUpload, fileToUpload.name);
        }
        formData.append('itemdata', JSON.stringify(itemData));
        const headers = this.createHeaders();
        return this.http.post(url, formData, { headers });
    }

    getCheck(): Observable<any> {
        const url = this.config.apiEndpoint + AddSignedDocumentsUploadService.URL +
            AddSignedDocumentsUploadService.SLASH + AddSignedDocumentsUploadService.CHECK;
        const headers = this.createHeaders();
        return this.http.get(url, {headers, responseType: 'text'});
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

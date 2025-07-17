/**
 * Created by Yuri Nikiforov.
 * Date: 24.05.2019
 * Time: 13:46
 */
import {Inject, Injectable} from '@angular/core';
import {APP_CONFIG} from '../../app.config';
import {IAppConfig} from '../../i-app-config';
import {Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {SignedDocument} from './signed-document';

@Injectable()
export class UpdateSignedDocumentsUploadService {

    private static readonly URL: string = 'signed-documents';


    constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient) {
    }

    public putItemUpdate(itemData: SignedDocument): Observable<HttpResponse<Object>> {
        const urlString = UpdateSignedDocumentsUploadService.URL;
        return this.putDataToURL(urlString, itemData);
    }

    private putDataToURL(partUrl: string, itemData: SignedDocument): Observable<any> {
        const url = this.config.apiEndpoint + partUrl;
        const formData: FormData = new FormData();
        formData.append('itemdata', JSON.stringify(itemData));
        // Новый способ: просто передаём withCredentials в options
        return this.http.put(url, formData, { withCredentials: true });
    }

}

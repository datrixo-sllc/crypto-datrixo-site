/**
 * Created by Yuri Nikiforov.
 * Date: 24.05.2019
 * Time: 13:46
 */
import {Inject, Injectable} from '@angular/core';
import {APP_CONFIG} from '../../app.config';
import {IAppConfig} from '../../i-app-config';
import {Observable} from 'rxjs';
import {DocumentForDownload} from './document-for-download';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AddDocumentsForDownloadUploadService {

    private static readonly URL: string = 'documents-for-download';
    private static readonly SLASH: string = '/';
    private static readonly CHECK: string = 'check';

    constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient) {
    }

    public postItemAdd(fileToUpload: File, itemData: DocumentForDownload): Observable<any> {
        const urlString = AddDocumentsForDownloadUploadService.URL;
        return this.postDataToURL(urlString, fileToUpload, itemData);
    }

    private postDataToURL(partUrl: string, fileToUpload: File, itemData: DocumentForDownload): Observable<any> {
        const url = this.config.apiEndpoint + partUrl;
        const formData: FormData = new FormData();
        if (fileToUpload != null) {
            formData.append('file', fileToUpload, fileToUpload.name);
        }
        formData.append('itemdata', JSON.stringify(itemData));
        // Новый способ: просто передаём withCredentials в options
        return this.http.post(url, formData, { withCredentials: true });
    }

    getCheck(): Observable<any> {
        const url = this.config.apiEndpoint + AddDocumentsForDownloadUploadService.URL +
            AddDocumentsForDownloadUploadService.SLASH + AddDocumentsForDownloadUploadService.CHECK;
        return this.http.get(url, {withCredentials: true});
    }
}

/**
 * Created by Yuri Nikiforov.
 * Date: 06.06.2019
 * Time: 8:59
 */
import {Inject, Injectable} from '@angular/core';
import {APP_CONFIG} from '../../app.config';
import {IAppConfig} from '../../i-app-config';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class DocumentsForDownloadService {

    private static readonly SLASH: string = '/';
    private static readonly URL: string = 'documents-for-download';
    private static readonly LIST: string = 'list';
    private static readonly DETAIL: string = 'detail';

    constructor(
        @Inject(APP_CONFIG) private config: IAppConfig,
        private http: HttpClient
    ) {
    }

    getList(): Observable<any> {
        const url = this.config.apiEndpoint +
            DocumentsForDownloadService.URL + DocumentsForDownloadService.SLASH + DocumentsForDownloadService.LIST;
        const headers = this.createHeaders();
        return this.http.get(url, {headers});
    }

    getItemDetail(id: number): Observable<any> {
        const url = this.config.apiEndpoint + DocumentsForDownloadService.URL + DocumentsForDownloadService.SLASH + id;
        const headers = this.createHeaders();
        return this.http.get(url, {headers});
    }

    deleteItem(id: number): Observable<any> {
        const url = this.config.apiEndpoint + DocumentsForDownloadService.URL + DocumentsForDownloadService.SLASH + id;
        const headers = this.createHeaders();
        return this.http.delete(url, {headers});
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

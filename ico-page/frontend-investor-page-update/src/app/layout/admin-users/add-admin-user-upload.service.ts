/**
 * Created by Yuri Nikiforov.
 * Date: 24.05.2019
 * Time: 13:46
 */
import {Inject, Injectable} from '@angular/core';
import {APP_CONFIG} from '../../app.config';
import {IAppConfig} from '../../i-app-config';
import {Observable} from 'rxjs';
import {User} from './user';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class AddAdminUserUploadService {

    private static readonly URL_USER: string = 'user';
    private static readonly SLASH: string = '/';
    private static readonly CHECK: string = 'check';
    private static readonly NAME: string = 'name';
    private static readonly PASSWORD: string = 'password';

    constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient) {
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
        const headers = this.createHeaders();

        return this.http.post(url, formData, { headers });
    }

    // Удаляю createUrlOptions и RequestOptions/Headers как устаревшие
    getCheck(): Observable<string> {
        const url = this.config.apiEndpoint + AddAdminUserUploadService.URL_USER +
            AddAdminUserUploadService.SLASH + AddAdminUserUploadService.CHECK;
        const headers = this.createHeaders();
        return this.http.get(url, { headers, responseType: 'text' });
    }

    getUsername(): Observable<any> {
        const url = this.config.apiEndpoint + AddAdminUserUploadService.URL_USER +
            AddAdminUserUploadService.SLASH + AddAdminUserUploadService.NAME;
        const headers = this.createHeaders();
        return this.http.post(url, '', {headers});
    }
    getPassword(): Observable<any> {
        const url = this.config.apiEndpoint + AddAdminUserUploadService.URL_USER +
            AddAdminUserUploadService.SLASH + AddAdminUserUploadService.PASSWORD;
        const headers = this.createHeaders();
        return this.http.get(url, {headers});
    }

    private createHeaders(): HttpHeaders {
        const token = localStorage.getItem('token');
        let headers = new HttpHeaders();
        if (token) {
            headers = headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }
}

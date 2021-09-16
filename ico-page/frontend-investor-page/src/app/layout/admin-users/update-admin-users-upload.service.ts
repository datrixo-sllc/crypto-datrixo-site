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
import {User} from './user';
import {UserShortDto} from '../../shared/dto/user-short-dto';

@Injectable()
export class UpdateAdminUsersUploadService {

    private static readonly URL_USER: string = 'user';
    private static readonly SLASH: string = '/';

    constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: Http) {
    }

    public putItemUpdate(fileToUpload: File, itemData: User): Observable<HttpResponse<Object>> {
        const urlArts = UpdateAdminUsersUploadService.URL_USER;
        return this.putDataToURL(urlArts, fileToUpload, itemData);
    }

    private putDataToURL(partUrl: string, fileToUpload: File, itemData: User): Observable<any> {
        const url = this.config.apiEndpoint + partUrl;
        const formData: FormData = new FormData();
        if (fileToUpload != null) {
            formData.append('file', fileToUpload, fileToUpload.name);
        }
        itemData.imageContent = null;
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

/**
 * Created by Yuri Nikiforov.
 * Date: 20.05.2019
 * Time: 19:54
 */
import {Inject, Injectable} from '@angular/core';
import { APP_CONFIG } from '../app.config';
import {IAppConfig} from '../i-app-config';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class LoginService {
    private static AUTH_URL = 'login';

    constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient) {}

    login(email: string, password: string): Observable<any> {
        const url = this.config.apiEndpoint + LoginService.AUTH_URL;
        const headers = new HttpHeaders({
            'Content-Type': 'text/plain',
            'Authorization': btoa(email + ':' + password)
        });
        const body = { 'username': email, 'password': password };
        return this.http.post(url, body, { headers });
    }

    // extractData и handleErrorObservable больше не нужны с HttpClient, их можно удалить
}

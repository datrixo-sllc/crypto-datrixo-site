/**
 * Created by Yuri Nikiforov.
 * Date: 20.05.2019
 * Time: 19:54
 */
import {Inject, Injectable} from '@angular/core';
import { APP_CONFIG } from '../app.config';
import {IAppConfig} from '../i-app-config';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class LoginService {
    private static AUTH_URL = 'login';
    private static headers = new Headers({'content-type': 'text/plain'});

    constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: Http) {}

    login(email: string, password: string): Observable<Response> {
        const url = this.config.apiEndpoint + LoginService.AUTH_URL
        const headers: Headers =  new Headers({'content-type': 'text/plain'});
        headers.append('Authorization', btoa(email + ':' + password));
        const body = {'username': email, 'password': password};
        const options = new RequestOptions({ headers: headers });
        options.withCredentials = true;
        return this.http
            .post(url, body, options);
    }

    private extractData(res: Response) {
        const body = res.json();
        return body || {};
    }
    private handleErrorObservable (error: Response) {
        console.error(error.status);
        return error;
    }

}

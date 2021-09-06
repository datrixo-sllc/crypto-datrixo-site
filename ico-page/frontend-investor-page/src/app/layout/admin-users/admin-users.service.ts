/**
 * Created by Yuri Nikiforov.
 * Date: 06.06.2019
 * Time: 8:59
 */
import {Inject, Injectable} from '@angular/core';
import {APP_CONFIG} from '../../app.config';
import {IAppConfig} from '../../i-app-config';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AdminUsersService {

    private static readonly SLASH: string = '/';
    private static readonly PROVIDER: string = 'user';
    private static readonly LIST: string = 'list';
    private static readonly SHORT_LIST: string = 'shortlist';
    private static readonly SHORT: string = 'short';

    constructor(
        @Inject(APP_CONFIG) private config: IAppConfig,
        private http: HttpClient
    ) {
    }

    getList(): Observable<any> {
        const url = this.config.apiEndpoint + AdminUsersService.PROVIDER + AdminUsersService.SLASH + AdminUsersService.LIST;
        return this.http.get(url, {withCredentials: true});
    }
    getShortList(): Observable<any> {
        const url = this.config.apiEndpoint + AdminUsersService.PROVIDER + AdminUsersService.SLASH + AdminUsersService.SHORT_LIST;
        return this.http.get(url, {withCredentials: true});
    }
    getItemDetail(id: number): Observable<any> {
        const url = this.config.apiEndpoint + AdminUsersService.PROVIDER + AdminUsersService.SLASH + id;
        return this.http.get(url, {withCredentials: true});
    }

    getItemShortDetail(id: number): Observable<any> {
        const url = this.config.apiEndpoint + AdminUsersService.PROVIDER +
            AdminUsersService.SLASH + AdminUsersService.SHORT + AdminUsersService.SLASH + id;
        return this.http.get(url, {withCredentials: true});
    }

    deleteItem(id: number): Observable<any> {
        const url = this.config.apiEndpoint + AdminUsersService.PROVIDER + AdminUsersService.SLASH + id;
        return this.http.delete(url, {withCredentials: true});
    }
}

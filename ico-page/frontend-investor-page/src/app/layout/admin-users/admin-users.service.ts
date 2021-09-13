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
    private static readonly USER: string = 'user';
    private static readonly LIST: string = 'list';
    private static readonly SHORT_LIST: string = 'shortlist';
    private static readonly SHORT: string = 'short';
    private static readonly INVESTOR: string = 'investor';
    private static readonly USER_DATA: string = 'user-data';

    constructor(
        @Inject(APP_CONFIG) private config: IAppConfig,
        private http: HttpClient
    ) {
    }

    getList(): Observable<any> {
        const url = this.config.apiEndpoint + AdminUsersService.USER + AdminUsersService.SLASH + AdminUsersService.LIST;
        return this.http.get(url, {withCredentials: true});
    }
    getShortList(): Observable<any> {
        const url = this.config.apiEndpoint + AdminUsersService.USER + AdminUsersService.SLASH + AdminUsersService.SHORT_LIST;
        return this.http.get(url, {withCredentials: true});
    }
    getItemDetail(id: number): Observable<any> {
        const url = this.config.apiEndpoint + AdminUsersService.USER + AdminUsersService.SLASH + id;
        return this.http.get(url, {withCredentials: true});
    }

    getItemShortDetail(id: number): Observable<any> {
        const url = this.config.apiEndpoint + AdminUsersService.USER +
            AdminUsersService.SLASH + AdminUsersService.SHORT + AdminUsersService.SLASH + id;
        return this.http.get(url, {withCredentials: true});
    }

    deleteItem(id: number): Observable<any> {
        const url = this.config.apiEndpoint + AdminUsersService.USER + AdminUsersService.SLASH + id;
        return this.http.delete(url, {withCredentials: true});
    }

    getUserData(): Observable<any> {
        const url = this.config.apiEndpoint + AdminUsersService.INVESTOR + AdminUsersService.SLASH +
            AdminUsersService.USER_DATA;
        return this.http
            .get(url, {withCredentials: true});
    }
}

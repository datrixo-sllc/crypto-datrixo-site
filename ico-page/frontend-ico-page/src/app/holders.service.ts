/**
 * Created by Yuri Nikiforov.
 * Date: 05.02.2019
 * Time: 14:15
 */
import {Inject, Injectable} from '@angular/core';
import {APP_CONFIG} from './app.config';
import {IAppConfig} from './i-app-config';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IcoPageResponce} from './ico-page-responce';

@Injectable()
export class HoldersService {
  private static readonly SLASH: string = '/';
  private static readonly ICO: string = 'ico';
  private static readonly ICO_PAGE: string = 'ico-page';


  constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient) {
  }

  getIcoPage(): Observable<any> {
    const url = this.config.apiEndpoint + HoldersService.ICO + HoldersService.SLASH + HoldersService.ICO_PAGE;
    return this.http.get(url);
  }
}

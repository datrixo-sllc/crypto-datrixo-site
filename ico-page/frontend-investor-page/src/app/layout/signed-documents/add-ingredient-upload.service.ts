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
import {Ingredient} from './ingredient';

@Injectable()
export class AddIngredientUploadService {

    private static readonly URL_INGREDIENT: string = 'ingredient';
    private static readonly SLASH: string = '/';
    private static readonly CHECK: string = 'check';

    constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: Http) {
    }

    public postItemAdd(itemData: Ingredient): Observable<any> {
        const urlString = AddIngredientUploadService.URL_INGREDIENT;
        return this.postDataToURL(urlString, itemData);
    }

    private postDataToURL(partUrl: string, itemData: Ingredient): Observable<any> {
        const url = this.config.apiEndpoint + partUrl;
        const formData: FormData = new FormData();
        formData.append('itemdata', JSON.stringify(itemData));
        const urlOptions = this.createUrlOptions();
        return this.http.post(url, formData, urlOptions);
    }

    private createUrlOptions(): RequestOptions {
        const urlHeaders = new Headers(/*{'content-type': 'multipart/form-data'}*/);
        const urlOptions = new RequestOptions({headers: urlHeaders});
        urlOptions.withCredentials = true;
        return urlOptions;
    }

    getCheck(): Observable<any> {
        const url = this.config.apiEndpoint + AddIngredientUploadService.URL_INGREDIENT +
            AddIngredientUploadService.SLASH + AddIngredientUploadService.CHECK;
        return this.http.get(url, {withCredentials: true});
    }
}

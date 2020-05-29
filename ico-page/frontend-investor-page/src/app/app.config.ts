import {InjectionToken} from '@angular/core';
import {IAppConfig} from './i-app-config';

export let APP_CONFIG = new InjectionToken<IAppConfig>('app.config');

export const AppConfig: IAppConfig = {
    apiEndpoint: 'http://localhost:8080/'
    /*apiEndpoint: 'https://api-backend.datrixo.com/'*/
};

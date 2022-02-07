import {InjectionToken} from '@angular/core';
import {IAppConfig} from './i-app-config';

export let APP_CONFIG = new InjectionToken<IAppConfig>('app.config');

export const AppConfig: IAppConfig = {
    apiEndpoint: 'http://localhost:8080/'
    /*apiEndpoint: 'https://api2-backend.datrixo.com/'*/
    /*apiEndpoint: 'http://cryptodatrixosite-env.eba-yk3wcktq.us-east-1.elasticbeanstalk.com/'*/
};

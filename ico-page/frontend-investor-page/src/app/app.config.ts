import {InjectionToken} from '@angular/core';
import {IAppConfig} from './i-app-config';

export let APP_CONFIG = new InjectionToken<IAppConfig>('app.config');

export const AppConfig: IAppConfig = {
    apiEndpoint: 'http://localhost:8080/'
    /*apiEndpoint: 'http://ico-page-site-backend.gned73gxqz.us-east-1.elasticbeanstalk.com/'*/
};

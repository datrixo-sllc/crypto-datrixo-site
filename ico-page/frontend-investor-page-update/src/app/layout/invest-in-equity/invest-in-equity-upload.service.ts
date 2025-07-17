/**
 * Created by Yuri Nikiforov.
 * Date: 24.05.2019
 * Time: 13:46
 */
import {Inject, Injectable} from '@angular/core';
import {APP_CONFIG} from '../../app.config';
import {IAppConfig} from '../../i-app-config';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class InvestInEquityUploadService {

    private static readonly SLASH: string = '/';
    private static readonly URL_INVESTOR: string = 'investor';
    private static readonly URL_SIGNED_AGREEMENT: string = 'signed-agreement';


    constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient) {
    }

    public postSignedAgreement(fileToUpload: File): Observable<any> {
        const urlSignedAgreement = InvestInEquityUploadService.URL_INVESTOR + InvestInEquityUploadService.SLASH +
            InvestInEquityUploadService.URL_SIGNED_AGREEMENT;
        return this.postFileToURL(urlSignedAgreement, fileToUpload);
    }

    private postFileToURL(partUrl: string, fileToUpload: File): Observable<any> {
        const url = this.config.apiEndpoint + partUrl;
        const formData: FormData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        // Новый способ: просто передаём withCredentials в options
        return this.http.post(url, formData, { withCredentials: true });
    }

}

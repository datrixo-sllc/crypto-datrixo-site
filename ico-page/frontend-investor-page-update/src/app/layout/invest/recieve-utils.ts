import {Injectable} from '@angular/core';
import {FileSaverService} from 'ngx-filesaver';
import {HttpResponse} from '@angular/common/http';

@Injectable()
export class RecieveUtils {

    constructor(private fileSaverService: FileSaverService) {
    }

    public recieveResponseBinaryFile(response: HttpResponse<Blob>, fileName: string) {
        if (response && response.status === 200 && response.body?.size > 0) {
            // alert('Server pull file');
            const blob = new Blob([response.body], { type: response.headers.get('Content-Type') || 'application/octet-stream' });
            this.fileSaverService.save(blob, fileName);
        } else {
            alert('Server do not pull file');
        }
    }

    public recieveErrorBinaryFile(error: any, fileName: string) {
            if (error && error.status === 500 && error.blob() && error.blob().size > 0) {
                alert('Server pull error in file');
                this.fileSaverService.save(error.blob(), fileName);
            } else {
                alert('Server pull error without file');
            }


    }
}

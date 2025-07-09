import {Injectable} from '@angular/core';
import {FileSaverService} from 'ngx-filesaver';

@Injectable()
export class RecieveUtils {

    constructor(private fileSaverService: FileSaverService) {
    }

    public recieveResponseBinaryFile(response: any, fileName: string) {
        if (response && response.status === 200 && response.blob() && response.blob().size > 0) {
            // alert('Server pull file');
            this.fileSaverService.save(response.blob(), fileName);
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

import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {InvestDownloadService} from './invest-download.service';
import {Response} from '@angular/http';
import { NgxSpinnerService } from 'ngx-spinner';
import {RecieveUtils} from './recieve-utils';
import {InvestUploadService} from './invest-upload.service';
import {InvestService} from './invest.service';
import {HolderResponce} from './holder-responce';
import {IcoPageResponse} from './ico-page-response';
import {interval, Subscription} from 'rxjs';

@Component({
    selector: 'app-invest',
    templateUrl: './invest.component.html',
    styleUrls: ['./invest.component.scss'],
    animations: [routerTransition()]
})
export class InvestComponent implements OnInit {
    private static readonly  FN_PPM: string = 'ppm.pdf';
    fileToUpload: File = null;
    @ViewChild('uploadFile') uploadEl: ElementRef;

    totalSupply: string;
    sold: string;
    holdersCount: string;
    holders: HolderResponce[];
    response: IcoPageResponse;

    subscriber: Subscription;

    constructor(
        private investService: InvestService,
        private investDownloadService: InvestDownloadService,
        private investUploadService: InvestUploadService,
        private spinner: NgxSpinnerService,
        private recieveUtils: RecieveUtils) {}

    ngOnInit() {}

    onNavigate() {
        window.open('http://datrixo.com', '_blank');
    }

    onSubmitPPMDownload() {
        this.spinner.show();
        this.investDownloadService.getPPM()
            .toPromise()
            .then((response: Response) => {
                    this.recieveUtils.recieveResponseBinaryFile(response, InvestComponent.FN_PPM);
                    this.spinner.hide();
                },
                error => {
                    this.spinner.hide();
                    alert('Server pull error: ' + error.text());
                });
    }

    onSubmitGetInvoice() {
        this.onSubmitPPMDownload();
    }

    handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
    }

    onSubmitSignedAgreementUpload() {
        if (this.fileToUpload === null) {
            alert('File for uploading is not selected');
        } else {
            this.investUploadService.postSignedAgreement(this.fileToUpload)
                .toPromise()
                .then(value => {
                        alert('Server pull response' + value);
                        this.clearUploadParams();
                    },
                    reason => {
                        alert('Server pull error: ' + reason);
                        this.clearUploadParams();
                    });

        }
    }

    clearUploadParams() {
        this.fileToUpload = null;
        this.uploadEl.nativeElement.value = null;
    }


}

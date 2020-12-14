import {Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {InvestInEquityDownloadService} from './invest-in-equity-download.service';
import {Response} from '@angular/http';
import { NgxSpinnerService } from 'ngx-spinner';
import {RecieveUtils} from './recieve-utils';
import {InvestInEquityUploadService} from './invest-in-equity-upload.service';
import {InvestInEquityService} from './invest-in-equity.service';
import {HolderResponce} from './holder-responce';
import {IcoPageResponse} from './ico-page-response';
import {interval, Subscription} from 'rxjs';
import {switchMap} from 'rxjs/internal/operators/switchMap';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import * as Noty from 'noty';
import {Router} from '@angular/router';

@Component({
    selector: 'app-invest-in-equity',
    templateUrl: './invest-in-equity.component.html',
    styleUrls: ['./invest-in-equity.component.scss'],
    animations: [routerTransition()]
})
export class InvestInEquityComponent implements OnInit, OnDestroy {
    private static readonly  FN_PPM: string = 'ppm.pdf';
    private static readonly  FN_SUBSCR_AGRMNT: string = 'subscr_agrmnt.pdf';
    private static readonly  FN_SAFE_T: string = 'safe_t.pdf';
    fileToUpload: File = null;
    @ViewChild('uploadFile') uploadEl: ElementRef;

    totalSupply: string;
    sold: string;
    holdersCount: string;
    holders: HolderResponce[];
    response: IcoPageResponse;

    subscriber: Subscription;

    modal: NgbModalRef;
    @ViewChild('modalAlertWindow') templateAlertRef: TemplateRef<any>;
    alertTitle: string;
    alertBody: string;

    constructor(
        private investService: InvestInEquityService,
        private investDownloadService: InvestInEquityDownloadService,
        private investUploadService: InvestInEquityUploadService,
        private spinner: NgxSpinnerService,
        private recieveUtils: RecieveUtils,
        private _router: Router,
        private modalService: NgbModal) {}

    ngOnInit() {
        this.getIcoPage();
        this.unSubscribe();
        this.subscriber = interval(300000/*5 min*/).pipe(
            switchMap(() => this.investService.getIcoPage())
        ).subscribe(value => {
            if (value) {
                this.response = value as IcoPageResponse;
                this.fillValues();
            }
        }, error => {this.unSubscribe();
            this._router.navigate(['/login']);
        });
    }

    onNavigate() {
        window.open('http://datrixo.com', '_blank');
    }

    notyMessage(alertTitle: string, alertBody: string, messageType: Noty.Type): Noty {
        return new Noty({
            type: messageType,
            text: '<strong>' + alertTitle + '</strong><br /> ' + alertBody,
            timeout: 3000
        });
    }

    onSubmitPPMDownload() {
        this.spinner.show();
        this.alertTitle = 'PPM Download';
        this.investDownloadService.getPPM()
            .toPromise()
            .then((response: Response) => {
                    this.recieveUtils.recieveResponseBinaryFile(response, InvestInEquityComponent.FN_PPM);
                    this.spinner.hide();
                },
                (error: Error) => {
                    this.alertBody = 'Server pull error: ' + error.message;
                    this.spinner.hide();
                    // this.modal = this.modalService.open(this.templateAlertRef);
                    this.notyMessage(this.alertTitle, this.alertBody, 'error').show();
                });
    }

    onSubmitSubAgrmtDownload() {
        this.spinner.show();
        this.alertTitle = 'Subscription Agreement Download';
        this.investDownloadService.getSubscrAgrmnt()
            .toPromise()
            .then((response: Response) => {
                    this.recieveUtils.recieveResponseBinaryFile(response, InvestInEquityComponent.FN_SUBSCR_AGRMNT);
                    this.spinner.hide();
                },
                (error: Error) => {
                    this.alertBody = 'Server pull error: ' + error.message;
                    this.spinner.hide();
                    // this.modal = this.modalService.open(this.templateAlertRef);
                    this.notyMessage(this.alertTitle, this.alertBody, 'error').show();
                });
    }

    onSubmitSafeTDownload() {
        this.spinner.show();
        this.alertTitle = 'SAFE-T Download';
        this.investDownloadService.getSafeT()
            .toPromise()
            .then((response: Response) => {
                    this.recieveUtils.recieveResponseBinaryFile(response, InvestInEquityComponent.FN_SAFE_T);
                    this.spinner.hide();
                },
                (error: Error) => {
                    this.alertBody = 'Server pull error: ' + error.message;
                    this.spinner.hide();
                    // this.modal = this.modalService.open(this.templateAlertRef);
                    this.notyMessage(this.alertTitle, this.alertBody, 'error').show();
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
            this.alertTitle = 'Signed Agreement Upload';
            this.alertBody = 'File for uploading is not selected';
            // this.modal = this.modalService.open(this.templateAlertRef);
            this.notyMessage(this.alertTitle, this.alertBody, 'error').show();
        } else {
            this.investUploadService.postSignedAgreement(this.fileToUpload)
                .toPromise()
                .then((value: Response) => {
                        this.alertBody = 'Server pull response' + value.text();
                        // this.modal = this.modalService.open(this.templateAlertRef);
                        this.notyMessage(this.alertTitle, this.alertBody, 'success').show();
                        this.clearUploadParams();
                    },
                    (reason: Error) => {
                        this.alertBody = 'Server pull error: ' + reason.message;
                        // this.modal = this.modalService.open(this.templateAlertRef);
                        this.notyMessage(this.alertTitle, this.alertBody, 'error').show();
                        this.clearUploadParams();
                    });

        }
    }

    clearUploadParams() {
        this.fileToUpload = null;
        this.uploadEl.nativeElement.value = null;
    }


    getIcoPage(): void {
        this.investService.getIcoPage()
            .subscribe(value => {
                if (value) {
                    this.response = value as IcoPageResponse;
                    this.fillValues();
                }
            });
    }

    ngOnDestroy(): void {
        this.unSubscribe();

    }

    unSubscribe(): void {
        if (this.subscriber) {
            this.subscriber.unsubscribe();
        }
    }


    private fillValues() {
        if (this.response) {
            this.totalSupply = this.response.totalSupplyTokens;
            this.sold = this.response.soldEquity;
            this.holdersCount = this.response.holdersCount;
            this.holders = this.response.holders;
        }
    }
}

import {Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {routerTransition} from '../../router.animations';
import {InvestDownloadService} from './invest-download.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {RecieveUtils} from './recieve-utils';
import {InvestUploadService} from './invest-upload.service';
import {InvestService} from './invest.service';
import {HolderResponce} from './holder-responce';
import {IcoPageResponse} from './ico-page-response';
import {interval, Subscription} from 'rxjs';
import {switchMap} from 'rxjs/internal/operators/switchMap';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import * as Noty from 'noty';
import {Router} from '@angular/router';
import {InvestStripeService} from './invest-stripe.service';
import {environment} from 'src/environments/environment';
import {loadStripe} from '@stripe/stripe-js';
import {PageHeaderComponent} from '../../shared/modules/page-header/page-header.component';
import {
    HoldersDatatableResponsiveComponent
} from './holders-datatable-responsive/holders-datatable-responsive.component';
import {HttpResponse} from "@angular/common/http";

@Component({
    selector: 'app-invest',
    standalone: true,
    templateUrl: './invest.component.html',
    styleUrls: ['./invest.component.scss'],
    animations: [routerTransition()],
    imports: [PageHeaderComponent, CommonModule, HoldersDatatableResponsiveComponent],
})
export class InvestComponent implements OnInit, OnDestroy {
    private static readonly FN_PPM: string = 'ppm.pdf';
    private static readonly FN_SUBSCR_AGRMNT: string = 'subscr_agrmnt.pdf';
    private static readonly FN_SAFE_T: string = 'safe_t.pdf';
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

    selectedDRXNum = 4;

    stripePromise = loadStripe(environment.stripe);

    constructor(
        private investService: InvestService,
        private investDownloadService: InvestDownloadService,
        private investUploadService: InvestUploadService,
        private investStripeService: InvestStripeService,
        private spinner: NgxSpinnerService,
        private recieveUtils: RecieveUtils,
        private _router: Router,
        private modalService: NgbModal
    ) {
    }

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
        }, error => {
            this.unSubscribe();
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
        this.investDownloadService.getActualByDocType('PPM')
            .pipe()
            .subscribe({
                next: (response: HttpResponse<Blob>) => {
                    this.recieveUtils.recieveResponseBinaryFile(response, InvestComponent.FN_PPM);
                    this.spinner.hide();
                },
                error: (error: Error) => {
                    this.alertBody = 'Server pull error: ' + error.message;
                    this.spinner.hide();
                    // this.modal = this.modalService.open(this.templateAlertRef);
                    this.notyMessage(this.alertTitle, this.alertBody, 'error').show();
                }
            });
    }

    onSubmitSubAgrmtDownload() {
        this.spinner.show();
        this.alertTitle = 'Subscription Agreement Download';
        this.investDownloadService.getSubscrAgrmnt()
            .pipe()
            .subscribe({
                next: (response: HttpResponse<Blob>) => {
                    this.recieveUtils.recieveResponseBinaryFile(response, InvestComponent.FN_SUBSCR_AGRMNT);
                    this.spinner.hide();
                },
                error: (error: Error) => {
                    this.alertBody = 'Server pull error: ' + error.message;
                    this.spinner.hide();
                    // this.modal = this.modalService.open(this.templateAlertRef);
                    this.notyMessage(this.alertTitle, this.alertBody, 'error').show();
                }
            });
    }

    onSubmitSafeTDownload() {
        this.spinner.show();
        this.alertTitle = 'SAFE-T Download';
        this.investDownloadService.getSafeT()
            .pipe()
            .subscribe({
                next: (response: HttpResponse<Blob>) => {
                    this.recieveUtils.recieveResponseBinaryFile(response, InvestComponent.FN_SAFE_T);
                    this.spinner.hide();
                },
                error: (error: Error) => {
                    this.alertBody = 'Server pull error: ' + error.message;
                    this.spinner.hide();
                    // this.modal = this.modalService.open(this.templateAlertRef);
                    this.notyMessage(this.alertTitle, this.alertBody, 'error').show();
                }
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
            this.alertTitle = 'Upload Your Signed Doc';
            this.alertBody = 'File for uploading is not selected';
            // this.modal = this.modalService.open(this.templateAlertRef);
            this.notyMessage(this.alertTitle, this.alertBody, 'error').show();
        } else {
            this.spinner.show();
            this.investUploadService.postSignedAgreement(this.fileToUpload)
                .toPromise()
                .then((value: any) => {
                        // this.alertBody = 'Server pull response' + value.text();
                        this.alertTitle = 'Success';
                        this.alertBody = 'A Doc was uploaded successfully';
                        this.spinner.hide();
                        // this.modal = this.modalService.open(this.templateAlertRef);
                        this.notyMessage(this.alertTitle, this.alertBody, 'success').show();
                        this.clearUploadParams();
                    },
                    (reason: Error) => {
                        this.alertBody = 'Server pull error: ' + reason.message;
                        this.spinner.hide();
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
            this.sold = this.response.soldTokens;
            this.holdersCount = this.response.holdersCount;
            this.holders = this.response.holders;
        }
    }

    onSubmitGetDRX() {
        let name: string;
        let amount: number;

        switch (this.selectedDRXNum) {
            case 4: {
                name = '4 DRX';
                amount = 60000;
                break;
            }
            case 8: {
                name = '8 DRX';
                amount = 120000;
                break;
            }
            case 16: {
                name = '16 DRX';
                amount = 240000;
                break;
            }
            case 32: {
                name = '32 DRX';
                amount = 480000;
                break;
            }
            case 40: {
                name = '40 DRX';
                amount = 600000;
                break;
            }

        }


        this.pay(name, amount);
    }


    async pay(name: string, amount: number): Promise<void> {
        // here we create a payment object
        const payment = {
            name: name,
            currency: 'usd',
            // amount on cents *10 => to be on dollar
            amount: amount,
            quantity: '1',
            cancelUrl: `${environment.serverUrl}#/invest`,
            successUrl: `${environment.serverUrl}#/invest`,
        };

        const stripe = await this.stripePromise;
        this.spinner.show();
        this.alertTitle = 'Stripe Payment';
        this.investStripeService.payment(payment)
            .subscribe((data: any) => {
                // Use stripe to redirect To Checkout page of Stripe platform
                this.spinner.hide();
                stripe.redirectToCheckout({
                    sessionId: data.id,
                });
            }, (error: Error) => {
                this.spinner.hide();
                this.alertBody = 'Server pull error: ' + error.message;
                this.notyMessage(this.alertTitle, this.alertBody, 'error').show();
            });
    }
}

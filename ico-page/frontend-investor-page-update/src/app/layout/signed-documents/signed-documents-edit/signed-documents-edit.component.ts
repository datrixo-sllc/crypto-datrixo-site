import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges
} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {NgxSpinnerService} from 'ngx-spinner';
import {DomSanitizer} from '@angular/platform-browser';
import {SignedDocument} from '../signed-document';
import {SignedDocumentsService} from '../signed-documents.service';
import { MyHoldingsService } from '../../my-holdings/my-holdings.service';
import { HolderResponce } from '../../my-holdings/holder-responce';
import {UpdateSignedDocumentsUploadService} from '../update-signed-documents-upload.service';
import {AddSignedDocumentsUploadService} from '../add-signed-documents-upload.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { APP_CONFIG, AppConfig } from '../../../app.config';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

/**
 * Created by Yuri Nikiforov.
 * Date: 22.10.2019
 * Time: 20:45
 */

@Component({
    selector: 'app-signed-documents-edit',
    standalone: true,
    imports: [
        FormsModule,
        CommonModule,
        MatDatepickerModule,
        MatInputModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatIconModule,
        MatButtonModule
    ],
    providers: [
        MyHoldingsService,
        { provide: APP_CONFIG, useValue: AppConfig }
    ],
    templateUrl: './signed-documets-edit.component.html',
    styleUrls: ['./signed-documents-edit.component.scss']
})
export class SignedDocumentsEditComponent implements OnInit, OnChanges {
    @Input() id: number;
    @Output() backListEmit = new EventEmitter<string>();
    @Output() backItemEmit = new EventEmitter<string>();


    requestItemData: SignedDocument;
    username: string;
    selectedDate: Date;
    minDate: Date;
    maxDate: Date;
    startDate: Date;

    // Modal window for holdings list
    showHoldingsModal: boolean = false;
    holdingsData: HolderResponce[] = [];
    loadingHoldings: boolean = false;
    etherNet = 'etherscan.io';

    constructor(
        private updateItemUploadService: UpdateSignedDocumentsUploadService,
        private addItemUploadService: AddSignedDocumentsUploadService,
        private listService: SignedDocumentsService,
        private spinner: NgxSpinnerService,
        private sanitizer: DomSanitizer,
        private myHoldingsService: MyHoldingsService
    ) {
    }

    ngOnInit(): void {
        this.initDateLimits();
        this.username = localStorage.getItem('username');
    }

    initDateLimits(): void {
        const today = new Date();
        const currentYear = today.getFullYear();
        // Минимальная дата - 50 лет назад
        this.minDate = new Date(currentYear - 50, 0, 1);
        // Максимальная дата - сегодня
        this.maxDate = today;
        // Начальная дата для календаря
        this.startDate = new Date(currentYear - 10, 0, 1);
    }


    ngOnChanges(changes: SimpleChanges): void {
        this.init();
    }

    init() {
        this.clearUploadParams();
        if (this.id) {
            this.spinner.show();
            this.listService.getItemDetail(this.id)
                .subscribe(value => {
                    this.requestItemData = value as SignedDocument;
                    this.selectedDate = this.requestItemData.loadDate;
                    if (!this.requestItemData.holderAccount) {
                        this.requestItemData.holderAccount = new HolderResponce();
                        this.requestItemData.holderAccount.address = '';
                    }
                    this.spinner.hide();
                }, error => {
                    this.spinner.hide();
                });
        }
    }

    onSubmitItemUpdate() {
        if (!this.requestItemData || !this.requestItemData.docType
            || !this.requestItemData.loadDate
        ) {
            alert('Fill form, please');
        } else {
            this.requestItemData.loadDate = this.selectedDate;
            this.spinner.show();
            this.updateItemUploadService.putItemUpdateByDocument(this.requestItemData)
                .toPromise()
                .then((value: HttpResponse<Object>) => {
                        this.spinner.hide();
                        alert('Server pull response: status: ' + value.status +
                            ' status text: ' + value.statusText);
                        this.clearUploadParams();
                        this.onBackList();
                    },
                    (reason: Error) => {
                        this.spinner.hide();
                        alert('Server pull error: ' + reason.message);
                        this.clearUploadParams();
                    });

        }
    }

    clearUploadParams() {
        this.requestItemData = new SignedDocument();
        // Гарантируем, что holderAccount всегда инициализирован,
        // чтобы избежать ошибок вида "Cannot read properties of undefined (reading 'address')" в шаблоне
        if (!this.requestItemData.holderAccount) {
            this.requestItemData.holderAccount = new HolderResponce();
            this.requestItemData.holderAccount.address = '';
        }
    }


    onBackList() {
        this.backListEmit.emit('backList');
    }

    onBackItem() {
        this.backItemEmit.emit('backItem');
    }

    /**
     * Opens modal window with holdings list
     */
    openHoldingsModal() {
        console.log('Opening holdings modal window');
        console.log('requestItemData:', this.requestItemData);
        this.showHoldingsModal = true;
        this.loadHoldings();
    }

    /**
     * Closes modal window
     */
    closeHoldingsModal() {
        this.showHoldingsModal = false;
        this.holdingsData = [];
    }

    /**
     * Loads holdings data via getUserHoldings
     */
    loadHoldings() {
        // Check if data exists
        if (!this.requestItemData) {
            alert('Document data not loaded');
            return;
        }

        if (!this.requestItemData.user) {
            alert('User information not found in document');
            return;
        }

        if (!this.requestItemData.user.id) {
            alert('User ID not found');
            return;
        }

        const docUserId = this.requestItemData.user.id;
        console.log('Loading holdings for user with ID:', docUserId);

        this.loadingHoldings = true;
        this.myHoldingsService.getUserHoldings(docUserId)
            .subscribe({
                next: (response: any) => {
                    console.log('Response from getUserHoldings:', response);
                    this.holdingsData = response.holderAccountList;
                    console.log('Processed holdings data:', this.holdingsData);
                    this.loadingHoldings = false;
                },
                error: (error: any) => {
                    console.error('Error loading holdings:', error);
                    alert('Error loading data: ' + (error.message || 'Unknown error'));
                    this.loadingHoldings = false;
                }
            });
    }


    /**
     * Selects item from holdings list and fills docType field
     */
    selectHolding(item: HolderResponce) {
        // Use address from HolderResponce
        if (item && item.address) {
            if (this.requestItemData) {
                this.requestItemData.holderAccount = item;
            }
        } else {
            alert('Address not found in selected item');
            return;
        }

        // Close modal window
        this.closeHoldingsModal();
    }

    onDateChange(event: any): void {
        if (event.value) {
            this.selectedDate = event.value;
            this.requestItemData.loadDate = event.value;
        }
    }
}

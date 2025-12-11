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
import {UpdateSignedDocumentsUploadService} from '../update-signed-documents-upload.service';
import {AddSignedDocumentsUploadService} from '../add-signed-documents-upload.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { APP_CONFIG, AppConfig } from '../../../app.config';

/**
 * Created by Yuri Nikiforov.
 * Date: 22.10.2019
 * Time: 20:45
 */

@Component({
    selector: 'app-signed-documents-edit',
    standalone: true,
    imports: [FormsModule, CommonModule],
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
    
    // Модальное окно для списка holdings
    showHoldingsModal: boolean = false;
    holdingsData: any[] = [];
    loadingHoldings: boolean = false;

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
        this.username = localStorage.getItem('username');
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
            this.spinner.show();
            this.updateItemUploadService.putItemUpdate(this.requestItemData)
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

    }


    onBackList() {
        this.backListEmit.emit('backList');
    }

    onBackItem() {
        this.backItemEmit.emit('backItem');
    }

    /**
     * Открывает модальное окно со списком holdings
     */
    openHoldingsModal() {
        this.showHoldingsModal = true;
        this.loadHoldings();
    }

    /**
     * Закрывает модальное окно
     */
    closeHoldingsModal() {
        this.showHoldingsModal = false;
        this.holdingsData = [];
    }

    /**
     * Загружает данные holdings через getUserHoldings
     */
    loadHoldings() {
        const docUsername = this.requestItemData.username;
        
        if (!docUsername) {
            alert('Не удалось определить username');
            return;
        }

        this.loadingHoldings = true;
        this.myHoldingsService.getUserHoldings(docUsername)
            .subscribe({
                next: (response: any) => {
                    // Обрабатываем ответ - может быть массив или объект с массивом
                    if (Array.isArray(response)) {
                        this.holdingsData = response;
                    } else if (response && Array.isArray(response.holdings)) {
                        this.holdingsData = response.holdings;
                    } else if (response && Array.isArray(response.data)) {
                        this.holdingsData = response.data;
                    } else {
                        // Если структура другая, пытаемся преобразовать
                        this.holdingsData = response ? [response] : [];
                    }
                    this.loadingHoldings = false;
                },
                error: (error: any) => {
                    console.error('Ошибка загрузки holdings:', error);
                    alert('Ошибка загрузки данных: ' + (error.message || 'Неизвестная ошибка'));
                    this.loadingHoldings = false;
                }
            });
    }

    
    /**
     * Выбирает элемент из списка holdings и заполняет поле docType
     */
    selectHolding(item: any) {
        // Пытаемся найти адрес или идентификатор в объекте
        let selectedValue = '';
        
        if (item.address) {
            selectedValue = item.address;
        } else if (item.transactionAddress) {
            selectedValue = item.transactionAddress;
        } else if (item.id) {
            selectedValue = item.id.toString();
        } else if (typeof item === 'string') {
            selectedValue = item;
        } else {
            // Если структура сложная, преобразуем в JSON строку
            selectedValue = JSON.stringify(item);
        }
        
        // Заполняем поле docType
        if (this.requestItemData) {
            this.requestItemData.docType = selectedValue;
        }
        
        // Закрываем модальное окно
        this.closeHoldingsModal();
    }

}

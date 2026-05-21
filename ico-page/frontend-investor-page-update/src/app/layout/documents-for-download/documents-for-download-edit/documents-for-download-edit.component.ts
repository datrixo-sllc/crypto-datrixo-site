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
import {DocumentForDownload} from '../document-for-download';
import {DocumentsForDownloadService} from '../documents-for-download.service';
import {UpdateDocumentsForDownloadUploadService} from '../update-documents-for-download-upload.service';
import {AddDocumentsForDownloadUploadService} from '../add-documents-for-download-upload.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
    selector: 'app-documents-for-download-edit',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatDatepickerModule,
        MatInputModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatIconModule,
        MatButtonModule
    ],
    templateUrl: './documets-for-download-edit.component.html',
    styleUrls: ['./documents-for-download-edit.component.scss']
})
export class DocumentsForDownloadEditComponent implements OnInit, OnChanges {
    @Input() id: number;
    @Output() backListEmit = new EventEmitter<string>();
    @Output() backItemEmit = new EventEmitter<string>();


    requestItemData: DocumentForDownload;
    username: string;
    selectedDate: Date;
    minDate: Date;
    maxDate: Date;
    startDate: Date;

    constructor(
        private updateItemUploadService: UpdateDocumentsForDownloadUploadService,
        private addItemUploadService: AddDocumentsForDownloadUploadService,
        private listService: DocumentsForDownloadService,
        private spinner: NgxSpinnerService,
        private sanitizer: DomSanitizer
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
                    this.requestItemData = value as DocumentForDownload;
                    this.selectedDate = this.requestItemData.startDate;
                    this.spinner.hide();
                }, error => {
                    this.spinner.hide();
                });
        }
    }

    onSubmitItemUpdate() {
        if (!this.requestItemData || !this.requestItemData.docType
            || !this.requestItemData.startDate
        ) {
            alert('Fill form, please');
        } else {
            this.requestItemData.startDate = this.selectedDate;
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
        this.requestItemData = new DocumentForDownload();

    }


    onBackList() {
        this.backListEmit.emit('backList');
    }

    onBackItem() {
        this.backItemEmit.emit('backItem');
    }

    onDateChange(event: any): void {
        if (event.value) {
            this.selectedDate = event.value;
            this.requestItemData.startDate = event.value;
        }
    }

}

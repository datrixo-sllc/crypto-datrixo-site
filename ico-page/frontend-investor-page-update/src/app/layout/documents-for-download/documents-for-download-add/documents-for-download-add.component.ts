import {
    AfterViewInit,
    Component, ElementRef,
    EventEmitter,
    OnInit,
    Output, ViewChild
} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {NgxSpinnerService} from 'ngx-spinner';
import {DomSanitizer} from '@angular/platform-browser';
import {DocumentForDownload} from '../document-for-download';
import {DocumentsForDownloadService} from '../documents-for-download.service';
import {UpdateDocumentsForDownloadUploadService} from '../update-documents-for-download-upload.service';
import {AddDocumentsForDownloadUploadService} from '../add-documents-for-download-upload.service';
import {Router} from '@angular/router';
import {Utils} from '../../../shared/utilites/Utils';
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
    selector: 'app-documents-for-download-add',
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
    templateUrl: './documents-for-download-add.component.html',
    styleUrls: ['./documents-for-download-add.component.scss']
})
export class DocumentsForDownloadAddComponent implements OnInit, AfterViewInit {
    @Output() backListEmit = new EventEmitter<string>();

    fileToUpload: File = null;
    imgSrc: any = null;
    @ViewChild('uploadFile') uploadEl: ElementRef;

    requestItemData: DocumentForDownload = this.createDefaultRequestItemData();
    selectedDate: Date;
    minDate: Date;
    maxDate: Date;
    startDate: Date;

    constructor(
        private updateItemUploadService: UpdateDocumentsForDownloadUploadService,
        private addItemUploadService: AddDocumentsForDownloadUploadService,
        private listService: DocumentsForDownloadService,
        private spinner: NgxSpinnerService,
        private sanitizer: DomSanitizer,
        private _router: Router,
        private utils: Utils
    ) {
    }

    ngAfterViewInit(): void {
        if (this.uploadEl && this.uploadEl.nativeElement) {
            this.uploadEl.nativeElement.value = null;
        }
    }

    ngOnInit(): void {
        this.initDateLimits();
        this.initUploadParams();
        this.spinner.show();
        this.addItemUploadService.getCheck()
            .subscribe(value => {
                if (value) {
                    this.spinner.hide();
                }
            }, error => {
                this.spinner.hide();
                // alert('Server error: ' + error.message);
                this.utils.clearLocalStorage();
                this._router.navigate(['/login']);
            });
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

    handleFileInput(files: FileList) {
        if (files.item(0).size > 1000000) {
            alert('Image file must be less then 1Mb');
            this.uploadEl.nativeElement.value = null;
            return;
        }
        this.fileToUpload = files.item(0);
        const reader = new FileReader();
        // @ts-ignore
        reader.onload = ev => this.imgSrc = reader.result;
        reader.readAsDataURL(this.fileToUpload);
    }

    onSubmitItemAdd() {
        const conf = confirm('Add Item?');
        if (conf) {
            if (this.fileToUpload === null) {
                alert('Load file, please');
            } else if (!this.requestItemData || !this.requestItemData.docType
                || !this.requestItemData.startDate
            ) {
                alert('Fill form, please');
            } else {
                // Используем выбранную дату
                this.requestItemData.startDate = this.selectedDate;
                this.spinner.show();
                this.addItemUploadService.postItemAdd(this.fileToUpload, this.requestItemData)
                    .toPromise()
                    .then((value: HttpResponse<Object>) => {
                            this.spinner.hide();
                            alert('Document is added');
                            /*alert('Server pull response: status: ' + value.status +
                                ' status text: ' + value.statusText +
                                ' location: ' + value.headers.get('Location'));*/
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
    }

    clearUploadParams() {
        this.fileToUpload = null;
        this.imgSrc = null;
        this.uploadEl.nativeElement.value = null;
        this.requestItemData = this.createDefaultRequestItemData();
    }

    initUploadParams() {
        this.fileToUpload = null;
        this.imgSrc = null;
        this.requestItemData = this.createDefaultRequestItemData();
        this.selectedDate = new Date;
    }

    private createDefaultRequestItemData(): DocumentForDownload {
        const itemData = new DocumentForDownload();
        itemData.docType = 'SUBSCRIPTION_AGREEMENT';
        itemData.startDate = new Date();
        itemData.actual = true;
        itemData.content = null;
        return itemData;
    }

    onBackList() {
        this.backListEmit.emit('backList');
    }

    onDateChange(event: any): void {
        if (event.value) {
            this.selectedDate = event.value;
            this.requestItemData.startDate = event.value;
        }
    }
}

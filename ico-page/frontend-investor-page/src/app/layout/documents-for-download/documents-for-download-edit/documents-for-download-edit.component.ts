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

/**
 * Created by Yuri Nikiforov.
 * Date: 22.10.2019
 * Time: 20:45
 */

@Component({
    selector: 'app-documents-for-download-edit',
    templateUrl: './documets-for-download-edit.component.html',
    styleUrls: ['./documents-for-download-edit.component.scss']
})
export class DocumentsForDownloadEditComponent implements OnInit, OnChanges {
    @Input() id: number;
    @Output() backListEmit = new EventEmitter<string>();
    @Output() backItemEmit = new EventEmitter<string>();


    requestItemData: DocumentForDownload;

    username: string;

    constructor(
        private updateItemUploadService: UpdateDocumentsForDownloadUploadService,
        private addItemUploadService: AddDocumentsForDownloadUploadService,
        private listService: DocumentsForDownloadService,
        private spinner: NgxSpinnerService,
        private sanitizer: DomSanitizer
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
                    this.requestItemData = value as DocumentForDownload;
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
        this.requestItemData = new DocumentForDownload();

    }


    onBackList() {
        this.backListEmit.emit('backList');
    }

    onBackItem() {
        this.backItemEmit.emit('backItem');
    }

}

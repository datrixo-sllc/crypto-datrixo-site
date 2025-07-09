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

/**
 * Created by Yuri Nikiforov.
 * Date: 22.10.2019
 * Time: 20:45
 */

@Component({
    selector: 'app-documents-for-download-add',
    templateUrl: './documents-for-download-add.component.html',
    styleUrls: ['./documents-for-download-add.component.scss']
})
export class DocumentsForDownloadAddComponent implements OnInit, AfterViewInit {
    @Output() backListEmit = new EventEmitter<string>();

    fileToUpload: File = null;
    imgSrc: any = null;
    @ViewChild('uploadFile') uploadEl: ElementRef;

    requestItemData: DocumentForDownload;

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
        this.uploadEl.nativeElement.value = null;
    }

    ngOnInit(): void {
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
        this.requestItemData = new DocumentForDownload();
    }

    initUploadParams() {
        this.fileToUpload = null;
        this.imgSrc = null;
        this.requestItemData = new DocumentForDownload();
    }

    onBackList() {
        this.backListEmit.emit('backList');
    }
}

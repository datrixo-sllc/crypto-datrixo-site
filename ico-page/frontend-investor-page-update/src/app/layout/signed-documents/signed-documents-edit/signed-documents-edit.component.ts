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
import {UpdateSignedDocumentsUploadService} from '../update-signed-documents-upload.service';
import {AddSignedDocumentsUploadService} from '../add-signed-documents-upload.service';
import { FormsModule } from '@angular/forms';

/**
 * Created by Yuri Nikiforov.
 * Date: 22.10.2019
 * Time: 20:45
 */

@Component({
    selector: 'app-signed-documents-edit',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './documets-for-download-edit.component.html',
    styleUrls: ['./signed-documents-edit.component.scss']
})
export class SignedDocumentsEditComponent implements OnInit, OnChanges {
    @Input() id: number;
    @Output() backListEmit = new EventEmitter<string>();
    @Output() backItemEmit = new EventEmitter<string>();


    requestItemData: SignedDocument;

    username: string;

    constructor(
        private updateItemUploadService: UpdateSignedDocumentsUploadService,
        private addItemUploadService: AddSignedDocumentsUploadService,
        private listService: SignedDocumentsService,
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

}

/**
 * Created by Yuri Nikiforov.
 * Date: 06.08.2019
 * Time: 12:17
 */
import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {DomSanitizer} from '@angular/platform-browser';
import {DocumentForDownload} from '../document-for-download';
import {DocumentsForDownloadService} from '../documents-for-download.service';

@Component({
    selector: 'app-documents-for-download-detail',
    templateUrl: './documents-for-download-detail.component.html',
    styleUrls: ['./documents-for-download-detail.component.scss']
})
export class DocumentsForDownloadDetailComponent implements OnChanges {
    @Input() id: number;
    @Output() closeEmit = new EventEmitter<string>();
    @Output() editEmit = new EventEmitter<string>();
    item: DocumentForDownload;

    constructor(private listService: DocumentsForDownloadService,
                private spinner: NgxSpinnerService,
                private sanitizer: DomSanitizer
    ) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.id) {
            this.spinner.show();
            this.listService.getItemDetail(this.id)
                .subscribe(value => {
                    this.item = value as DocumentForDownload;
                    this.spinner.hide();
                }, error => {
                    this.spinner.hide();
                });
        }
    }

    onClose() {
        this.closeEmit.emit('close');
    }

    onEdit() {
        this.editEmit.emit('edite');
    }

    onDelete() {
        if (confirm('Are you sure to delete Item?')) {
            if (this.id) {
                this.spinner.show();
                this.listService.deleteItem(this.id)
                    .subscribe(value => {
                        alert('Item is deleted');
                        this.closeEmit.emit('close');
                        this.spinner.hide();
                    }, error => {
                        this.spinner.hide();
                    });
            }
        }
    }

}

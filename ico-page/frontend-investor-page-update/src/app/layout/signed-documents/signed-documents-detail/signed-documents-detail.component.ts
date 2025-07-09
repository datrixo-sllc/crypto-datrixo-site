/**
 * Created by Yuri Nikiforov.
 * Date: 06.08.2019
 * Time: 12:17
 */
import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {DomSanitizer} from '@angular/platform-browser';
import {SignedDocument} from '../signed-document';
import {SignedDocumentsService} from '../signed-documents.service';

@Component({
    selector: 'app-signed-documents-detail',
    templateUrl: './signed-documents-detail.component.html',
    styleUrls: ['./signed-documents-detail.component.scss']
})
export class SignedDocumentsDetailComponent implements OnChanges {
    @Input() id: number;
    @Output() closeEmit = new EventEmitter<string>();
    @Output() editEmit = new EventEmitter<string>();
    item: SignedDocument;

    constructor(private listService: SignedDocumentsService,
                private spinner: NgxSpinnerService,
                private sanitizer: DomSanitizer
    ) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.id) {
            this.spinner.show();
            this.listService.getItemDetail(this.id)
                .subscribe(value => {
                    this.item = value as SignedDocument;
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

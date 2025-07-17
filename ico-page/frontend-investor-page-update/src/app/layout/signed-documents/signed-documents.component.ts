/**
 * Created by Yuri Nikiforov.
 * Date: 05.10.2020
 * Time: 20:05
 */
import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {NgxSpinnerService} from 'ngx-spinner';
import {SignedDocument} from './signed-document';
import {NavigationEnd, Router} from '@angular/router';
import {Utils} from '../../shared/utilites/Utils';
import {SignedDocumentsService} from './signed-documents.service';
import {SignedDocumentList} from './signed-document-list';
import { DinamicPageHeaderComponent } from '../../shared/modules/page-header/dinamic-header/dinamic-page-header.component';

@Component({
    selector: 'app-signed-documents',
    standalone: true,
    imports: [DinamicPageHeaderComponent],
    templateUrl: './signed-documents.component.html',
    styleUrls: ['./signed-documents.component.scss'],
    animations: [routerTransition()]
})
export class SignedDocumentsComponent implements OnInit {
    readonly header = 'Signed Documents';
    readonly headingStr1 = 'Signed Documents';
    readonly headingIcon = 'fa-money';
    headingStr = this.headingStr1;
    redirect = '/redirect-signed-documents';

    items: SignedDocument[];
    response: SignedDocumentList;
    selectedItem: SignedDocument;
    itemForEdit = false;
    viewList: boolean;
    itemForAdd = false;
    username: string;

    constructor(
        private listService: SignedDocumentsService,
        private spinner: NgxSpinnerService,
        private _router: Router,
        private utils: Utils
    ) {
    }

    ngOnInit() {
        this.username = localStorage.getItem('username');
        if (!this.viewList) {
            this.viewList = true;
        }
        this.getListPage();

        this._router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0);
        });
    }

    getListPage(): void {
        this.spinner.show();
        this.listService.getList()
            .subscribe(value => {
                if (value) {
                    this.response = value as SignedDocumentList;
                    this.items = this.response.documents;
                    // this.onSelect(this.selectedItem);
                    this.spinner.hide();
                }
            }, error => {
                this.spinner.hide();
                // alert('Server error: ' + error.message);
                this.utils.clearLocalStorage();
                this._router.navigate(['/login']);
            });
    }

    onSelect(item: SignedDocument): void {
        if (this.items.includes(item)) {
            this.selectedItem = item;
        } else {
            this.selectedItem = this.items[0];
        }
        this.headingStr = this.headingStr1 + ' / ' + this.selectedItem.docType + ' / '/* + this.selectedItem.name*/;
        this.viewList = false;
    }

    onCloseDetail(str: string) {
        this.viewList = true;
        this.headingStr = this.headingStr1;
        this._router.navigate([this.redirect]);
    }

    onEditDetail(str: string) {
        this.itemForEdit = true;
    }

    onAddItem(str: string) {
        this.itemForAdd = true;
    }

    onBackList(str: string) {
        this.viewList = true;
        this.itemForEdit = false;
        this.itemForAdd = false;
        this.headingStr = this.headingStr1;
        this._router.navigate([this.redirect]);
    }

    onBackItem(str: string) {
        this.itemForEdit = false;
    }
}

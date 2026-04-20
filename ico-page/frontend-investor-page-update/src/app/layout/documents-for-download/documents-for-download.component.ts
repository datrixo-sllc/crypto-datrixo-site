/**
 * Created by Yuri Nikiforov.
 * Date: 05.10.2020
 * Time: 20:05
 */
import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {NgxSpinnerService} from 'ngx-spinner';
import {DocumentForDownload} from './document-for-download';
import {NavigationEnd, Router} from '@angular/router';
import {Utils} from '../../shared/utilites/Utils';
import {DocumentsForDownloadService} from './documents-for-download.service';
import {DocumentForDownloadList} from './document-for-download-list';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DinamicPageHeaderComponent } from 'src/app/shared/modules/page-header/dinamic-header/dinamic-page-header.component';
import { DocumentsForDownloadDatatableComponent } from './documents-for-download-datatable/documents-for-download-datatable.component';
import { DocumentsForDownloadDetailComponent } from './documents-for-download-detail/documents-for-download-detail.component';
import { DocumentsForDownloadEditComponent } from './documents-for-download-edit/documents-for-download-edit.component';
import { DocumentsForDownloadAddComponent } from './documents-for-download-add/documents-for-download-add.component';

@Component({
    selector: 'app-documents-for-download',
    standalone: true,
    imports: [CommonModule, 
        FormsModule, 
        DinamicPageHeaderComponent,
        DocumentsForDownloadDatatableComponent,
        DocumentsForDownloadDetailComponent,
        DocumentsForDownloadEditComponent,
        DocumentsForDownloadAddComponent
    ],
    templateUrl: './documents-for-download.component.html',
    styleUrls: ['./documents-for-download.component.scss'],
    animations: [routerTransition()]
})
export class DocumentsForDownloadComponent implements OnInit {
    readonly header = 'Documents For Download';
    readonly headingStr1 = 'Documents For Download';
    readonly headingIcon = 'fa-money';
    headingStr = this.headingStr1;
    redirect = '/redirect-documents-for-download';

    items: DocumentForDownload[];
    response: DocumentForDownloadList;
    selectedItem: DocumentForDownload;
    itemForEdit = false;
    viewList: boolean;
    itemForAdd = false;
    username: string;

    constructor(
        private listService: DocumentsForDownloadService,
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
                    this.response = value as DocumentForDownloadList;
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

    onSelect(item: DocumentForDownload): void {
        if (this.items.includes(item)) {
            this.selectedItem = item;
        } else {
            this.selectedItem = this.items[0];
        }
        this.headingStr = this.headingStr1 + ' / ' + this.selectedItem.docType + ' / '/* + this.selectedItem.name*/;
        this.viewList = false;
        this.itemForEdit = true;
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

    onViewItem(id: number) {
        const index = this.items.findIndex(value => value.id === id);
        this.selectedItem = this.items[index];
        this.headingStr = this.headingStr1 + ' / ' + this.selectedItem.docType + ' / '/* + this.selectedItem.name*/;
        this.viewList = false;
        this.itemForEdit = false;
    }

    onRefresh(str: string) {
        this.getListPage();
    }
}

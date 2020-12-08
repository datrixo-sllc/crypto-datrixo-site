/**
 * Created by Yuri Nikiforov.
 * Date: 05.10.2020
 * Time: 19:49
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageHeaderModule} from '../../shared/modules';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {FormsModule} from '@angular/forms';
import {DocumentsForDownloadComponent} from './documents-for-download.component';
import {IngredientsDatatableComponent} from './documents-for-download-datatable/ingredients-datatable.component';
import {DocumentsForDownloadRoutingModule} from './documents-for-download-routing.module';
// import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Utils} from '../../shared/utilites/Utils';
import {DocumentsForDownloadService} from './documents-for-download.service';
import {IngredientEditComponent} from './documents-for-download-edit/ingredient-edit.component';
import {IngredientDetailComponent} from './documents-for-download-detail/ingredient-detail.component';
import {UpdateDocumentsForDownloadUploadService} from './update-documents-for-download-upload.service';
import {AddDocumentsForDownloadUploadService} from './add-documents-for-download-upload.service';
import {DocumentsForDownloadAddComponent} from './documents-for-download-add/documents-for-download-add.component';

@NgModule({
    imports: [
        CommonModule,
        DocumentsForDownloadRoutingModule,
        PageHeaderModule,
        NgxDatatableModule,
        FormsModule,
        // AutocompleteLibModule,
        NgbModule
    ],
    declarations: [
        DocumentsForDownloadComponent,
        IngredientsDatatableComponent,
        IngredientDetailComponent,
        IngredientEditComponent,
        DocumentsForDownloadAddComponent
    ],
    providers: [
        DocumentsForDownloadService,
        UpdateDocumentsForDownloadUploadService,
        AddDocumentsForDownloadUploadService,
        Utils
    ]
})
export class DocumentsForDownloadModule {
}

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
import {SignedDocumentsComponent} from './signed-documents.component';
import {SignedDocumentsDatatableComponent} from './signed-documents-datatable/signed-documents-datatable.component';
import {SignedDocumentsRoutingModule} from './signed-documents-routing.module';
// import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Utils} from '../../shared/utilites/Utils';
import {SignedDocumentsService} from './signed-documents.service';
import {SignedDocumentsEditComponent} from './signed-documents-edit/signed-documents-edit.component';
import {SignedDocumentsDetailComponent} from './signed-documents-detail/signed-documents-detail.component';
import {UpdateSignedDocumentsUploadService} from './update-signed-documents-upload.service';
import {AddSignedDocumentsUploadService} from './add-signed-documents-upload.service';
import {SignedDocumentsAddComponent} from './signed-documents-add/signed-documents-add.component';

@NgModule({
    imports: [
        CommonModule,
        SignedDocumentsRoutingModule,
        PageHeaderModule,
        NgxDatatableModule,
        FormsModule,
        // AutocompleteLibModule,
        NgbModule
    ],
    declarations: [
        SignedDocumentsComponent,
        SignedDocumentsDatatableComponent,
        SignedDocumentsDetailComponent,
        SignedDocumentsEditComponent,
        SignedDocumentsAddComponent
    ],
    providers: [
        SignedDocumentsService,
        UpdateSignedDocumentsUploadService,
        AddSignedDocumentsUploadService,
        Utils
    ]
})
export class SignedDocumentsModule {
}

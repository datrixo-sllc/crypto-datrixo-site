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
import {IngredientsComponent} from './ingredients.component';
import {IngredientsDatatableComponent} from './signed-documents-datatable/ingredients-datatable.component';
import {IngredientsRoutingModule} from './ingredients-routing.module';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Utils} from '../../shared/utilites/Utils';
import {IngredientsService} from './ingredients.service';
import {IngredientEditComponent} from './signed-documents-edit/ingredient-edit.component';
import {IngredientDetailComponent} from './signed-documents-detail/ingredient-detail.component';
import {UpdateIngredientUploadService} from './update-ingredient-upload.service';
import {AddIngredientUploadService} from './add-ingredient-upload.service';
import {IngredientAddComponent} from './signed-documents-add/ingredient-add.component';

@NgModule({
    imports: [
        CommonModule,
        IngredientsRoutingModule,
        PageHeaderModule,
        NgxDatatableModule,
        FormsModule,
        AutocompleteLibModule,
        NgbModule
    ],
    declarations: [
        IngredientsComponent,
        IngredientsDatatableComponent,
        IngredientDetailComponent,
        IngredientEditComponent,
        IngredientAddComponent
    ],
    providers: [
        IngredientsService,
        UpdateIngredientUploadService,
        AddIngredientUploadService,
        Utils
    ]
})
export class IngredientsModule {
}

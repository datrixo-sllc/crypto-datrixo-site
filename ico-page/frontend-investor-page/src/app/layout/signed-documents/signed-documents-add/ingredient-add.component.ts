import {
    Component,
    EventEmitter,
    OnInit,
    Output
} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {NgxSpinnerService} from 'ngx-spinner';
import {DomSanitizer} from '@angular/platform-browser';
import {Ingredient} from '../ingredient';
import {IngredientsService} from '../ingredients.service';
import {UpdateIngredientUploadService} from '../update-ingredient-upload.service';
import {AddIngredientUploadService} from '../add-ingredient-upload.service';
import {Router} from '@angular/router';
import {Utils} from '../../../shared/utilites/Utils';

/**
 * Created by Yuri Nikiforov.
 * Date: 22.10.2019
 * Time: 20:45
 */

@Component({
    selector: 'app-ingredient-add',
    templateUrl: './ingredient-add.component.html',
    styleUrls: ['./ingredient-add.component.scss']
})
export class IngredientAddComponent implements OnInit {
    @Output() backListEmit = new EventEmitter<string>();

    requestItemData: Ingredient;

    username: string;

    constructor(
        private updateItemUploadService: UpdateIngredientUploadService,
        private addItemUploadService: AddIngredientUploadService,
        private listService: IngredientsService,
        private spinner: NgxSpinnerService,
        private sanitizer: DomSanitizer,
        private _router: Router,
        private utils: Utils
    ) {
    }

    ngOnInit(): void {
        this.clearUploadParams();
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

    onSubmitItemAdd() {
        const conf = confirm('Add Item?');
        if (conf) {
            if (!this.requestItemData || !this.requestItemData.name
                || !this.requestItemData.description
            ) {
                alert('Fill form, please');
            } else {
                this.spinner.show();
                this.addItemUploadService.postItemAdd(this.requestItemData)
                    .toPromise()
                    .then((value: HttpResponse<Object>) => {
                            this.spinner.hide();
                            alert('Server pull response: status: ' + value.status +
                                ' status text: ' + value.statusText +
                                ' location: ' + value.headers.get('Location'));
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
        this.requestItemData = new Ingredient();

    }

    onBackList() {
        this.backListEmit.emit('backList');
    }
}

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
import {Ingredient} from '../ingredient';
import {IngredientsService} from '../ingredients.service';
import {UpdateIngredientUploadService} from '../update-ingredient-upload.service';
import {AddIngredientUploadService} from '../add-ingredient-upload.service';

/**
 * Created by Yuri Nikiforov.
 * Date: 22.10.2019
 * Time: 20:45
 */

@Component({
    selector: 'app-ingredient-edit',
    templateUrl: './ingredient-edit.component.html',
    styleUrls: ['./ingredient-edit.component.scss']
})
export class IngredientEditComponent implements OnInit, OnChanges {
    @Input() id: number;
    @Output() backListEmit = new EventEmitter<string>();
    @Output() backItemEmit = new EventEmitter<string>();


    requestItemData: Ingredient;

    username: string;

    constructor(
        private updateItemUploadService: UpdateIngredientUploadService,
        private addItemUploadService: AddIngredientUploadService,
        private listService: IngredientsService,
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
                    this.requestItemData = value as Ingredient;
                    this.spinner.hide();
                }, error => {
                    this.spinner.hide();
                });
        }
    }

    onSubmitItemUpdate() {
        if (!this.requestItemData || !this.requestItemData.name
            || !this.requestItemData.description
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
        this.requestItemData = new Ingredient();

    }


    onBackList() {
        this.backListEmit.emit('backList');
    }

    onBackItem() {
        this.backItemEmit.emit('backItem');
    }

}

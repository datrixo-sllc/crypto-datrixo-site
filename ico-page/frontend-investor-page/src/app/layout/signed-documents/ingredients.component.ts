/**
 * Created by Yuri Nikiforov.
 * Date: 05.10.2020
 * Time: 20:05
 */
import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {NgxSpinnerService} from 'ngx-spinner';
import {Ingredient} from './ingredient';
import {NavigationEnd, Router} from '@angular/router';
import {Utils} from '../../shared/utilites/Utils';
import {IngredientsService} from './ingredients.service';
import {IngredientList} from './ingredient-list';

@Component({
    selector: 'app-ingredients',
    templateUrl: './ingredients.component.html',
    styleUrls: ['./ingredients.component.scss'],
    animations: [routerTransition()]
})
export class IngredientsComponent implements OnInit {
    readonly header = 'Ingredients';
    readonly headingStr1 = 'Ingredients';
    headingStr = this.headingStr1;
    redirect = '/redirect-ingredients';

    items: Ingredient[];
    response: IngredientList;
    selectedItem: Ingredient;
    itemForEdit = false;
    viewList: boolean;
    itemForAdd = false;
    username: string;

    constructor(
        private listService: IngredientsService,
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
                    this.response = value as IngredientList;
                    this.items = this.response.ingredients;
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

    onSelect(item: Ingredient): void {
        if (this.items.includes(item)) {
            this.selectedItem = item;
        } else {
            this.selectedItem = this.items[0];
        }
        this.headingStr = this.headingStr1 + ' / ' + this.selectedItem.name + ' / '/* + this.selectedItem.name*/;
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

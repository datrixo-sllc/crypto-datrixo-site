import { Component, OnInit } from '@angular/core';
import {routerTransition} from '../../router.animations';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
    animations: [routerTransition()]
})
export class MainPageComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}

import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [TranslateModule, RouterModule],
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}

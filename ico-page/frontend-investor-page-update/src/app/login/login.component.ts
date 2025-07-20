import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { NgxSpinnerService } from 'ngx-spinner';
import {LoginService} from './login.service';
import {StatusResponseAuth} from './status-response-auth';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [TranslateModule, RouterModule, FormsModule, MatIconModule, CommonModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    model: any = {};
    varStatus: string;
    hide = true;

    constructor(
      public router: Router,
      private loginService: LoginService,
      private spinner: NgxSpinnerService
    ) {}

    ngOnInit() {
        this.clearLocalStorage();
    }

    onLoggedin() {
        this.spinner.show();
        this.loginService.login(this.model.username, this.model.password)
            .subscribe((response) => {
                if (response && response.statusResponseAuth) {
                    if (response.statusResponseAuth === StatusResponseAuth.OK) {
                        this.varStatus = StatusResponseAuth.OK;
                        localStorage.setItem('authorityStatus', JSON.stringify(response));
                        localStorage.setItem('username', this.model.username);
                        localStorage.setItem('userRole', response.role);
                        localStorage.setItem('isLoggedin', 'true');
                        this.router.navigate(['/main-page']);
                    } else if (response.statusResponseAuth === StatusResponseAuth.LOGIN_NOT_FOUND) {
                        this.varStatus = StatusResponseAuth.LOGIN_NOT_FOUND;
                        this.clearLocalStorage();
                    } else if (response.statusResponseAuth === StatusResponseAuth.PASSWORD_INVALID) {
                        this.varStatus = StatusResponseAuth.PASSWORD_INVALID;
                        this.clearLocalStorage();
                    } else {
                        this.varStatus = 'ERROR';
                        this.clearLocalStorage();
                    }
                    this.spinner.hide();
                }
            }, error => {
                if (error && error.error && error.error.statusResponseAuth) {
                    if (error.error.statusResponseAuth === StatusResponseAuth.LOGIN_NOT_FOUND) {
                        this.varStatus = StatusResponseAuth.LOGIN_NOT_FOUND;
                        this.clearLocalStorage();
                    } else if (error.error.statusResponseAuth === StatusResponseAuth.PASSWORD_INVALID) {
                        this.varStatus = StatusResponseAuth.PASSWORD_INVALID;
                        this.clearLocalStorage();
                    } else {
                        this.varStatus = 'ERROR';
                        this.clearLocalStorage();
                    }
                }
                this.spinner.hide();
            });

    }

    private clearLocalStorage() {
        if (localStorage.getItem('authorityStatus') != null) {
            localStorage.removeItem('authorityStatus');
        }
        if (localStorage.getItem('username') != null) {
            localStorage.removeItem('username');
        }
        if (localStorage.getItem('userRole') != null) {
            localStorage.removeItem('userRole');
        }
        if (localStorage.getItem('isLoggedin') != null) {
            localStorage.removeItem('isLoggedin');
        }
    }

    eyeFunction() {
        this.hide = !this.hide;
    }
}

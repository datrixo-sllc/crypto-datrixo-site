import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { NgxSpinnerService } from 'ngx-spinner';
import {LoginService} from './login.service';
import {Response} from '@angular/http';
import {StatusResponseAuth} from './status-response-auth';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    model: any = {};
    varStatus: string;
    
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
        this.loginService.login(this.model.email, this.model.password)
            .subscribe((response: Response) => {
                if (response && response.json().statusResponseAuth) {
                    if (response.json().statusResponseAuth === StatusResponseAuth.OK) {
                        this.varStatus = StatusResponseAuth.OK;
                        localStorage.setItem('authorityStatus', JSON.stringify(response.json()));
                        localStorage.setItem('login', (response.json().login) + ', ' + response.json().desc);
                        localStorage.setItem('isLoggedin', 'true');
                        this.router.navigate(['/investor-profile']);
                    } else if (response.json().statusResponseAuth === StatusResponseAuth.LOGIN_NOT_FOUND) {
                        this.varStatus = StatusResponseAuth.LOGIN_NOT_FOUND;
                        this.clearLocalStorage();
                    } else if (response.json().statusResponseAuth === StatusResponseAuth.PASSWORD_INVALID) {
                        this.varStatus = StatusResponseAuth.PASSWORD_INVALID;
                        this.clearLocalStorage();
                    } else {
                        this.varStatus = 'ERROR';
                        this.clearLocalStorage();
                    }
                    this.spinner.hide();
                    alert('Server вернул ответ ' +
                        'на запрос по URL: ' + response.url +
                        '\n--------' +
                        '\nСтатус ответа: ' + response.status +
                        '\nТекст статуса ответа: ' + response.statusText +
                        '\nOk ответа: ' + response.ok +
                        '\nТип ответа: ' + response.type +
                        '\nЗаголовки ответа: ' + this.getStringFromHeaders(response) +
                        '\nТело ответа: ' + response.text());
                }
            }, error => {
                if (error && error.json().statusResponseAuth) {
                    if (error.json().statusResponseAuth === StatusResponseAuth.LOGIN_NOT_FOUND) {
                        this.varStatus = StatusResponseAuth.LOGIN_NOT_FOUND;
                        this.clearLocalStorage();
                    } else if (error.json().statusResponseAuth === StatusResponseAuth.PASSWORD_INVALID) {
                        this.varStatus = StatusResponseAuth.PASSWORD_INVALID;
                        this.clearLocalStorage();
                    } else {
                        this.varStatus = 'ERROR';
                        this.clearLocalStorage();
                    }
                }
                this.spinner.hide();
                alert('Server вернул ошибку: ' + error);
                
            });

    }

    private getStringFromHeaders(response: Response) {
        let result = '';
        response.headers.keys().forEach(value => {
            result = result + ('\n' + value + ' : ' + response.headers.get(value));
        });

        return result;
    }

    private clearLocalStorage() {
        if (localStorage.getItem('authorityStatus') != null) {
            localStorage.removeItem('authorityStatus');
        }
        localStorage.setItem('isLoggedin', 'false');
    }
}

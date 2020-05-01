import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {NgxSpinnerService} from 'ngx-spinner';
import {InvestorProfileService} from './investor-profile.service';
import {RespUserData} from './resp-user-data';
import {RequestUpdateUserData} from './request-update-user-data';
import {RequestUpdateUserPassword} from './request-update-user-password';
import {Router} from '@angular/router';
import * as Noty from 'noty';

@Component({
    selector: 'app-investor-profile',
    templateUrl: './investor-profile.component.html',
    styleUrls: ['./investor-profile.component.scss'],
    animations: [routerTransition()]
})
export class InvestorProfileComponent implements OnInit {
    closeResult: string;
    userData: RespUserData = new RespUserData();
    currentPassword: string;
    newPassword: string;
    newPasswordReent: string;

    modal: NgbModalRef;
    @ViewChild('modalResetPasswordWindow') templateRef: TemplateRef<any>;
    @ViewChild('modalAlertWindow') templateAlertRef: TemplateRef<any>;
    @ViewChild('modalConfirmUserDataWindow') templateConfirmUserDataRef: TemplateRef<any>;
    @ViewChild('modalConfirmResetPasswordWindow') templateConfirmResetPasswordRef: TemplateRef<any>;
    alertTitle: string;
    confirmTitle: string;
    alertBody: string;
    confirmBody: string;


    constructor(
        private investorProfileService: InvestorProfileService,
        private modalService: NgbModal,
        private spinner: NgxSpinnerService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.getUserData();
    }

    getUserData(): void {
        this.spinner.show();
        this.investorProfileService.getUserData()
            .toPromise()
            .then((response: any) => {
                    this.userData = response as RespUserData;
                    this.spinner.hide();
                },
                (error: Error) => {
                    this.alertTitle = 'Investor Profile';
                    this.alertBody = 'Server error: ' + error;
                    this.spinner.hide();
                    // this.modal = this.modalService.open(this.templateAlertRef);
                    this.notyMessage(this.alertTitle, this.alertBody, 'error').show();
                });

    }

    open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    notyMessage(alertTitle: string, alertBody: string, messageType: Noty.Type): Noty {
        return new Noty({
            type: messageType,
            text: '<strong>' + alertTitle + '</strong><br /> ' + alertBody,
            timeout: 3000
        });
    }

    onReset() {
        this.getUserData();
    }

    onConfirmUpdateUserData() {
        this.confirmTitle = 'Investor Profile Update';
        this.confirmBody = 'Do you want update Profile?';
        this.modal = this.modalService.open(this.templateConfirmUserDataRef);
    }

    onUpdateUserData() {
        this.modal.close();
        const request = new RequestUpdateUserData();
        request.title = this.userData.title;
        request.firstName = this.userData.firstName;
        request.lastName = this.userData.lastName;
        request.phone = this.userData.phone;
        this.alertTitle = 'Investor Profile Update';
        this.investorProfileService.updateUserData(request)
            .toPromise()
            .then((response: any) => {
                    this.spinner.hide();
                    this.alertBody = 'Successfully updated';
                    // this.modal = this.modalService.open(this.templateAlertRef);
                    this.notyMessage(this.alertTitle, this.alertBody, 'success').show();
                    this.getUserData();
                },
                (error: Error) => {
                    this.spinner.hide();
                    this.alertBody = 'Server error: ' + error;
                    // this.modal = this.modalService.open(this.templateAlertRef);
                    this.notyMessage(this.alertTitle, this.alertBody, 'error').show();
                });
    }

    checkPasswordContent(): boolean {

//             ^	The password string will start this way.
//            (?=.*[a-z])	The string must contain at least 1 lowercase alphabetical character.
//            (?=.*[A-Z])	The string must contain at least 1 uppercase alphabetical character.
//            (?=.*[0-9])	The string must contain at least 1 numeric character.
//            (?=.*[!@#\$%\^&\*])	The string must contain at least one special character, but we are escaping
//                                  reserved RegEx characters to avoid conflict.
//            (?=.{8,})	The string must be eight characters or longer.


        const regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})');
        return regex.test(this.newPassword);
    }

    checkPassword(): boolean {
        return this.newPassword != null && this.newPasswordReent != null && this.newPassword === this.newPasswordReent;
    }

    openResetPassword() {
        this.newPassword = null;
        this.newPasswordReent = null;
        this.currentPassword = null;
        this.modal = this.modalService.open(this.templateRef);
    }

    onConfirmResetPassword() {
        this.confirmTitle = 'Change Password';
        this.confirmBody = 'Do you want change Password?';
        this.modal.close();
        this.modal = this.modalService.open(this.templateConfirmResetPasswordRef);
    }


    onResetPassword() {
        this.modal.close();
        const request = new RequestUpdateUserPassword();
        request.newPassword = this.newPassword;
        request.newPasswordReent = this.newPasswordReent;
        request.currentPassword = this.currentPassword;
        this.alertTitle = 'Change Password';
        this.investorProfileService.updateUserPassword(request)
            .toPromise()
            .then((response: any) => {
                    this.spinner.hide();
                    this.alertBody = 'Successfully updated';
                    // this.modal = this.modalService.open(this.templateAlertRef);
                    this.notyMessage(this.alertTitle, this.alertBody, 'success').show();
                    this.clearLocalStorage();
                    this.router.navigate(['/login']);
                },
                (error: Error) => {
                    this.spinner.hide();
                    this.alertBody = 'Server error: ' + error;
                    // this.modal = this.modalService.open(this.templateAlertRef);
                    this.notyMessage(this.alertTitle, this.alertBody, 'error').show();
                });

    }

    private clearLocalStorage() {
        if (localStorage.getItem('authorityStatus') != null) {
            localStorage.removeItem('authorityStatus');
        }
        if (localStorage.getItem('username') != null) {
            localStorage.removeItem('username');
        }
        if (localStorage.getItem('isLoggedin') != null) {
            localStorage.removeItem('isLoggedin');
        }
    }
}

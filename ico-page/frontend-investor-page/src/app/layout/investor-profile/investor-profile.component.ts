import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {routerTransition} from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {NgxSpinnerService} from 'ngx-spinner';
import {InvestorProfileService} from './investor-profile.service';
import {RespUserData} from './resp-user-data';
import {RequestUpdateUserData} from './request-update-user-data';

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
    @ViewChild('modalResetPasswordWindow') templateRef: TemplateRef<any>;


    constructor(
        private investorProfileService: InvestorProfileService,
        private modalService: NgbModal,
        private spinner: NgxSpinnerService
        ) {}

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
                    this.spinner.hide();
                    alert('Server error: ' + error.message);
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
            return  `with: ${reason}`;
        }
    }

    onReset() {
        this.getUserData();
    }

    onUpdateUserData() {
        const conf = confirm('Update profile ?');
        if (conf) {
            const request = new RequestUpdateUserData();
            request.title = this.userData.title;
            request.firstName = this.userData.firstName;
            request.lastName = this.userData.lastName;
            request.phone = this.userData.phone;

            this.investorProfileService.updateUserData(request)
                .toPromise()
                .then((response: any) => {
                        this.spinner.hide();
                        alert('Server response: ' + response);
                        this.getUserData();
                    },
                    (error: Error) => {
                        this.spinner.hide();
                        alert('Server error: ' + error);
                    });
        }
    }

    onResetPassword() {

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
        this.modalService.open(this.templateRef);
    }
}

import { Component, OnInit } from '@angular/core';
import {routerTransition} from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {NgxSpinnerService} from 'ngx-spinner';
import {InvestorProfileService} from './investor-profile.service';
import {RespUserData} from './resp-user-data';

@Component({
    selector: 'app-investor-profile',
    templateUrl: './investor-profile.component.html',
    styleUrls: ['./investor-profile.component.scss'],
    animations: [routerTransition()]
})
export class InvestorProfileComponent implements OnInit {
    closeResult: string;
    userData: RespUserData = new RespUserData();
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
                error => {
                    this.spinner.hide();
                    alert('Server error: ' + error);
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

}

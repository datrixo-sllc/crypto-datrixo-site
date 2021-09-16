/**
 * Created by Yuri Nikiforov.
 * Date: 06.08.2019
 * Time: 12:17
 */
import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {DomSanitizer} from '@angular/platform-browser';
import {User} from '../user';
import {AdminUsersService} from '../admin-users.service';
import {routerTransition} from '../../../router.animations';
import {RespUserData} from '../../investor-profile/resp-user-data';
import * as Noty from 'noty';
import {Router} from '@angular/router';

@Component({
    selector: 'app-admin-users-detail',
    templateUrl: './admin-users-detail.component.html',
    styleUrls: ['./admin-users-detail.component.scss'],
    animations: [routerTransition()]
})
export class AdminUsersDetailComponent implements OnChanges {
    @Input() id: number;
    @Output() closeEmit = new EventEmitter<string>();
    @Output() editEmit = new EventEmitter<string>();
    userData: RespUserData = new RespUserData();
    etherNet = 'etherscan.io';
    opencorp = 'https://opencorporates.com/companies/';
    imgSrc: any;

    alertTitle: string;
    confirmTitle: string;
    alertBody: string;
    confirmBody: string;

    constructor(private listService: AdminUsersService,
                private spinner: NgxSpinnerService,
                private router: Router,
                private sanitizer: DomSanitizer
    ) {

    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.id) {
            this.spinner.show();
            this.alertTitle = 'User Detail';
            this.listService.getUserData(this.id)
                .toPromise()
                .then((response: any) => {
                        this.userData = response as RespUserData;
                        if (this.userData.imageContent) {
                            this.imgSrc = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + this.userData.imageContent);
                        }
                        this.alertBody = 'Successfully loaded';
                        this.spinner.hide();
                        this.notyMessage(this.alertTitle, this.alertBody, 'success').show();
                    },
                    (error: Error) => {
                        this.alertTitle = 'User Detail';
                        this.alertBody = 'Server error: ' + error;
                        this.spinner.hide();
                        // this.modal = this.modalService.open(this.templateAlertRef);
                        this.notyMessage(this.alertTitle, this.alertBody, 'error').show();
                        this.router.navigate(['/login']);
                    });
        }
    }

    notyMessage(alertTitle: string, alertBody: string, messageType: Noty.Type): Noty {
        return new Noty({
            type: messageType,
            text: '<strong>' + alertTitle + '</strong><br /> ' + alertBody,
            timeout: 3000
        });
    }

    onClose() {
        this.closeEmit.emit('close');
    }

    onEdit() {
        this.editEmit.emit('edite');
    }


}

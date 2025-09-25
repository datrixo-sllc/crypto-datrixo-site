import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges, TemplateRef,
    ViewChild
} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {NgxSpinnerService} from 'ngx-spinner';
import {DomSanitizer} from '@angular/platform-browser';
import {User} from '../user';
import {AdminUsersService} from '../admin-users.service';
import {UpdateAdminUsersUploadService} from '../update-admin-users-upload.service';
import {AddAdminUserUploadService} from '../add-admin-user-upload.service';
import {Router} from '@angular/router';
import {Utils} from '../../../shared/utilites/Utils';
import {Organization} from '../organization';
import {FormControl} from '@angular/forms';
import {Account} from '../account';
import {NgbModal, NgbModalRef, NgbDateStruct, NgbCalendar, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Country} from '../country';
import * as Noty from 'noty';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * Created by Yuri Nikiforov.
 * Date: 22.10.2019
 * Time: 20:45
 */

@Component({
    selector: 'app-admin-users-add',
    standalone: true,
    imports: [CommonModule, FormsModule, NgbModule],
    templateUrl: './admin-users-add.component.html',
    styleUrls: ['./admin-users-add.component.scss']
})
export class AdminUsersAddComponent implements OnInit, AfterViewInit {
    @Output() backListEmit = new EventEmitter<string>(); // TODO Добавить представление пользователей


    fileToUpload: File = null;
    imgSrc: any;
    @ViewChild('uploadFile') uploadEl: ElementRef;

    requestItemData: User = new User();
    orgIncorpDate: NgbDateStruct;

    show = false;


    keyword = 'name';

    username: string;
    etherNet = 'etherscan.io';
    newEthereumAddress: string;
    newEthereumCreateDate: NgbDateStruct;
    newEthereumPaidPrice: number;
    newEthereumInitialInvest: boolean;
    modal: NgbModalRef;
    @ViewChild('modalAddEthereumAccountWindow') templateAddEthereumAccountRef: TemplateRef<any>;

    alertTitle: string;
    confirmTitle: string;
    alertBody: string;
    confirmBody: string;

    isReady: boolean = false;

    constructor(
        private updateItemUploadService: UpdateAdminUsersUploadService,
        private addItemUploadService: AddAdminUserUploadService,
        private listService: AdminUsersService,
        private modalService: NgbModal,
        private spinner: NgxSpinnerService,
        private sanitizer: DomSanitizer,
        private router: Router,
        private utils: Utils,
        private calendar: NgbCalendar
    ) {

    }

    ngAfterViewInit(): void {
        if (this.uploadEl && this.uploadEl.nativeElement) {
            this.uploadEl.nativeElement.value = null;
        }
    }

    ngOnInit(): void {
        this.clearNewEthAccountData();
        this.clearUploadParams();
        this.isReady = true;
        this.spinner.show();
        this.addItemUploadService.getCheck()
            .subscribe(value => {
                if (value) {
                    this.spinner.hide();
                }
            }, error => {
                this.spinner.hide();
                this.utils.clearLocalStorage();
                this.router.navigate(['/login']);
            });
    }

    handleFileInput(files: FileList) {
        if (files.item(0).size > 1000000) {
            alert('Image file must be less then 1Mb');
            if (this.uploadEl && this.uploadEl.nativeElement) {
                this.uploadEl.nativeElement.value = null;
            }
            return;
        }
        this.fileToUpload = files.item(0);
        const reader = new FileReader();
        // @ts-ignore
        reader.onload = ev => this.imgSrc = reader.result;
        reader.readAsDataURL(this.fileToUpload);
    }

    onSubmitItemAdd() {
        const [errorsExist, message] =
            this.utils.ifUserDataErrorsExist(this.requestItemData);
        if (errorsExist) {
            alert(message);
            return;
        }
        const conf = confirm('Add user?');
        if (conf) {

            this.spinner.show();
            this.alertTitle = 'Add User';
            this.addItemUploadService.postItemAdd(this.fileToUpload, this.requestItemData)
                .toPromise()
                .then((value: HttpResponse<Object>) => {
                        this.alertBody = 'Successfully loaded';
                        this.clearUploadParams();
                        this.spinner.hide();
                        this.notyMessage(this.alertTitle, this.alertBody, 'success').show();
                        this.onBackList();
                    },
                    (reason: Error) => {
                        this.alertTitle = 'Edit User';
                        this.alertBody = 'Server error: ' + reason;
                        this.spinner.hide();
                        this.clearUploadParams();
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

    clearUploadParams() {
        this.fileToUpload = null;
        this.imgSrc = null;
        if (this.uploadEl && this.uploadEl.nativeElement) {
            this.uploadEl.nativeElement.value = null;
        }
        this.requestItemData = new User();
        this.requestItemData.init('USER_CRYPTO', 'INDIVIDUAL', 'MR', null, []);


    }

    onBackList() {
        this.backListEmit.emit('backList');
    }

    onGenUsername() {
        this.spinner.show();
        this.alertTitle = 'Add User';
        this.addItemUploadService.getUsername()
            .subscribe(value => {
                if (value) {
                    this.requestItemData.username = value.name;
                    this.alertBody = 'Successfully generated';
                    this.spinner.hide();
                    this.notyMessage(this.alertTitle, this.alertBody, 'success').show();
                }
            }, error => {
                this.alertTitle = 'Add User';
                this.alertBody = 'Server error: ' + error;
                this.spinner.hide();
                this.notyMessage(this.alertTitle, this.alertBody, 'error').show();
                this.utils.clearLocalStorage();
                this.router.navigate(['/login']);
            });
    }

    onGenPassword() {
        this.spinner.show();
        this.alertTitle = 'Add User';
        this.addItemUploadService.getPassword()
            .subscribe(value => {
                if (value) {
                    this.requestItemData.password = value.password;
                    this.alertBody = 'Successfully generated';
                    this.spinner.hide();
                    this.notyMessage(this.alertTitle, this.alertBody, 'success').show();
                }
            }, error => {
                this.alertTitle = 'Add User';
                this.alertBody = 'Server error: ' + error;
                this.spinner.hide();
                this.notyMessage(this.alertTitle, this.alertBody, 'error').show();
                this.utils.clearLocalStorage();
                this.router.navigate(['/login']);
            });
    }

    onCallAddEthAccount() {
        this.modal = this.modalService.open(this.templateAddEthereumAccountRef);
    }

    onRemoveAccount(i: number) {
        this.requestItemData.accounts.splice(i, 1);
    }

    onAddNewEthereumAccount() {
        this.modal.close();
        const newEthereumAcc = new Account();
        newEthereumAcc.address = this.newEthereumAddress;
        newEthereumAcc.createDate =
            new Date(this.newEthereumCreateDate.year, this.newEthereumCreateDate.month - 1, this.newEthereumCreateDate.day);
        newEthereumAcc.paidPrice = this.newEthereumPaidPrice;
        newEthereumAcc.initialInvest = this.newEthereumInitialInvest;
        this.requestItemData.accounts.push(newEthereumAcc);
        this.clearNewEthAccountData();
    }

    clearNewEthAccountData() {
        this.newEthereumAddress = null;
        this.newEthereumCreateDate = this.calendar.getToday();
        this.newEthereumPaidPrice = null;
        this.newEthereumInitialInvest = false;
    }

    checkAddress() {
        const regex = new RegExp('0[xX][0-9a-fA-F]+');
        return regex.test(this.newEthereumAddress);
    }

    checkPaidPrice() {
        const regex = new RegExp('^[0-9]*\.?[0-9]*$');
        return this.newEthereumPaidPrice != null ? regex.test(this.newEthereumPaidPrice.toString()) : false;
    }

    onChangeUserType() {
        this.orgIncorpDate = this.calendar.getToday();
        if (this.requestItemData.userType === 'INDIVIDUAL') {
            this.requestItemData.organization = null;
        } else {
            this.requestItemData.organization = new Organization();
            this.setIncorpDate();
            this.requestItemData.organization.country = new Country();
            this.requestItemData.organization.country.code = 'US';
        }
    }

    onInitialInvest() {
        if (this.newEthereumInitialInvest === true) {
            this.newEthereumPaidPrice = 0;
        }
    }

    setIncorpDate() {
        this.requestItemData.organization.incorporateDate =
            new Date(this.orgIncorpDate.year, this.orgIncorpDate.month - 1, this.orgIncorpDate.day);
    }
}

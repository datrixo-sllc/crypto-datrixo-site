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
import {el} from '@angular/platform-browser/testing/src/browser_util';
import {FormControl} from '@angular/forms';
import {Account} from '../account';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

/**
 * Created by Yuri Nikiforov.
 * Date: 22.10.2019
 * Time: 20:45
 */

@Component({
    selector: 'app-admin-users-add',
    templateUrl: './admin-users-add.component.html',
    styleUrls: ['./admin-users-add.component.scss']
})
export class AdminUsersAddComponent implements OnInit, AfterViewInit {
    @Output() backListEmit = new EventEmitter<string>(); // TODO Добавить представление пользователей


    fileToUpload: File = null;
    imgSrc: any;
    @ViewChild('uploadFile') uploadEl: ElementRef;

    requestItemData: User;

    show = false;


    keyword = 'name';

    username: string;
    etherNet = 'etherscan.io';
    newEthereumAdress: string;
    modal: NgbModalRef;
    @ViewChild('modalAddEthereumAccountWindow') templateAddEthereumAccountRef: TemplateRef<any>;


    constructor(
        private updateItemUploadService: UpdateAdminUsersUploadService,
        private addItemUploadService: AddAdminUserUploadService,
        private listService: AdminUsersService,
        private modalService: NgbModal,
        private spinner: NgxSpinnerService,
        private sanitizer: DomSanitizer,
        private _router: Router,
        private utils: Utils
    ) {

    }

    ngAfterViewInit(): void {
        this.uploadEl.nativeElement.value = null;
    }

    ngOnInit(): void {
        this.clearUploadParams();
        this.spinner.show();
        this.addItemUploadService.getCheck()
            .subscribe(value => {
                if (value) {
                    this.spinner.hide();
                }
            }, error => {
                this.spinner.hide();
                // alert('Server error: ' + error.message);
                this.utils.clearLocalStorage();
                this._router.navigate(['/login']);
            });
    }

    handleFileInput(files: FileList) {
        if (files.item(0).size > 1000000) {
            alert('Image file must be less then 1Mb');
            this.uploadEl.nativeElement.value = null;
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
            this.addItemUploadService.postItemAdd(this.fileToUpload, this.requestItemData)
                .toPromise()
                .then((value: HttpResponse<Object>) => {
                        this.spinner.hide();
                        alert('User is added');
                        /*alert('Server pull response: status: ' + value.status +
                            ' status text: ' + value.statusText +
                            ' location: ' + value.headers.get('Location'));*/
                        this.clearUploadParams();
                        this.spinner.hide();
                        this.onBackList();
                    },
                    (reason: Error) => {
                        this.spinner.hide();
                        alert('Server pull error: ' + reason.message);
                        this.clearUploadParams();
                    });


        }
    }

    clearUploadParams() {
        this.fileToUpload = null;
        this.imgSrc = null;
        this.uploadEl.nativeElement.value = null;
        this.requestItemData = new User();
        this.requestItemData.init("USER_CRYPTO", "INDIVIDUAL", "MR", null, []);


    }

    onBackList() {
        this.backListEmit.emit('backList');
    }

    onGenUsername() {
        this.spinner.show();
        this.addItemUploadService.getUsername()
            .subscribe(value => {
                if (value) {
                    this.requestItemData.username = value.json().name;
                    this.spinner.hide();
                }
            }, error => {
                this.spinner.hide();
                // alert('Server error: ' + error.message);
                this.utils.clearLocalStorage();
                this._router.navigate(['/login']);
                });
    }

    onCallAddEthAccount() {
        this.modal = this.modalService.open(this.templateAddEthereumAccountRef);
    }

    onRemoveAccount(i: number) {

    }

    onAddNewEthereumAccount() {
        this.modal.close();
        const newEthereumAcc = new Account();
        newEthereumAcc.address = this.newEthereumAdress;
        this.newEthereumAdress = null;
        this.requestItemData.accounts.push(newEthereumAcc);

    }
}

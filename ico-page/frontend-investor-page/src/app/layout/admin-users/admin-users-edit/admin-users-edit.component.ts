import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {NgxSpinnerService} from 'ngx-spinner';
import {DomSanitizer} from '@angular/platform-browser';
import {User} from '../user';
import {AdminUsersService} from '../admin-users.service';
import {UpdateAdminUsersUploadService} from '../update-admin-users-upload.service';
import {AddAdminUserUploadService} from '../add-admin-user-upload.service';
import {Utils} from '../../../shared/utilites/Utils';
import {FormControl} from '@angular/forms';

/**
 * Created by Yuri Nikiforov.
 * Date: 22.10.2019
 * Time: 20:45
 */

@Component({
    selector: 'app-admin-users-edit',
    templateUrl: './admin-users-edit.component.html',
    styleUrls: ['./admin-users-edit.component.scss']
})
export class AdminUsersEditComponent implements OnInit, OnChanges, AfterViewInit {
    @Input() id: number; // TODO Добавить представление пользователей
    @Output() backListEmit = new EventEmitter<string>();
    @Output() backItemEmit = new EventEmitter<string>();


    fileToUpload: File = null;
    imgSrc: any;
    @ViewChild('uploadFile') uploadEl: ElementRef;

    requestItemData: User;

    show = false;


    keyword = 'name';

    username: string;

    constructor(
        private updateItemUploadService: UpdateAdminUsersUploadService,
        private addItemUploadService: AddAdminUserUploadService,
        private listService: AdminUsersService,
        private spinner: NgxSpinnerService,
        private sanitizer: DomSanitizer,
        private utils: Utils
    ) {

    }

    ngAfterViewInit(): void {
        this.uploadEl.nativeElement.value = null;
    }

    ngOnInit(): void {
        this.username = localStorage.getItem('username');
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.init();
    }

    init() {
        this.clearUploadParams();
        if (this.id) {
            this.spinner.show();
            this.listService.getItemDetail(this.id)
                .subscribe(value => {
                    this.requestItemData = value as User;
                    if (this.requestItemData.imageContent) {
                        this.imgSrc = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + this.requestItemData.imageContent);
                    }

                    this.spinner.hide();
                }, error => {
                    this.spinner.hide();
                });
        }
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

    onSubmitItemUpdate() {
        const [errorsExist, message] =
            this.utils.ifUserDataErrorsExist(this.requestItemData);
        if (errorsExist) {
            alert(message);
            return;
        }

        this.spinner.show();
        this.updateItemUploadService.putItemUpdate(this.fileToUpload, this.requestItemData)
            .toPromise()
            .then((value: HttpResponse<Object>) => {
                    this.spinner.hide();
                    alert('Restaurant is updated');
                    /*alert('Server pull response: status: ' + value.status +
                        ' status text: ' + value.statusText);*/
                    this.clearUploadParams();
                    this.onBackList();
                },
                (reason: Error) => {
                    this.spinner.hide();
                    alert('Server pull error: ' + reason.message);
                    this.clearUploadParams();
                });
    }

    clearUploadParams() {
        this.fileToUpload = null;
        this.imgSrc = null;
        this.uploadEl.nativeElement.value = null;
        this.requestItemData = new User();
    }


    onInputCleared() {

    }

    onBackList() {
        this.backListEmit.emit('backList');
    }

    onBackItem() {
        this.backItemEmit.emit('backItem');
    }

    onDelete() {
        if (confirm('Are you sure to delete user?')) {
            if (this.id) {
                this.spinner.show();
                this.listService.deleteItem(this.id)
                    .subscribe(value => {
                        alert('Restaurant is deleted');
                        this.spinner.hide();
                        this.onBackItem();
                    }, error => {
                        this.spinner.hide();
                    });
            }
        }
    }



}

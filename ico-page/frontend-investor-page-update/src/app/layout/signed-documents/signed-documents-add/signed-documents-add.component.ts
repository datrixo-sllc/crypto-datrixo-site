import {
    AfterViewInit,
    Component, ElementRef,
    EventEmitter,
    OnInit,
    Output, ViewChild
} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {NgxSpinnerService} from 'ngx-spinner';
import {DomSanitizer} from '@angular/platform-browser';
import {SignedDocument} from '../signed-document';
import {SignedDocumentsService} from '../signed-documents.service';
import {UpdateSignedDocumentsUploadService} from '../update-signed-documents-upload.service';
import {AddSignedDocumentsUploadService} from '../add-signed-documents-upload.service';
import {AdminUsersService} from '../../admin-users/admin-users.service';
import {UserList} from '../../admin-users/user-list';
import {User} from '../../admin-users/user';
import {Router} from '@angular/router';
import {Utils} from '../../../shared/utilites/Utils';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { APP_CONFIG, AppConfig } from '../../../app.config';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

/**
 * Created by Yuri Nikiforov.
 * Date: 22.10.2019
 * Time: 20:45
 */

@Component({
    selector: 'app-signed-documents-add',
    standalone: true,
    imports: [
        FormsModule, 
        CommonModule, 
        MatDatepickerModule,
        MatInputModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatIconModule,
        MatButtonModule
    ],
    providers: [
        AdminUsersService,
        { provide: APP_CONFIG, useValue: AppConfig }
    ],
    templateUrl: './signed-documents-add.component.html',
    styleUrls: ['./signed-documents-add.component.scss']
})
export class SignedDocumentsAddComponent implements OnInit, AfterViewInit {
    @Output() backListEmit = new EventEmitter<string>();

    fileToUpload: File = null;
    imgSrc: any = null;
    @ViewChild('uploadFile') uploadEl: ElementRef;

    requestItemData: SignedDocument;
    users: User[] = [];
    selectedDate: Date;
    minDate: Date;
    maxDate: Date;
    startDate: Date;

    constructor(
        private updateItemUploadService: UpdateSignedDocumentsUploadService,
        private addItemUploadService: AddSignedDocumentsUploadService,
        private listService: SignedDocumentsService,
        public adminUsersService: AdminUsersService,
        private spinner: NgxSpinnerService,
        private sanitizer: DomSanitizer,
        private _router: Router,
        private utils: Utils
    ) {
    }

    ngAfterViewInit(): void {
        if (this.uploadEl?.nativeElement) {
            this.uploadEl.nativeElement.value = null;
        }
    }

    ngOnInit(): void {
        this.initDateLimits();
        this.initUploadParams();
        this.loadUsers();
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

    initDateLimits(): void {
        const today = new Date();
        const currentYear = today.getFullYear();
        // Минимальная дата - 50 лет назад
        this.minDate = new Date(currentYear - 50, 0, 1);
        // Максимальная дата - сегодня
        this.maxDate = today;
        // Начальная дата для календаря
        this.startDate = new Date(currentYear - 10, 0, 1);
    }

    loadUsers(): void {
        // Проверяем наличие токена перед запросом
        const token = localStorage.getItem('token');
        if (!token) {
            console.warn('Token not found, skipping users load');
            this.users = [];
            return;
        }

        this.adminUsersService.getList()
            .subscribe({
                next: (response: any) => {
                    // Убеждаемся, что response является массивом или объектом с users
                    if (Array.isArray(response)) {
                        // Если ответ - массив пользователей напрямую
                        this.users = response;
                    } else if (response && response.users && Array.isArray(response.users)) {
                        // Если ответ - объект с полем users
                        this.users = response.users;
                    } else if (response && Array.isArray((response as UserList).users)) {
                        // Если ответ - UserList
                        this.users = (response as UserList).users;
                    } else {
                        console.warn('Unexpected response format:', response);
                        this.users = [];
                    }
                },
                error: (error: any) => {
                    console.error('Error loading users:', error);
                    // Если ошибка 401 (Unauthorized), возможно токен истек
                    if (error.status === 401) {
                        console.warn('Unauthorized access - token may be expired');
                        // Не перенаправляем на логин здесь, так как это может быть нормальной ситуацией
                        // Пользователь может не иметь прав на просмотр списка пользователей
                    }
                    this.users = [];
                }
            });
    }

    handleFileInput(files: FileList) {
        if (files.item(0).size > 1000000) {
            alert('Image file must be less then 1Mb');
            if (this.uploadEl?.nativeElement) {
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
        const conf = confirm('Add Item?');
        if (conf) {
            if (this.fileToUpload === null) {
                alert('Load file, please');
            } else if (!this.requestItemData || !this.requestItemData.user
                || !this.selectedDate
            ) {
                alert('Fill form, please');
            } else {
                // Используем выбранную дату
                this.requestItemData.loadDate = this.selectedDate;
                
                this.spinner.show();
                this.addItemUploadService.postItemAddByAdmin(this.fileToUpload, this.requestItemData)
                    .toPromise()
                    .then((value: HttpResponse<Object>) => {
                            this.spinner.hide();
                            alert('Document is added');
                            /*alert('Server pull response: status: ' + value.status +
                                ' status text: ' + value.statusText +
                                ' location: ' + value.headers.get('Location'));*/
                            this.clearUploadParams();
                            this.onBackList();
                        },
                        (reason: Error) => {
                            this.spinner.hide();
                            alert('Server pull error: ' + reason.message);
                            this.clearUploadParams();
                        });

            }
        }
    }

    clearUploadParams() {
        this.fileToUpload = null;
        this.imgSrc = null;
        if (this.uploadEl?.nativeElement) {
            this.uploadEl.nativeElement.value = null;
        }
        this.requestItemData = new SignedDocument();
        this.selectedDate = null;
    }

    initUploadParams() {
        this.fileToUpload = null;
        this.imgSrc = null;
        this.requestItemData = new SignedDocument();
        this.requestItemData.docType = 'agreement';
        this.selectedDate = null;
    }

    onBackList() {
        this.backListEmit.emit('backList');
    }

    onDateChange(event: any): void {
        if (event.value) {
            this.selectedDate = event.value;
            this.requestItemData.loadDate = event.value;
        }
    }
}

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

@Component({
    selector: 'app-admin-users-detail',
    templateUrl: './admin-users-detail.component.html',
    styleUrls: ['./admin-users-detail.component.scss']
})
export class AdminUsersDetailComponent implements OnChanges { //TODO Добавить представление периодов активности
    @Input() id: number; //TODO Добавить представление пользователей
    @Output() closeEmit = new EventEmitter<string>();
    @Output() editEmit = new EventEmitter<string>();
    item: User;
    zipcode: string;
    name: string;
    description: string;
    imgSrc: any;

    constructor(private listService: AdminUsersService,
                private spinner: NgxSpinnerService,
                private sanitizer: DomSanitizer
    ) {

    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.id) {
            this.spinner.show();
            this.listService.getItemDetail(this.id)
                .subscribe(value => {
                    this.item = value as User;
                    this.imgSrc = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + this.item.imageContent);
                    this.spinner.hide();
                }, error => {
                    this.spinner.hide();
                });
        }
    }

    onClose() {
        this.closeEmit.emit('close');
    }

    onEdit() {
        this.editEmit.emit('edite');
    }

    onDelete() {
        if (confirm('Are you sure to delete restaurant?')) {
            if (this.id) {
                this.spinner.show();
                this.listService.deleteItem(this.id)
                    .subscribe(value => {
                        alert('Restaurant is deleted');
                        this.spinner.hide();
                        this.closeEmit.emit('close');
                    }, error => {
                        this.spinner.hide();
                    });
            }
        }
    }

}

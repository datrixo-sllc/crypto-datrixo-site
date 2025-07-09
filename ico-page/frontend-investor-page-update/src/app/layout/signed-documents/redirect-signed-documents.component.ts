/**
 * Created by Yuri Nikiforov.
 * Date: 22.09.2019
 * Time: 18:46
 */
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-redirect-signed-documents',
    template: ''
})
export class RedirectSignedDocumentsComponent implements OnInit {

    constructor(private router: Router) {
    }

    ngOnInit() {
        this.router.navigate(['/signed-documents']);
    }

}

/**
 * Created by Yuri Nikiforov.
 * Date: 16.08.2019
 * Time: 13:41
 */
import {Injectable} from '@angular/core';

@Injectable()
export class Utils {

    public clearLocalStorage(): void {
        if (localStorage.getItem('authorityStatus') != null) {
            localStorage.removeItem('authorityStatus');
        }
        if (localStorage.getItem('userRole') != null) {
            localStorage.removeItem('userRole');
        }
        if (localStorage.getItem('username') != null) {
            localStorage.removeItem('username');
        }
        if (localStorage.getItem('isLoggedin') != null) {
            localStorage.removeItem('isLoggedin');
        }
    }
}

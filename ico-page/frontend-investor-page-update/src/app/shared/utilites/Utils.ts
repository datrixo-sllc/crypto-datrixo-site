/**
 * Created by Yuri Nikiforov.
 * Date: 16.08.2019
 * Time: 13:41
 */
import {Injectable} from '@angular/core';
import {User} from '../../layout/admin-users/user';

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

    /*
*  Check rules of filling of users
* */
    public ifUserDataErrorsExist(requestItemData: User) {
        const errorExist = true;

        /*if (!requestItemData || !requestItemData.zipcode || !requestItemData.name
            || !regionCode || !phoneLocal
            || (regionCodeInput.invalid && (regionCodeInput.dirty || regionCodeInput.touched))
            || (phoneLocalInput.invalid && (phoneLocalInput.dirty || phoneLocalInput.touched))) {
            return [errorExist, 'Fill form, please'];
        }

        if (activityPeriods.length > 0 && activityPeriods.filter(value => value.weekDay === undefined
            || value.startH === undefined || value.startMin === undefined
            || value.endH === undefined || value.endMin === undefined).length > 0) {
            return [errorExist, 'Any periods are not filled completely.'];
        }

        if (activityPeriods.length > 1 && activityPeriods.filter(value =>
            value.weekDay.toString() === '0').length > 0) {
            return [errorExist, 'You may insert only one period if it has All week days option.'];
        }

        const wArr = activityPeriods.map(value => +value.weekDay);
        if (new Set(wArr).size !== wArr.length) {
            return [errorExist, 'Periods have dublicates of week days! Correct, please.'];
        }

        if (!activityPeriods
            .map(value =>
                ((+value.startH) * 60 + (+value.startMin)) < ((+value.endH) * 60 + (+value.endMin)))
            .every(value => value)) {
            return [errorExist, 'Any periods have start time more then finish time! Correct, please.'];
        }*/


        return [!errorExist, null];
    }

}

import {Injectable} from '@angular/core';

/**
 * Created by Yuri Nikiforov.
 * Date: 05.10.2020
 * Time: 18:35
 */
@Injectable()
export class GlobalApp {

    constructor() {
    }

    public localStorageItem(id: string): string {
        return localStorage.getItem(id);
    }
}

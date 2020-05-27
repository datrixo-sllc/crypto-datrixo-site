/**
 * Created by Yuri Nikiforov.
 * Date: 27.05.2020
 * Time: 17:07
 */
export class GlobalApp {
    constructor() {
    }

    public localStorageItem(key: string): string {
        return localStorage.getItem(key);
    }
}

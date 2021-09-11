import {Organization} from './organization';
import {Account} from './account';

/**
 * Created by Yuri Nikiforov.
 * Date: 06.10.2020
 * Time: 12:13
 */
export class User {
    id: number;
    username: string;
    password: string;
    role: string;
    userType: string;
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    imageContentId: number;
    imageContent: any;
    organization: Organization;
    accounts: Account[];

    init (role: string, userType: string, title: string, organization: Organization, accounts: Account[]) {
        this.role = role;
        this.userType = userType;
        this.title = title;
        this.organization = organization;
        this.accounts = accounts;
    }
}

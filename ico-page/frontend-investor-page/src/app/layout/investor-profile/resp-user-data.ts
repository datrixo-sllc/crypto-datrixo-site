/**
 * Created by Yuri Nikiforov.
 * Date: 08.06.2019
 * Time: 21:08
 */
import {Holder} from './holder';

export class RespUserData {
    username: string;
    title: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    organizationName: string;
    incorporateDate: Date = new Date();
    opencorporateId: string;
    organizationPhone: string;
    organizationEmail: string;
    streetAddress: string;
    city: string;
    zip: string;
    state: string;
    country: string;
    imageContent: any;
    holders: Holder[] = [];
}

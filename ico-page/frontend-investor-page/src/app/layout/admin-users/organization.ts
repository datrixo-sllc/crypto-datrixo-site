/**
 * Created by Yuri Nikiforov.
 * Date: 21.10.2020
 * Time: 15:49
 */
import {Country} from './country';

export class Organization {
    id: number;
    companyName: string;
    incorporateDate: Date;
    opencorporatesId: string;
    email: string;
    phone: string;
    streetAddress: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}

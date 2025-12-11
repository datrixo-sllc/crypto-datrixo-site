/**
 * Created by Yuri Nikiforov.
 * Date: 06.10.2020
 * Time: 12:13
 */

import { User } from "../admin-users/user";

export class SignedDocument {
    id: number;
    user?: User;
    accountAddress?: string;
    holderAccount?: any;
    docType: string;
    loadDate: Date;
    content?: number[]; // byte[] массив содержимого файла
    fileName?: string; // имя файла для определения типа
    mimeType?: string; // MIME тип файла
}

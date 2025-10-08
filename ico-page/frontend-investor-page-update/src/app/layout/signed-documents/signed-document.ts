/**
 * Created by Yuri Nikiforov.
 * Date: 06.10.2020
 * Time: 12:13
 */

export class SignedDocument {
    id: number;
    username: string;
    accountAddress: string;
    docType: string;
    loadDate: Date;
    content?: number[]; // byte[] массив содержимого файла
    fileName?: string; // имя файла для определения типа
    mimeType?: string; // MIME тип файла
}

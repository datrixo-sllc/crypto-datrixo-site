/**
 * Created by Yuri Nikiforov.
 * Date: 06.10.2020
 * Time: 12:13
 */

export class DocumentForDownload {
    id: number;
    docType: string;
    startDate: Date;
    actual: boolean = false;
    content?: number[]; // byte[] массив содержимого файла
    fileName?: string; // имя файла для определения типа
    mimeType?: string; // MIME тип файла
}

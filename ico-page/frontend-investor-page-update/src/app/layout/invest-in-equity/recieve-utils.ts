import {Injectable} from '@angular/core';
import {FileSaverService} from 'ngx-filesaver';
import {DocumentForDownload} from '../documents-for-download/document-for-download';

@Injectable()
export class RecieveUtils {

    constructor(private fileSaverService: FileSaverService) {
    }

    public saveDocumentForDownload(document: DocumentForDownload, defaultFileName: string): void {
        if (!document?.content) {
            alert('Server do not pull file');
            return;
        }

        try {
            const byteArray = this.convertToUint8Array(document.content);
            if (byteArray.length === 0) {
                alert('Server do not pull file');
                return;
            }

            const mimeType = document.mimeType || this.detectMimeType(byteArray, document, defaultFileName);
            const blob = new Blob([byteArray], { type: mimeType });
            let fileName = document.fileName || defaultFileName;
            if (!fileName.includes('.')) {
                fileName += mimeType === 'application/pdf' ? '.pdf' : '';
            }
            this.fileSaverService.save(blob, fileName);
        } catch (e) {
            console.error('Failed to save document', e);
            alert('Server do not pull file');
        }
    }

    private detectMimeType(byteArray: Uint8Array, document: DocumentForDownload, defaultFileName: string): string {
        if (byteArray.length >= 4) {
            const header = String.fromCharCode(byteArray[0], byteArray[1], byteArray[2], byteArray[3]);
            if (header === '%PDF') {
                return 'application/pdf';
            }
        }
        if (document.docType?.toLowerCase().includes('pdf') || defaultFileName.endsWith('.pdf')) {
            return 'application/pdf';
        }
        return 'application/octet-stream';
    }

    private convertToUint8Array(data: number[] | string | Uint8Array | any): Uint8Array {
        if (data instanceof Uint8Array) {
            return data;
        }
        if (Array.isArray(data)) {
            return new Uint8Array(data);
        }
        if (typeof data === 'string') {
            const binaryString = atob(data);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            return bytes;
        }
        throw new Error('Unsupported content format');
    }
}

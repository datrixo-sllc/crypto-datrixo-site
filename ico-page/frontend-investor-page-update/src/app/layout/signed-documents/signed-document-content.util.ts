import {SignedDocument} from './signed-document';

type DocumentContent = number[] | string[] | string | Uint8Array;

function isNumberArray(data: number[] | string[]): data is number[] {
    return data.length > 0 && typeof data[0] === 'number';
}

function isStringArray(data: number[] | string[]): data is string[] {
    return data.length > 0 && typeof data[0] === 'string';
}

function decodeStringContent(joinedString: string): Uint8Array {
    try {
        const binaryString = atob(joinedString);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes;
    } catch {
        const hexString = joinedString.replace(/[^0-9A-Fa-f]/g, '');
        const bytes = new Uint8Array(hexString.length / 2);
        for (let i = 0; i < hexString.length; i += 2) {
            bytes[i / 2] = parseInt(hexString.substr(i, 2), 16);
        }
        return bytes;
    }
}

export function convertToUint8Array(data: DocumentContent): Uint8Array {
    if (data instanceof Uint8Array) {
        return data;
    }

    if (typeof data === 'string') {
        return decodeStringContent(data);
    }

    if (Array.isArray(data)) {
        if (data.length === 0) {
            return new Uint8Array(0);
        }
        if (isNumberArray(data)) {
            return new Uint8Array(data);
        }
        if (isStringArray(data)) {
            return decodeStringContent(data.join(''));
        }
    }

    throw new Error('Unsupported document content format');
}

export function getSignedDocumentMimeType(doc: SignedDocument, byteArray?: Uint8Array): string {
    if (doc.mimeType) {
        return doc.mimeType;
    }

    if (byteArray && byteArray.length > 10) {
        const textStart = Array.from(byteArray.slice(0, Math.min(100, byteArray.length)))
            .map(b => String.fromCharCode(b))
            .join('');

        if (textStart.trim().startsWith('<svg') || textStart.trim().startsWith('<?xml')) {
            return 'image/svg+xml';
        }

        const header = String.fromCharCode(byteArray[0], byteArray[1], byteArray[2], byteArray[3]);
        if (header === '%PDF') {
            return 'application/pdf';
        }
        if (header === '\x89PNG') {
            return 'image/png';
        }
        if (byteArray[0] === 0xFF && byteArray[1] === 0xD8) {
            return 'image/jpeg';
        }
    }

    if (doc.fileName) {
        const extension = doc.fileName.toLowerCase().split('.').pop();
        switch (extension) {
            case 'pdf':
                return 'application/pdf';
            case 'png':
                return 'image/png';
            case 'jpg':
            case 'jpeg':
                return 'image/jpeg';
            case 'gif':
                return 'image/gif';
            case 'webp':
                return 'image/webp';
            case 'svg':
                return 'image/svg+xml';
            default:
                return 'application/octet-stream';
        }
    }

    if (doc.docType?.toLowerCase().includes('svg')) {
        return 'image/svg+xml';
    }

    return 'application/pdf';
}

export function openSignedDocumentInNewWindow(doc: SignedDocument): void {
    if (!doc?.content?.length) {
        alert('Document content is not available');
        return;
    }

    try {
        const byteArray = convertToUint8Array(doc.content);
        const mimeType = getSignedDocumentMimeType(doc, byteArray);
        const buffer = byteArray.buffer.slice(
            byteArray.byteOffset,
            byteArray.byteOffset + byteArray.byteLength
        ) as ArrayBuffer;
        const blob = new Blob([buffer], {type: mimeType});

        if (blob.size === 0) {
            alert('Document is empty');
            return;
        }

        const url = URL.createObjectURL(blob);
        const newWindow = window.open(url, '_blank');

        if (!newWindow) {
            alert('Please allow pop-ups to view the document');
            URL.revokeObjectURL(url);
            return;
        }

        setTimeout(() => URL.revokeObjectURL(url), 60000);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        alert('Failed to open document: ' + message);
    }
}

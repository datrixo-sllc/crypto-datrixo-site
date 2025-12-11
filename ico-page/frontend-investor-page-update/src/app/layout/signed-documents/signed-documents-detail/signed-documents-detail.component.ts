/**
 * Created by Yuri Nikiforov.
 * Date: 06.08.2019
 * Time: 12:17
 */
import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxSpinnerService} from 'ngx-spinner';
import {DomSanitizer} from '@angular/platform-browser';
import {SignedDocument} from '../signed-document';
import {SignedDocumentsService} from '../signed-documents.service';

@Component({
    selector: 'app-signed-documents-detail',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './signed-documents-detail.component.html',
    styleUrls: ['./signed-documents-detail.component.scss']
})
export class SignedDocumentsDetailComponent implements OnChanges {
    @Input() id: number;
    @Output() closeEmit = new EventEmitter<string>();
    @Output() editEmit = new EventEmitter<string>();
    item: SignedDocument;
    loadingError: boolean = false;
    etherNet = 'etherscan.io';

    constructor(private listService: SignedDocumentsService,
                private spinner: NgxSpinnerService,
                private sanitizer: DomSanitizer
    ) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log('ngOnChanges вызван с ID:', this.id);
        this.loadingError = false; // Сбрасываем ошибку при новом запросе
        
        if (this.id) {
            this.spinner.show();
            this.listService.getItemDetail(this.id)
                .pipe()
                .subscribe({
                    next: (value: any) => {
                        console.log('Данные получены:', value);
                        this.item = value as SignedDocument;
                        this.loadingError = false;
                        this.spinner.hide();
                    },
                    error: error => {
                        console.error('Ошибка загрузки данных:', error);
                        this.loadingError = true;
                        this.item = null; // Очищаем item при ошибке
                        this.spinner.hide();
                    },
                });
        } else {
            console.log('ID не передан');
            this.item = null;
        }
    }

    onClose() {
        this.closeEmit.emit('close');
    }

    onEdit() {
        this.editEmit.emit('edite');
    }

    onDelete() {
        if (confirm('Are you sure to delete Item?')) {
            if (this.id) {
                this.spinner.show();
                this.listService.deleteItem(this.id)
                    .subscribe(value => {
                        alert('Item is deleted');
                        this.closeEmit.emit('close');
                        this.spinner.hide();
                    }, error => {
                        this.spinner.hide();
                    });
            }
        }
    }

    /**
     * Открывает документ в новой вкладке браузера
     */
    onViewDocument() {
        if (!this.item || !this.item.content) {
            alert('Содержимое документа недоступно');
            return;
        }

        try {
            // Конвертируем данные в byteArray сначала
            const byteArray = this.convertToUint8Array(this.item.content);
            
            // Определяем MIME тип на основе заголовков файла
            const mimeType = this.getMimeType(byteArray);
            console.log('Определенный MIME тип для просмотра:', mimeType);
            
            // Для SVG создаем blob с правильным типом
            const blob = new Blob([new Uint8Array(byteArray)], { type: mimeType });
            
            // Проверяем размер blob
            if (blob.size === 0) {
                alert('Ошибка: Документ имеет нулевой размер');
                return;
            }
            
            // Создаем URL для blob
            const url = URL.createObjectURL(blob);
            
            // Открываем в новой вкладке
            const newWindow = window.open(url, '_blank');
            
            // Если окно заблокировано, показываем сообщение
            if (!newWindow) {
                alert('Пожалуйста, разрешите открытие всплывающих окон для просмотра документа');
                URL.revokeObjectURL(url);
                return;
            }
            
            // Очищаем URL через некоторое время (опционально)
            setTimeout(() => {
                URL.revokeObjectURL(url);
            }, 60000); // 60 секунд
            
        } catch (error) {
            console.error('Ошибка при открытии документа:', error);
            alert('Не удалось загрузить документ: ' + (error.message || 'Неизвестная ошибка'));
        }
    }

    /**
     * Определяет MIME тип файла на основе расширения, типа документа или заголовков файла
     */
    private getMimeType(byteArray?: Uint8Array): string {
        // Если MIME тип уже указан
        if (this.item.mimeType) {
            return this.item.mimeType;
        }

        // Проверяем содержимое на SVG (текстовый формат)
        if (byteArray && byteArray.length > 10) {
            // Преобразуем первые байты в строку для проверки текстовых форматов
            const textStart = Array.from(byteArray.slice(0, Math.min(100, byteArray.length)))
                .map(b => String.fromCharCode(b))
                .join('');
            
            console.log('Начало декодированного содержимого:', textStart.substring(0, 50));
            
            // SVG файлы начинаются с <svg или <?xml
            if (textStart.trim().startsWith('<svg') || textStart.trim().startsWith('<?xml')) {
                console.log('Обнаружен SVG файл по содержимому');
                return 'image/svg+xml';
            }
            
            // Проверяем бинарные заголовки
            const header = String.fromCharCode(byteArray[0], byteArray[1], byteArray[2], byteArray[3]);
            console.log('Заголовок файла:', header);
            
            // PDF файлы начинаются с %PDF
            if (header === '%PDF') {
                console.log('Обнаружен PDF файл по заголовку');
                return 'application/pdf';
            }
            
            // PNG файлы начинаются с PNG
            if (header === '\x89PNG') {
                console.log('Обнаружен PNG файл по заголовку');
                return 'image/png';
            }
            
            // JPEG файлы начинаются с FF D8
            if (byteArray[0] === 0xFF && byteArray[1] === 0xD8) {
                console.log('Обнаружен JPEG файл по заголовку');
                return 'image/jpeg';
            }
        }

        // Определяем по расширению файла
        if (this.item.fileName) {
            const extension = this.item.fileName.toLowerCase().split('.').pop();
            console.log('Расширение файла:', extension);
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

        // Определяем по типу документа
        if (this.item.docType) {
            const docTypeLower = this.item.docType.toLowerCase();
            console.log('Тип документа:', docTypeLower);
            if (docTypeLower.includes('svg')) {
                return 'image/svg+xml';
            }
            if (docTypeLower.includes('pdf') || docTypeLower.includes('document')) {
                return 'application/pdf';
            }
            if (docTypeLower.includes('image') || docTypeLower.includes('picture')) {
                return 'image/jpeg'; // по умолчанию JPEG
            }
        }

        // По умолчанию PDF
        console.log('Используется тип по умолчанию: application/pdf');
        return 'application/pdf';
    }

    /**
     * Конвертирует различные форматы данных в Uint8Array
     */
    private convertToUint8Array(data: any): Uint8Array {
        console.log('Конвертация данных:', data);
        
        if (data instanceof Uint8Array) {
            return data;
        }
        
        if (Array.isArray(data)) {
            // Проверяем, являются ли элементы числами
            if (data.length > 0 && typeof data[0] === 'number') {
                return new Uint8Array(data);
            }
            // Если это массив строк (base64 или hex)
            if (typeof data[0] === 'string') {
                const joinedString = data.join('');
                // Попробуем base64
                try {
                    const binaryString = atob(joinedString);
                    const bytes = new Uint8Array(binaryString.length);
                    for (let i = 0; i < binaryString.length; i++) {
                        bytes[i] = binaryString.charCodeAt(i);
                    }
                    return bytes;
                } catch (e) {
                    console.log('Не base64, пробуем hex');
                    // Попробуем hex
                    const hexString = joinedString.replace(/[^0-9A-Fa-f]/g, '');
                    const bytes = new Uint8Array(hexString.length / 2);
                    for (let i = 0; i < hexString.length; i += 2) {
                        bytes[i / 2] = parseInt(hexString.substr(i, 2), 16);
                    }
                    return bytes;
                }
            }
        }
        
        if (typeof data === 'string') {
            // Попробуем base64
            try {
                const binaryString = atob(data);
                const bytes = new Uint8Array(binaryString.length);
                for (let i = 0; i < binaryString.length; i++) {
                    bytes[i] = binaryString.charCodeAt(i);
                }
                return bytes;
            } catch (e) {
                console.log('Не base64 строка');
            }
        }
        
        throw new Error('Неподдерживаемый формат данных');
    }

    /**
     * Скачивает документ
     */
    onDownloadDocument() {
        if (!this.item || !this.item.content) {
            alert('Содержимое документа недоступно');
            return;
        }

        try {
            console.log('Исходные данные content:', this.item.content);
            console.log('Тип content:', typeof this.item.content);
            console.log('Длина content:', this.item.content.length);
            console.log('Первые 10 элементов:', this.item.content.slice(0, 10));

            // Используем новый метод конвертации
            let byteArray: Uint8Array;
            try {
                byteArray = this.convertToUint8Array(this.item.content);
            } catch (error) {
                console.error('Ошибка конвертации данных:', error);
                alert('Ошибка обработки данных документа: ' + error.message);
                return;
            }

            // Определяем MIME тип на основе заголовков файла
            const mimeType = this.getMimeType(byteArray);
            console.log('Определенный MIME тип:', mimeType);

            console.log('ByteArray после конвертации:', byteArray);
            console.log('Длина ByteArray:', byteArray.length);

            const blob = new Blob([new Uint8Array(byteArray)], { type: mimeType });
            console.log('Blob создан, размер:', blob.size);

            if (blob.size === 0) {
                alert('Ошибка: Blob имеет нулевой размер. Проверьте данные content.');
                return;
            }
            
            // Создаем ссылку для скачивания
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            
            // Определяем имя файла с правильным расширением
            let fileName = this.item.fileName || `document_${this.item.id}`;
            
            // Если нет расширения, добавляем его на основе MIME типа
            if (!fileName.includes('.')) {
                switch (mimeType) {
                    case 'application/pdf':
                        fileName += '.pdf';
                        break;
                    case 'image/png':
                        fileName += '.png';
                        break;
                    case 'image/jpeg':
                        fileName += '.jpg';
                        break;
                    case 'image/gif':
                        fileName += '.gif';
                        break;
                    case 'image/webp':
                        fileName += '.webp';
                        break;
                    case 'image/svg+xml':
                        fileName += '.svg';
                        break;
                }
            }
            
            link.download = fileName;
            
            console.log('Скачивание файла:', fileName, 'размер:', blob.size, 'байт');
            
            // Добавляем ссылку в DOM, кликаем и удаляем
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Очищаем URL
            URL.revokeObjectURL(url);
            
        } catch (error) {
            console.error('Ошибка при скачивании документа:', error);
            alert('Ошибка при скачивании документа: ' + error.message);
        }
    }

}

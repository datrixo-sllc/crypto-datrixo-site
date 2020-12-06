package com.datrixo.crypto_datrixo_site.ico_page.service;

import com.datrixo.crypto_datrixo_site.ico_page.dto.DocumentForDownloadDto;
import com.datrixo.crypto_datrixo_site.ico_page.dto.DocumentForDownloadListDto;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.util.DocumentType;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * Created by Yuri Nikiforov.
 * Date: 05.12.2020
 * Time: 20:34
 **/
public interface DocumentForDownloadService {
    DocumentForDownloadListDto getAll();
    DocumentForDownloadDto getActualDocument(DocumentType documentType);
    DocumentForDownloadDto getDocumentById(Long id);
    DocumentForDownloadDto save(MultipartFile file, DocumentForDownloadDto document) throws IOException;
    DocumentForDownloadDto update(MultipartFile file, DocumentForDownloadDto document) throws IOException;
    void delete(DocumentForDownloadDto document);
}

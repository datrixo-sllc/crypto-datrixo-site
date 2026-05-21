package com.datrixo.crypto_datrixo_site.ico_page.service;

import com.datrixo.crypto_datrixo_site.ico_page.dto.DocumentForDownloadDto;
import com.datrixo.crypto_datrixo_site.ico_page.dto.DocumentForDownloadListDto;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.DocumentForDownload;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.User;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.util.DocumentType;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.util.Role;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.repository.DocumentForDownloadRepository;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.EnumUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Created by Yuri Nikiforov.
 * Date: 05.12.2020
 * Time: 22:07
 **/
@Service
public class DocumentForDownloadServiceImpl implements DocumentForDownloadService {
    private final Logger LOGGER = LoggerFactory.getLogger(getClass());

    @Autowired
    private DocumentForDownloadRepository documentForDownloadRepository;
    @Autowired
    private UserService userService;

    @Override
    public DocumentForDownloadListDto getAll() {
        List<DocumentForDownload> documentForDownloads =
                documentForDownloadRepository.findAll();
        List<DocumentForDownloadDto> documentForDownloadDtos =
                documentForDownloads.stream()
                .map(s -> new DocumentForDownloadDto(s.getId(), s.getDocType().name(),
                        s.getStartDate(), s.getActual(), s.getContent()))
                .sorted((o1, o2) -> o1.getActual().compareTo(o2.getActual()) >= 0 ? -1 : +1)
                .collect(Collectors.toList());
        return new DocumentForDownloadListDto(documentForDownloadDtos);
    }

    @Override
    public DocumentForDownloadDto getActualDocument(DocumentType documentType) {
        Optional<DocumentForDownload> optionalDocumentForDownload =
        documentForDownloadRepository.findFirstByDocTypeOrderByStartDateDesc(documentType);
        DocumentForDownloadDto documentForDownloadDto = null;
        if (optionalDocumentForDownload.isPresent()) {
            documentForDownloadDto = new DocumentForDownloadDto(optionalDocumentForDownload.get().getId(),
                    optionalDocumentForDownload.get().getDocType().name(),
                    optionalDocumentForDownload.get().getStartDate(),
                    optionalDocumentForDownload.get().getActual(),
                    optionalDocumentForDownload.get().getContent());
        }
        return documentForDownloadDto;
    }

    @Override
    public DocumentForDownloadDto getDocumentById(Long id) {
        Optional<DocumentForDownload> optionalDocumentForDownload =
        documentForDownloadRepository.findFirstById(id);
        DocumentForDownloadDto documentForDownloadDto = null;
        if (optionalDocumentForDownload.isPresent()) {
            DocumentForDownload documentForDownload = optionalDocumentForDownload.get();
            documentForDownloadDto = new DocumentForDownloadDto(documentForDownload.getId(),
                    documentForDownload.getDocType().name(), documentForDownload.getStartDate(),
                    documentForDownload.getActual(),
                    documentForDownload.getContent());
        }
        return documentForDownloadDto;
    }

    @Override
    @Transactional
    public DocumentForDownloadDto save(MultipartFile file, DocumentForDownloadDto document) throws IOException {
        if (!userService.checkRoleForCurrentUser(Role.ADMIN)) {
            User currentUser = userService.getCurrentUser().orElse(null);
            LOGGER.error("Current user do not have admin privileges: {}",
                    currentUser != null ? currentUser.getUsername() : "");
            return null;
        }
        if (document == null) {
            LOGGER.error("document == null");
            return null;
        }
        if (document.getDocType() == null || !EnumUtils.isValidEnum(DocumentType.class, document.getDocType())) {
            LOGGER.error("(document.getDocType() == null or document.getDocType() not in DocumentType: {}", document);
            return null;
        }
        if (file == null) {
            LOGGER.error("file == null: {}", document);
            return null;
        }
        Optional<DocumentForDownload> optional = documentForDownloadRepository
                .findFirstByDocTypeOrderByStartDateDesc(DocumentType.valueOf(document.getDocType()));
        if (optional.isPresent() && optional.get().getStartDate().after(document.getStartDate())) {
            LOGGER.error("document.getStartDate() early then exist document: {}", document);
            return null;
        }
        if (document.getId() != null &&
                documentForDownloadRepository.findFirstById(document.getId()).isPresent()) {
            LOGGER.error("document.getId() != null and document with this Id is present: {}", document);
            return null;
        }
        DocumentForDownload documentForDownload =
                new DocumentForDownload(DocumentType.valueOf(document.getDocType()),
                        document.getStartDate(), document.getActual(), IOUtils.toByteArray(file.getInputStream()));
        if (document.getActual() != null && document.getActual().equals(true)) {
            documentForDownloadRepository.updateActualToFalseByDocType(DocumentType.valueOf(document.getDocType()));
        }
        documentForDownload = documentForDownloadRepository.save(documentForDownload);
        DocumentForDownloadDto documentForDownloadDto = new DocumentForDownloadDto();
        documentForDownloadDto.setId(documentForDownload.getId());
        return documentForDownloadDto;
    }

    @Override
    @Transactional
    public DocumentForDownloadDto update(MultipartFile file, DocumentForDownloadDto document) throws IOException {
        if (!userService.checkRoleForCurrentUser(Role.ADMIN)) {
            User currentUser = userService.getCurrentUser().orElse(null);
            LOGGER.error("Current user do not have admin privileges: {}",
                    currentUser != null ? currentUser.getUsername() : "");
            return null;
        }
        if (document == null) {
            LOGGER.error("document == null");
            return null;
        }
        if (document.getDocType() == null || !EnumUtils.isValidEnum(DocumentType.class, document.getDocType())) {
            LOGGER.error("(document.getDocType() == null or document.getDocType() not in DocumentType: {}", document);
            return null;
        }
        if (document.getId() == null) {
            LOGGER.error("document.getId() == null: {}", document);
            return null;
        }
        Optional<DocumentForDownload> optionalDocumentForDownload =
                documentForDownloadRepository.findFirstById(document.getId());
        if (!optionalDocumentForDownload.isPresent()) {
            LOGGER.error("Document for update not found: {}", document);
        }
        DocumentForDownload documentForDownload = optionalDocumentForDownload.get();
        documentForDownload.setDocType(DocumentType.valueOf(document.getDocType()));
        documentForDownload.setStartDate(document.getStartDate());
        if (file != null) {
            documentForDownload.setContent(IOUtils.toByteArray(file.getInputStream()));
        }
        if (document.getActual() != null && document.getActual().equals(true)) {
            documentForDownloadRepository.updateActualToFalseByDocType(DocumentType.valueOf(document.getDocType()));
        }
        documentForDownload.setActual(document.getActual());
        documentForDownload = documentForDownloadRepository.save(documentForDownload);
        DocumentForDownloadDto documentForDownloadDto = new DocumentForDownloadDto();
        documentForDownloadDto.setId(documentForDownload.getId());
        return documentForDownloadDto;
    }

    @Override
    @Transactional
    public DocumentForDownloadDto updateByDocument(DocumentForDownloadDto document) throws IOException {
        if (!userService.checkRoleForCurrentUser(Role.ADMIN)) {
            User currentUser = userService.getCurrentUser().orElse(null);
            LOGGER.error("Current user do not have admin privileges: {}",
                    currentUser != null ? currentUser.getUsername() : "");
            return null;
        }
        if (document == null) {
            LOGGER.error("document == null");
            return null;
        }
        if (document.getDocType() == null || !EnumUtils.isValidEnum(DocumentType.class, document.getDocType())) {
            LOGGER.error("(document.getDocType() == null or document.getDocType() not in DocumentType: {}", document);
            return null;
        }
        if (document.getId() == null) {
            LOGGER.error("document.getId() == null: {}", document);
            return null;
        }
        Optional<DocumentForDownload> optionalDocumentForDownload =
                documentForDownloadRepository.findFirstById(document.getId());
        if (!optionalDocumentForDownload.isPresent()) {
            LOGGER.error("Document for update not found: {}", document);
        }
        DocumentForDownload documentForDownload = optionalDocumentForDownload.get();
        documentForDownload.setDocType(DocumentType.valueOf(document.getDocType()));
        documentForDownload.setStartDate(document.getStartDate());
        if (document.getActual() != null && document.getActual().equals(true)) {
            documentForDownloadRepository.updateActualToFalseByDocType(DocumentType.valueOf(document.getDocType()));
        }
        documentForDownload.setActual(document.getActual());
        documentForDownload = documentForDownloadRepository.save(documentForDownload);
        DocumentForDownloadDto documentForDownloadDto = new DocumentForDownloadDto();
        documentForDownloadDto.setId(documentForDownload.getId());
        return documentForDownloadDto;

    }

    @Override
    public void delete(Long id) {
        if (!userService.checkRoleForCurrentUser(Role.ADMIN)) {
            User currentUser = userService.getCurrentUser().orElse(null);
            LOGGER.error("Current user do not have admin privileges: {}",
                    currentUser != null ? currentUser.getUsername() : "");
            return;
        }
        if (id == null) {
            LOGGER.error("document id == nul");
            return;
        }
        documentForDownloadRepository.deleteById(id);
    }

    @Override
    public DocumentForDownloadDto findActualByDocType(String doctype) {
        Optional<DocumentForDownload> optionalDocumentForDownload =
        documentForDownloadRepository.findFirstByActualTrueAndDocTypeEquals(DocumentType.valueOf(doctype));
        DocumentForDownloadDto documentForDownloadDto = null;
        if (optionalDocumentForDownload.isPresent()) {
            DocumentForDownload documentForDownload = optionalDocumentForDownload.get();
            documentForDownloadDto = new DocumentForDownloadDto(documentForDownload.getId(),
                    documentForDownload.getDocType().name(), documentForDownload.getStartDate(),
                    documentForDownload.getActual(),
                    documentForDownload.getContent());
        }
        return documentForDownloadDto;
    }
}

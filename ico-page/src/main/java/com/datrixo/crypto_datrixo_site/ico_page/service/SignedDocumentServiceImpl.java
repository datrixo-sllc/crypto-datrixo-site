package com.datrixo.crypto_datrixo_site.ico_page.service;

import com.datrixo.crypto_datrixo_site.ico_page.dto.*;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.DocumentForDownload;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.HolderAccount;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.SignedDocument;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.User;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.util.DocumentType;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.util.Role;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.repository.DocumentForDownloadRepository;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.repository.SignedDocumentRepository;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.EnumUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Created by Yuri Nikiforov.
 * Date: 07.12.2020
 * Time: 13:14
 **/
public class SignedDocumentServiceImpl implements SignedDocumentService {
    private final Logger LOGGER = LoggerFactory.getLogger(getClass());

    @Autowired
    private SignedDocumentRepository signedDocumentRepository;
    @Autowired
    private UserService userService;
    @Autowired
    HolderService holderService;

    @Override
    public SignedDocumentListDto findAllForCurrentUser(boolean getUser, boolean getHolder, boolean getContent) {
        Optional<User> optional = userService.getCurrentUser();
        if (optional.isPresent()) {
            return findAllByUser(optional.get(), getUser, getHolder, getContent);
        } else {
            return new SignedDocumentListDto();
        }
    }

    @Override
    public SignedDocumentListByHolderAccountDto findAllForHolderAccount(HolderAccount holderAccount,
                                                                        boolean getUser, boolean getHolder, boolean getContent) {
        SignedDocumentListByHolderAccountDto signedDocumentListByHolderAccountDto =
                new SignedDocumentListByHolderAccountDto(holderAccount.getAddress(), holderAccount.getId());
        Optional<List<SignedDocument>> optional = signedDocumentRepository.findAllByHolderAccount(holderAccount);
        if (optional.isPresent()) {
            List<SignedDocumentDto> signedDocuments = optional.get().stream()
                    .map(signedDocument -> createSignedDocumentDto(signedDocument, getUser, getHolder, getContent))
                    .collect(Collectors.toList());
            signedDocumentListByHolderAccountDto.setSignedDocumentDtoList(signedDocuments);
        }
        return signedDocumentListByHolderAccountDto;
    }

    @Override
    public SignedDocumentListDto findAllByUser(User user, boolean getUser, boolean getHolder, boolean getContent) {
        Optional<List<HolderAccount>> optional =  holderService.findHolderAccountsByUser(user);
        if (optional.isPresent()) {
            List<SignedDocumentListByHolderAccountDto> collect = optional.get().stream()
                    .map(holderAccount -> findAllForHolderAccount(holderAccount, getUser, getHolder, getContent))
                    .collect(Collectors.toList());
            return new SignedDocumentListDto(collect);
        } else {
            return new SignedDocumentListDto();
        }
    }

    private SignedDocumentDto createSignedDocumentDto (SignedDocument signedDocument,
                                                       boolean getUser, boolean getHolder, boolean getContent) {
        SignedDocumentDto signedDocumentDto = new SignedDocumentDto();
        signedDocumentDto.setId(signedDocument.getId());
        if (getUser && signedDocument.getUser() != null && signedDocument.getUser().getId() != null) {
            signedDocumentDto.setUser(new UserDto(signedDocument.getUser().getId()));
        }
        if (getHolder && signedDocument.getHolderAccount() != null && !signedDocument.getHolderAccount().getAddress().isEmpty()) {
            signedDocumentDto.setHolderAccount(new HolderDto(signedDocument.getHolderAccount().getAddress()));
        }

        signedDocumentDto.setDocType(signedDocument.getDocType().name());
        signedDocumentDto.setLoadDate(signedDocument.getLoadDate());
        if (getContent) {
            signedDocumentDto.setContent(signedDocument.getContent());
        }

        return signedDocumentDto;
    }

    @Override
    public SignedDocumentDto findById(Long id, boolean getUser, boolean getHolder, boolean getContent) {
        Optional<SignedDocument> optional = signedDocumentRepository.findById(id);
        if (optional.isPresent()) {
            SignedDocument signedDocument = optional.get();
            UserDto userDto = null;
            if (getUser && signedDocument.getUser() != null && signedDocument.getUser().getId() != null) {
                userDto = new UserDto(signedDocument.getUser().getId());
            }
            HolderDto holderDto = null;
            if (getHolder && signedDocument.getHolderAccount() != null && !signedDocument.getHolderAccount().getAddress().isEmpty()) {
                holderDto = new HolderDto(signedDocument.getHolderAccount().getAddress());
            }
           return new SignedDocumentDto(signedDocument.getId(), userDto, holderDto,
                    signedDocument.getDocType().name(), signedDocument.getLoadDate(),
                   getContent ? signedDocument.getContent() : null);
        } else {
            return null;
        }
    }

    @Override
    public SignedDocumentDto save(MultipartFile file, SignedDocumentDto document) throws IOException {
        if (document == null) {
            LOGGER.error("document == null");
            return null;
        }
        if (document.getDocType() == null || EnumUtils.isValidEnum(DocumentType.class, document.getDocType())) {
            LOGGER.error("(document.getDocType() == null or document.getDocType() not in DocumentType: {}", document);
            return null;
        }
        if (file == null) {
            LOGGER.error("file == null: {}", document);
            return null;
        }
        if (document.getId() != null &&
                signedDocumentRepository.findById(document.getId()).isPresent()) {
            LOGGER.error("document.getId() != null and document with this Id is present: {}", document);
            return null;
        }
        User curUser = userService.getCurrentUser().orElse(null);
        if (curUser == null) {
            LOGGER.error("Current user == null: {}", document);
            return null;
        }
        if (document.getHolderAccount() == null || document.getHolderAccount().getAddress() == null
        || document.getHolderAccount().getAddress().isEmpty()) {
            LOGGER.error("Holder account == null: {}", document);
            return null;
        }
        HolderAccount holderAccount = holderService.findByAddress(document.getHolderAccount().getAddress()).orElse(null);
        if (holderAccount == null) {
            LOGGER.error("Holder account with this address is not exist: {}", document);
            return null;
        }
        if (holderAccount.getUser() == null || holderAccount.getUser().getId() != curUser.getId()) {
            LOGGER.error("Current user do not have this holder account: {}", document);
            return null;
        }
        SignedDocument signedDocument =
                new SignedDocument(curUser, holderAccount,
                        DocumentType.valueOf(document.getDocType()), new Date(),
                        IOUtils.toByteArray(file.getInputStream()));
        signedDocument = signedDocumentRepository.save(signedDocument);
        SignedDocumentDto signedDocumentDto = new SignedDocumentDto(signedDocument.getId());
        return signedDocumentDto;
    }

    /*
    * Update only content and document type
    * */
    @Override
    public SignedDocumentDto update(MultipartFile file, SignedDocumentDto document) throws IOException {
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
        if (document.getDocType() == null || EnumUtils.isValidEnum(DocumentType.class, document.getDocType())) {
            LOGGER.error("(document.getDocType() == null or document.getDocType() not in DocumentType: {}", document);
            return null;
        }
        if (file == null) {
            LOGGER.error("file == null: {}", document);
            return null;
        }
        if (document.getId() == null) {
            LOGGER.error("document.getId() == null: {}", document);
            return null;
        }
        Optional<SignedDocument> optionalSignedDocument =
                signedDocumentRepository.findById(document.getId());
        if (!optionalSignedDocument.isPresent()) {
            LOGGER.error("Document for update not found: {}", document);
        }
        SignedDocument signedDocument = optionalSignedDocument.get();
        signedDocument.setDocType(DocumentType.valueOf(document.getDocType()));
        signedDocument.setContent(IOUtils.toByteArray(file.getInputStream()));
        signedDocument = signedDocumentRepository.save(signedDocument);
        SignedDocumentDto signedDocumentDto = new SignedDocumentDto(signedDocument.getId());
        return signedDocumentDto;
    }

    @Override
    public void delete(SignedDocumentDto document) {
        if (!userService.checkRoleForCurrentUser(Role.ADMIN)) {
            User currentUser = userService.getCurrentUser().orElse(null);
            LOGGER.error("Current user do not have admin privileges: {}",
                    currentUser != null ? currentUser.getUsername() : "");
            return;
        }
        if (document == null) {
            LOGGER.error("document == null");
            return;
        }
        if (document.getId() == null) {
            LOGGER.error("document.getId() == null: {}", document);
            return;
        }
        signedDocumentRepository.deleteById(document.getId());

    }
}

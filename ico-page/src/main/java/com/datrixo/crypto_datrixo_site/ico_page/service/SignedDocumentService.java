package com.datrixo.crypto_datrixo_site.ico_page.service;

import com.datrixo.crypto_datrixo_site.ico_page.dto.SignedDocumentDto;
import com.datrixo.crypto_datrixo_site.ico_page.dto.SignedDocumentListByHolderAccountDto;
import com.datrixo.crypto_datrixo_site.ico_page.dto.SignedDocumentListDto;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.HolderAccount;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.User;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * Created by Yuri Nikiforov.
 * Date: 07.12.2020
 * Time: 13:10
 **/
public interface SignedDocumentService {
    SignedDocumentListDto findAllForCurrentUser(boolean getUser, boolean getHolder, boolean getContent);
    SignedDocumentListByHolderAccountDto findAllForHolderAccount(HolderAccount holderAccount, boolean getUser, boolean getHolder, boolean getContent);
    SignedDocumentListDto findAllByUser(User user, boolean getUser, boolean getHolder, boolean getContent);
    SignedDocumentDto findById(Long id, boolean getUser, boolean getHolder, boolean getContent);
    SignedDocumentDto save(MultipartFile file, SignedDocumentDto document) throws IOException;
    SignedDocumentDto update(MultipartFile file, SignedDocumentDto document) throws IOException;
    void delete(SignedDocumentDto document);
}

package com.datrixo.crypto_datrixo_site.ico_page.dto;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Yuri Nikiforov.
 * Date: 28.09.2025
 * Time: 11:38
 **/
public class SignedDocumentAdmListDto {
    private List<SignedDocumentAdmDto> documents;

    public SignedDocumentAdmListDto() {
    }

    public SignedDocumentAdmListDto(List<SignedDocumentAdmDto> documents) {
        this.documents = documents;
    }

    public List<SignedDocumentAdmDto> getDocuments() {
        if (documents == null) {
            documents = new ArrayList<>();
        }
        return documents;
    }

    public void setDocuments(List<SignedDocumentAdmDto> documents) {
        this.documents = documents;
    }
}

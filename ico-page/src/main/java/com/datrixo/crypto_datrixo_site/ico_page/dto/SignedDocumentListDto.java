package com.datrixo.crypto_datrixo_site.ico_page.dto;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Yuri Nikiforov.
 * Date: 05.12.2020
 * Time: 21:40
 **/
public class SignedDocumentListDto {
    private List<SignedDocumentDto> documents;

    public SignedDocumentListDto() {
    }

    public SignedDocumentListDto(List<SignedDocumentDto> documents) {
        this.documents = documents;
    }

    public List<SignedDocumentDto> getDocuments() {
        if (documents == null) {
            documents = new ArrayList<>();
        }

        return documents;
    }

    public void setDocuments(List<SignedDocumentDto> documents) {
        this.documents = documents;
    }
}

package com.datrixo.crypto_datrixo_site.ico_page.dto;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Yuri Nikiforov.
 * Date: 05.12.2020
 * Time: 20:57
 **/
public class DocumentForDownloadListDto {
    private List<DocumentForDownloadDto> documents;

    public DocumentForDownloadListDto() {
    }

    public DocumentForDownloadListDto(List<DocumentForDownloadDto> documents) {
        this.documents = documents;
    }

    public List<DocumentForDownloadDto> getDocuments() {
        if (documents == null) {
            documents = new ArrayList<>();
        }
        return documents;
    }

    public void setDocuments(List<DocumentForDownloadDto> documents) {
        this.documents = documents;
    }
}

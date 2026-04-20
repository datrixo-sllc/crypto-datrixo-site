package com.datrixo.crypto_datrixo_site.ico_page.dto;

import java.util.Date;

/**
 * Created by Yuri Nikiforov.
 * Date: 05.12.2020
 * Time: 20:46
 **/
public class DocumentForDownloadDto {
    private Long id;
    private String docType;
    private Date startDate;
    private Boolean actual;
    private byte[] content;

    public DocumentForDownloadDto() {
    }

    public DocumentForDownloadDto(Long id, String docType, Date startDate, Boolean actual, byte[] content) {
        this.id = id;
        this.docType = docType;
        this.startDate = startDate;
        this.actual=actual;
        this.content = content;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDocType() {
        return docType;
    }

    public void setDocType(String docType) {
        this.docType = docType;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public byte[] getContent() {
        return content;
    }

    public Boolean getActual() {
        return actual;
    }

    public void setActual(Boolean actual) {
        this.actual = actual;
    }

    public void setContent(byte[] content) {
        this.content = content;
    }
}

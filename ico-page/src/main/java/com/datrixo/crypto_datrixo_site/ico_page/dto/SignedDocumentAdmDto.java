package com.datrixo.crypto_datrixo_site.ico_page.dto;

import java.util.Date;

/**
 * Created by Yuri Nikiforov.
 * Date: 28.09.2025
 * Time: 11:31
 **/
public class SignedDocumentAdmDto {
    private Long id;
    private String username;
    private String docType;
    private Date loadDate;
    private byte[] content;

    public SignedDocumentAdmDto() {
    }

    public SignedDocumentAdmDto(Long id) {
        this.id = id;
    }

    public SignedDocumentAdmDto(Long id, String username, String docType, Date loadDate, byte[] content) {
        this.id = id;
        this.username = username;
        this.docType = docType;
        this.loadDate = loadDate;
        this.content = content;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getDocType() {
        return docType;
    }

    public void setDocType(String docType) {
        this.docType = docType;
    }

    public Date getLoadDate() {
        return loadDate;
    }

    public void setLoadDate(Date loadDate) {
        this.loadDate = loadDate;
    }

    public byte[] getContent() {
        return content;
    }

    public void setContent(byte[] content) {
        this.content = content;
    }
}

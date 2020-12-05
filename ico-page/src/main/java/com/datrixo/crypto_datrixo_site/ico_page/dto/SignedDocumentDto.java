package com.datrixo.crypto_datrixo_site.ico_page.dto;

import java.util.Date;

/**
 * Created by Yuri Nikiforov.
 * Date: 05.12.2020
 * Time: 21:34
 **/
public class SignedDocumentDto {
    private Long id;
    private UserDto user;
    private String docType;
    private Date loadDate;
    private byte[] content;

    public SignedDocumentDto() {
    }

    public SignedDocumentDto(Long id, UserDto user, String docType, Date loadDate, byte[] content) {
        this.id = id;
        this.user = user;
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

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
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

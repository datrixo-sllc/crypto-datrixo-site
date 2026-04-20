package com.datrixo.crypto_datrixo_site.ico_page.mysql.model;

import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.util.DocumentType;
import org.springframework.data.jpa.domain.AbstractPersistable;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Lob;
import java.util.Date;

/**
 * Created by Yuri Nikiforov.
 * Date: 05.12.2020
 * Time: 19:41
 **/
@Entity
public class DocumentForDownload extends AbstractPersistable<Long> {
    @Enumerated(EnumType.STRING)
    private DocumentType docType;
    private Date startDate;
    private Boolean actual;
    @Lob
    private byte[] content;

    public DocumentForDownload() {
    }

    public DocumentForDownload(DocumentType docType, Date startDate, Boolean actual, byte[] content) {
        this.docType = docType;
        this.startDate = startDate;
        this.actual=actual;
        this.content = content;
    }

    public DocumentType getDocType() {
        return docType;
    }

    public void setDocType(DocumentType docType) {
        this.docType = docType;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Boolean getActual() {
        return actual;
    }

    public void setActual(Boolean actual) {
        this.actual = actual;
    }

    public byte[] getContent() {
        return content;
    }

    public void setContent(byte[] content) {
        this.content = content;
    }
}

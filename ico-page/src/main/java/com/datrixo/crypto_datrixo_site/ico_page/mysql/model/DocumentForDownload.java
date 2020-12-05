package com.datrixo.crypto_datrixo_site.ico_page.mysql.model;

import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.util.DocumentType;
import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Lob;
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
    @Lob
    private byte[] content;

    public DocumentForDownload() {
    }

    public DocumentForDownload(DocumentType docType, Date startDate, byte[] content) {
        this.docType = docType;
        this.startDate = startDate;
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

    public byte[] getContent() {
        return content;
    }

    public void setContent(byte[] content) {
        this.content = content;
    }
}

package com.datrixo.crypto_datrixo_site.ico_page.mysql.model;

import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.util.DocumentType;
import org.springframework.data.jpa.domain.AbstractPersistable;

<<<<<<< HEAD
import jakarta.persistence.*;
=======
import javax.persistence.*;
>>>>>>> 3099b2d1a06eafa6afbfc2bac1a9186c5afb0931
import java.util.Date;

/**
 * Created by Yuri Nikiforov.
 * Date: 05.12.2020
 * Time: 19:41
 **/
@Entity
public class SignedDocument extends AbstractPersistable<Long> {
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "holder_account_id")
    private HolderAccount holderAccount;
    @Enumerated(EnumType.STRING)
    private DocumentType docType;
    private Date loadDate;
    @Lob
    private byte[] content;

    public SignedDocument() {
    }

    public SignedDocument(User user, HolderAccount holderAccount, DocumentType docType, Date loadDate, byte[] content) {
        this.user = user;
        this.holderAccount = holderAccount;
        this.docType = docType;
        this.loadDate = loadDate;
        this.content = content;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public HolderAccount getHolderAccount() {
        return holderAccount;
    }

    public void setHolderAccount(HolderAccount holderAccount) {
        this.holderAccount = holderAccount;
    }

    public DocumentType getDocType() {
        return docType;
    }

    public void setDocType(DocumentType docType) {
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

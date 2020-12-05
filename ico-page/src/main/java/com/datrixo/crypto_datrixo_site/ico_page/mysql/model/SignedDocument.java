package com.datrixo.crypto_datrixo_site.ico_page.mysql.model;

import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.util.DocumentType;
import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.*;
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
    @Enumerated(EnumType.STRING)
    private DocumentType docType;
    private Date loadDate;
    @Lob
    private byte[] content;
}

package com.datrixo.crypto_datrixo_site.ico_page.mysql.model;

import org.springframework.data.jpa.domain.AbstractPersistable;

<<<<<<< HEAD
import jakarta.persistence.Entity;
import jakarta.persistence.Lob;
=======
import javax.persistence.Entity;
import javax.persistence.Lob;
>>>>>>> 3099b2d1a06eafa6afbfc2bac1a9186c5afb0931

/**
 * Created by Yuri Nikiforov.
 * Date: 29.05.2020
 * Time: 16:39
 **/
@Entity
public class ImageContent  extends AbstractPersistable<Long> {
    @Lob
    private byte[] content;

    public byte[] getContent() {
        return content;
    }

    public void setContent(byte[] content) {
        this.content = content;
    }}

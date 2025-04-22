package com.datrixo.crypto_datrixo_site.ico_page.mysql.model;

import org.springframework.data.jpa.domain.AbstractPersistable;

import jakarta.persistence.Entity;
import jakarta.persistence.Lob;

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

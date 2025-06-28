package com.datrixo.crypto_datrixo_site.ico_page.mysql.model;

import org.springframework.data.jpa.domain.AbstractPersistable;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
/**
 * Created by Yuri Nikiforov.
 * Date: 07.06.2019
 * Time: 9:51
 **/
@Entity
@Table(name = "country")
public class Country extends AbstractPersistable<Long> {
    private String name;
    private String code;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}

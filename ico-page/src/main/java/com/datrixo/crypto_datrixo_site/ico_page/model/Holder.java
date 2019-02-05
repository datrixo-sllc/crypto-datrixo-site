package com.datrixo.crypto_datrixo_site.ico_page.model;

import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.Entity;
import java.util.Date;

/**
 * Created by Yuri Nikiforov.
 * Date: 05.02.2019
 * Time: 12:59
 */
@Entity
public class Holder extends AbstractPersistable<Long> {
    private String address;
    private Date timeDate;
    private int shareTokens;

    public Holder() {
    }

    public Holder(String address, Date timeDate, int shareTokens) {
        this.address = address;
        this.timeDate = timeDate;
        this.shareTokens = shareTokens;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Date getTimeDate() {
        return timeDate;
    }

    public void setTimeDate(Date timeDate) {
        this.timeDate = timeDate;
    }

    public int getShareTokens() {
        return shareTokens;
    }

    public void setShareTokens(int shareTokens) {
        this.shareTokens = shareTokens;
    }
}

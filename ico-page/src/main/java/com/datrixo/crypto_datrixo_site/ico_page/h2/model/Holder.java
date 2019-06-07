package com.datrixo.crypto_datrixo_site.ico_page.h2.model;

import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.math.BigInteger;
import java.util.Date;

/**
 * Created by Yuri Nikiforov.
 * Date: 05.02.2019
 * Time: 12:59
 */
@Entity
@Table(name = "HOLDERS")
public class Holder extends AbstractPersistable<Long> {
    private String address;
    private Date timeDate;
    private BigInteger shareTokens;
    private double share;

    public Holder() {
    }

    public Holder(String address, Date timeDate, BigInteger shareTokens, double share) {
        this.address = address;
        this.timeDate = timeDate;
        this.shareTokens = shareTokens;
        this.share = share;
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

    public BigInteger getShareTokens() {
        return shareTokens;
    }

    public void setShareTokens(BigInteger shareTokens) {
        this.shareTokens = shareTokens;
    }

    public double getShare() {
        return share;
    }

    public void setShare(double share) {
        this.share = share;
    }
}

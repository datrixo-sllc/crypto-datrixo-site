package com.datrixo.crypto_datrixo_site.ico_page.mysql.model;

import org.springframework.data.jpa.domain.AbstractPersistable;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

/**
 * Created by Yuri Nikiforov.
 * Date: 07.06.2019
 * Time: 9:56
 **/
@Entity
@Table(name="holder_account")
public class HolderAccount extends AbstractPersistable<Long> {
    private String address;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;
    private Date createDate;
    private BigDecimal paidPrice;
    private Boolean initialInvest;

    public HolderAccount() {
    }

    public HolderAccount(String address, User user, Date createDate, BigDecimal paidPrice, Boolean initialInvest) {
        this.address = address;
        this.user = user;
        this.createDate = createDate;
        this.paidPrice = paidPrice;
        this.initialInvest = initialInvest;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public BigDecimal getPaidPrice() {
        return paidPrice;
    }

    public void setPaidPrice(BigDecimal paidPrice) {
        this.paidPrice = paidPrice;
    }

    public Boolean getInitialInvest() {
        return initialInvest;
    }

    public void setInitialInvest(Boolean initialInvest) {
        this.initialInvest = initialInvest;
    }
}

package com.datrixo.crypto_datrixo_site.ico_page.dto;

import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.User;

import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.math.BigDecimal;
import java.util.Date;

/**
 * Created by Yuri Nikiforov.
 * Date: 05.09.2021
 * Time: 11:43
 **/
public class HolderAccountDto {
    private Long id;
    private String address;
    private Long userId;
    private Date createDate;
    private BigDecimal paidPrice;
    private Boolean initialInvest;
    private String shareTokens;
    private String share;

    public HolderAccountDto() {
    }

    public HolderAccountDto(Long id, String address, Long userId, Date createDate, BigDecimal paidPrice, Boolean initialInvest) {
        this.id = id;
        this.address = address;
        this.userId = userId;
        this.createDate = createDate;
        this.paidPrice = paidPrice;
        this.initialInvest = initialInvest;
    }

    public HolderAccountDto(Long id, String address, Long userId, Date createDate, BigDecimal paidPrice, Boolean initialInvest,
                            String shareTokens, String share) {
        this(id, address, userId, createDate, paidPrice, initialInvest);
        this.shareTokens = shareTokens;
        this.share = share;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
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

    public String getShareTokens() {
        return shareTokens;
    }

    public void setShareTokens(String shareTokens) {
        this.shareTokens = shareTokens;
    }

    public String getShare() {
        return share;
    }

    public void setShare(String share) {
        this.share = share;
    }
}

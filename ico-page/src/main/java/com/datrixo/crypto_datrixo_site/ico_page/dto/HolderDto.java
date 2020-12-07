package com.datrixo.crypto_datrixo_site.ico_page.dto;

import java.util.Date;

/**
 * Created by Yuri Nikiforov.
 * Date: 05.02.2019
 * Time: 11:17
 */
public class HolderDto {
    private String address;
    private Date timeDate;
    private String shareTokens;
    private String paidPrice;
    private String share;

    public HolderDto() {
    }

    public HolderDto(String address) {
        this.address = address;
    }

    public HolderDto(String address, Date timeDate, String shareTokens, String paidPrice, String share) {
        this.address = address;
        this.timeDate = timeDate;
        this.shareTokens = shareTokens;
        this.paidPrice = paidPrice;
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

    public String getShareTokens() {
        return shareTokens;
    }

    public void setShareTokens(String shareTokens) {
        this.shareTokens = shareTokens;
    }

    public String getPaidPrice() {
        return paidPrice;
    }

    public void setPaidPrice(String paidPrice) {
        this.paidPrice = paidPrice;
    }

    public String getShare() {
        return share;
    }

    public void setShare(String share) {
        this.share = share;
    }
}

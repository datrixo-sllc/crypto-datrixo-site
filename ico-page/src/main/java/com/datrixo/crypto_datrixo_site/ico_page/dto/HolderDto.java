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

    public HolderDto() {
    }

    public HolderDto(String address, Date timeDate, String shareTokens) {
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

    public String getShareTokens() {
        return shareTokens;
    }

    public void setShareTokens(String shareTokens) {
        this.shareTokens = shareTokens;
    }
}

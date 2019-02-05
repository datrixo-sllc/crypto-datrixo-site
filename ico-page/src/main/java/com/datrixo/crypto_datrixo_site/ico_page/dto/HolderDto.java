package com.datrixo.crypto_datrixo_site.ico_page.dto;

/**
 * Created by Yuri Nikiforov.
 * Date: 05.02.2019
 * Time: 11:17
 */
public class HolderDto {
    private String address;
    private String timeDate;
    private String shareTokens;

    public HolderDto() {
    }

    public HolderDto(String address, String timeDate, String shareTokens) {
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

    public String getTimeDate() {
        return timeDate;
    }

    public void setTimeDate(String timeDate) {
        this.timeDate = timeDate;
    }

    public String getShareTokens() {
        return shareTokens;
    }

    public void setShareTokens(String shareTokens) {
        this.shareTokens = shareTokens;
    }
}

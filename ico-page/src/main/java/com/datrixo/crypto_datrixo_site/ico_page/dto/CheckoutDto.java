package com.datrixo.crypto_datrixo_site.ico_page.dto;

/**
 * Created by Yuri Nikiforov.
 * Date: 31.08.2021
 * Time: 14:59
 **/
public class CheckoutDto {
    private String priceId;
    private String successUrl;
    private String cancelUrl;

    public CheckoutDto() {
        super();
    }

    public String getPriceId() {
        return priceId;
    }

    public void setPriceId(String priceId) {
        this.priceId = priceId;
    }

    public String getSuccessUrl() {
        return successUrl;
    }

    public void setSuccessUrl(String successUrl) {
        this.successUrl = successUrl;
    }

    public String getCancelUrl() {
        return cancelUrl;
    }

    public void setCancelUrl(String cancelUrl) {
        this.cancelUrl = cancelUrl;
    }
}

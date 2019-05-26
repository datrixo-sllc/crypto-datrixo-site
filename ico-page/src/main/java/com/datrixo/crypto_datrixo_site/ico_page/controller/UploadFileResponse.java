package com.datrixo.crypto_datrixo_site.ico_page.controller;

/**
 * Created by Yuri Nikiforov.
 * Date: 26.05.2019
 * Time: 8:30
 **/
public class UploadFileResponse {
    private String status;

    public UploadFileResponse(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}

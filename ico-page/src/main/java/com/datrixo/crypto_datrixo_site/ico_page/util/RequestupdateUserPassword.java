package com.datrixo.crypto_datrixo_site.ico_page.util;

/**
 * Created by Yuri Nikiforov.
 * Date: 10.06.2019
 * Time: 17:22
 **/
public class RequestupdateUserPassword {
    private String newPassword;
    private String newPasswordReent;
    private String currentPassword;

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public String getNewPasswordReent() {
        return newPasswordReent;
    }

    public void setNewPasswordReent(String newPasswordReent) {
        this.newPasswordReent = newPasswordReent;
    }

    public String getCurrentPassword() {
        return currentPassword;
    }

    public void setCurrentPassword(String currentPassword) {
        this.currentPassword = currentPassword;
    }
}

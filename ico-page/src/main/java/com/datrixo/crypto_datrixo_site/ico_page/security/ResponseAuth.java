package com.datrixo.crypto_datrixo_site.ico_page.security;

/**
 * Created by Yuri Nikiforov.
 * Date: 20.05.2019
 * Time: 6:25
 **/
public class ResponseAuth {
    private String statusResponseAuth;
    private String role;
    private String token;

    public String getStatusResponseAuth() {
        return statusResponseAuth;
    }

    public void setStatusResponseAuth(String statusResponseAuth) {
        this.statusResponseAuth = statusResponseAuth;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}

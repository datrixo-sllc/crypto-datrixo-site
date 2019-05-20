package com.datrixo.crypto_datrixo_site.ico_page.security;


import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;

@Service
public class SecurityUtils {

    public static String passwordEncode(String user, String password){


        return SecurityUtils.sha1(user + ":" + password);
    }
    public static String sha1(String input) {
        SHA0 dig = new SHA0();
        byte[] result = new byte[0];
        try {
            result = dig.digest(input.getBytes("UTF-8"));
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < result.length; i++) {
            sb.append(Integer.toString((result[i] & 0xff) + 0x100, 16).substring(1));
        }
        return sb.toString();
    }

}

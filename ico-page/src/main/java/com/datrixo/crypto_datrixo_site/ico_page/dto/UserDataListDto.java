package com.datrixo.crypto_datrixo_site.ico_page.dto;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Yuri Nikiforov.
 * Date: 05.09.2021
 * Time: 19:23
 **/
public class UserDataListDto {
    private List<UserDataDto> users;

    public List<UserDataDto> getUsers() {
        if (users == null) {
            users = new ArrayList<>();
        }
        return users;
    }

    public void setUsers(List<UserDataDto> users) {
        this.users = users;
    }
}

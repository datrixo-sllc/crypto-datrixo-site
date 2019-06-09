package com.datrixo.crypto_datrixo_site.ico_page.service;

import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.User;
import com.datrixo.crypto_datrixo_site.ico_page.util.RequestUpdateUserData;

import java.util.Optional;

/**
 * Created by Yuri Nikiforov.
 * Date: 20.05.2019
 * Time: 7:28
 **/
public interface UserService {
    Optional<User> findByUsername(String username);
    User updateUser(RequestUpdateUserData updateUserData);
}

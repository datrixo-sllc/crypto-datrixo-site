package com.datrixo.crypto_datrixo_site.ico_page.service;

import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.User;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.util.Role;
import com.datrixo.crypto_datrixo_site.ico_page.util.RequestUpdateUserData;
import com.datrixo.crypto_datrixo_site.ico_page.util.RequestUpdateUserPassword;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

/**
 * Created by Yuri Nikiforov.
 * Date: 20.05.2019
 * Time: 7:28
 **/
public interface UserService {
    User findByUsername(String username);
    User findByUsernameWithImage(String username);
    User updateUser(MultipartFile file, RequestUpdateUserData updateUserData) throws IOException;
    String updateUserPassword(RequestUpdateUserPassword updateUserPassword);
    Optional<User> getCurrentUser();
    Optional<Role> getRoleForCurrentUser();
    boolean checkRoleForCurrentUser(Role role);

}

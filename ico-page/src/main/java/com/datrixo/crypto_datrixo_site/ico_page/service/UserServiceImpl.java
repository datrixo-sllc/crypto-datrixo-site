package com.datrixo.crypto_datrixo_site.ico_page.service;

import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.User;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.util.UserTitle;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.repository.UserRepository;
import com.datrixo.crypto_datrixo_site.ico_page.security.MediUser;
import com.datrixo.crypto_datrixo_site.ico_page.util.RequestUpdateUserData;
import com.datrixo.crypto_datrixo_site.ico_page.util.RequestupdateUserPassword;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.Optional;

/**
 * Created by Yuri Nikiforov.
 * Date: 20.05.2019
 * Time: 7:29
 **/
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    private static String USER_NOT_FOUND = "User not found";
    private static String USER_PASSWORD_UPDATED = "User password is updated";
    private static String CURRENT_PASSWORD_NOT_VALIDE = "Current password is not valid";
    private static String REENTER_PASSWORD_IS_NOT_SAME = "Reenter password is not same";

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    @Override
    @Transactional
    public User updateUser(RequestUpdateUserData updateUserData) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        MediUser currentUser = (MediUser)auth.getPrincipal();
        Optional<User> optionalUser = findByUsername(currentUser.getUsername());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setTitle(UserTitle.valueOf(updateUserData.getTitle()));
            user.setFirstName(updateUserData.getFirstName());
            user.setLastName(updateUserData.getLastName());
            user.setPhone(updateUserData.getPhone());
            return userRepository.saveAndFlush(user);
        } else {
            return null;
        }
    }

    @Override
    public String updateUserPassword(RequestupdateUserPassword updateUserPassword) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        MediUser currentUser = (MediUser)auth.getPrincipal();
        Optional<User> optionalUser = findByUsername(currentUser.getUsername());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (!user.getPassword().equals(updateUserPassword.getCurrentPassword())) {
                return CURRENT_PASSWORD_NOT_VALIDE;
            }
            if (!updateUserPassword.getNewPassword().equals(updateUserPassword.getNewPasswordReent())) {
                return REENTER_PASSWORD_IS_NOT_SAME;
            }
            user.setPassword(updateUserPassword.getNewPassword());
            userRepository.saveAndFlush(user);
            return USER_PASSWORD_UPDATED;
        } else {
            return USER_NOT_FOUND;
        }
    }
}

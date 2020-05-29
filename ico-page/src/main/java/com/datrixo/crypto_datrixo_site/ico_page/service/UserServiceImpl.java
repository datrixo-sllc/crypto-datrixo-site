package com.datrixo.crypto_datrixo_site.ico_page.service;

import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.ImageContent;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.User;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.util.UserTitle;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.repository.ImageContentRepository;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.repository.UserRepository;
import com.datrixo.crypto_datrixo_site.ico_page.security.MediUser;
import com.datrixo.crypto_datrixo_site.ico_page.util.RequestUpdateUserData;
import com.datrixo.crypto_datrixo_site.ico_page.util.RequestUpdateUserPassword;
import org.apache.commons.io.IOUtils;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by Yuri Nikiforov.
 * Date: 20.05.2019
 * Time: 7:29
 **/
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ImageContentRepository imageContentRepository;

    private static final String USER_NOT_FOUND = "User not found";
    private static final String USER_PASSWORD_UPDATED = "User password is updated";
    private static final String CURRENT_PASSWORD_NOT_VALIDE = "Current password is not valid";
    private static final String REENTER_PASSWORD_IS_NOT_SAME = "Reenter password is not same";
    private static final String NEW_PASSWORD_IS_NOT_VALID = "Password must contain at least 1 lowercase alphabetical character, " +
                                                            "must contain at least 1 uppercase alphabetical character, " +
                                                            "must contain at least 1 numeric character, " +
                                                            "must contain at least one special character in list: !@#$%^&* " +
                                                            "and must be eight characters or longer.";

//             ^	The password string will start this way.
//            (?=.*[a-z])	The string must contain at least 1 lowercase alphabetical character.
//            (?=.*[A-Z])	The string must contain at least 1 uppercase alphabetical character.
//            (?=.*[0-9])	The string must contain at least 1 numeric character.
//            (?=.*[!@#\$%\^&\*])	The string must contain at least one special character, but we are escaping
//                                  reserved RegEx characters to avoid conflict.
//            (?=.{8,})	The string must be eight characters or longer.
    private static final String PASSWORD_PATTERN =
        "((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&*]).{8,})";
           // "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})";

    @Override
    @Transactional(readOnly = true)
    public User findByUsername(String username) {
        Optional<User> optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isPresent()) {
            return optionalUser.get();
        } else {
            return null;
        }
    }

    @Override
    @Transactional(readOnly = true)
    public User findByUsernameWithImage(String username) {
        Optional<User> optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            Hibernate.initialize(user.getImageContent());
            return user;
        } else {
            return null;
        }
    }

    @Override
    @Transactional
    public User updateUser(MultipartFile file, RequestUpdateUserData updateUserData) throws IOException {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        MediUser currentUser = (MediUser)auth.getPrincipal();
        Optional<User> optionalUser = userRepository.findByUsername(currentUser.getUsername());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setTitle(UserTitle.valueOf(updateUserData.getTitle()));
            user.setFirstName(updateUserData.getFirstName());
            user.setLastName(updateUserData.getLastName());
            user.setPhone(updateUserData.getPhone());
            Hibernate.initialize(user.getImageContent());
            if (file != null) {
                if (user.getImageContent() != null) {
                    user.getImageContent().setContent(IOUtils.toByteArray(file.getInputStream()));
                    ImageContent imageContent = imageContentRepository.saveAndFlush(user.getImageContent());
                    user.setImageContent(imageContent);
                } else {
                    ImageContent imageContent = new ImageContent();
                    imageContent.setContent(IOUtils.toByteArray(file.getInputStream()));
                    imageContent = imageContentRepository.saveAndFlush(imageContent);
                    user.setImageContent(imageContent);
                }
            }
            return userRepository.saveAndFlush(user);
        } else {
            return null;
        }
    }

    @Override
    public String updateUserPassword(RequestUpdateUserPassword updateUserPassword) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        MediUser currentUser = (MediUser)auth.getPrincipal();
        Optional<User> optionalUser = userRepository.findByUsername(currentUser.getUsername());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (!user.getPassword().equals(updateUserPassword.getCurrentPassword())) {
                return CURRENT_PASSWORD_NOT_VALIDE;
            }
            if (!updateUserPassword.getNewPassword().equals(updateUserPassword.getNewPasswordReent())) {
                return REENTER_PASSWORD_IS_NOT_SAME;
            }
            Pattern pattern = Pattern.compile(PASSWORD_PATTERN);
            Matcher matcher = pattern.matcher(updateUserPassword.getNewPassword());
            if (!matcher.matches()) {
                return NEW_PASSWORD_IS_NOT_VALID;
            }

            user.setPassword(updateUserPassword.getNewPassword());
            userRepository.saveAndFlush(user);
            return USER_PASSWORD_UPDATED;
        } else {
            return USER_NOT_FOUND;
        }
    }
}

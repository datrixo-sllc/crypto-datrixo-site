package com.datrixo.crypto_datrixo_site.ico_page.service;

import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.User;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.util.UserTitle;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.repository.UserRepository;
import com.datrixo.crypto_datrixo_site.ico_page.security.MediUser;
import com.datrixo.crypto_datrixo_site.ico_page.util.RequestUpdateUserData;
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

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
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
}

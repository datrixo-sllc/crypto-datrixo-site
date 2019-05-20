package com.datrixo.crypto_datrixo_site.ico_page.security;

import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.User;
import com.datrixo.crypto_datrixo_site.ico_page.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

/**
 * Created by Yuri Nikiforov.
 * Date: 19.05.2019
 * Time: 8:14
 **/
public class RequestBodyReaderAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    @Autowired
    private UserService userService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        if (!request.getMethod().equals("POST")) {
            throw new AuthenticationServiceException("Authentication method not supported: " + request.getMethod());
        } else {
            RequestAuth requestAuth = createRequestAuth(request);

            String username = requestAuth.getUsername();
            String password = requestAuth.getPassword();
            if (username == null) {
                throw new UsernameNotFoundException(StatusResponseAuth.LOGIN_NOT_FOUND.toString());
            }
            if (password == null) {
                throw new AuthenticationCredentialsNotFoundException(StatusResponseAuth.PASSWORD_INVALID.toString());
            }

            Optional<User> optionalUser = userService.findByUsername(username);
            if (!optionalUser.isPresent()) {
                throw new UsernameNotFoundException(StatusResponseAuth.LOGIN_NOT_FOUND.toString());
            } else if (!optionalUser.get().getPassword().equals(password)) {
                throw new AuthenticationCredentialsNotFoundException(StatusResponseAuth.PASSWORD_INVALID.toString());
            }

            UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(username,
                    /*SecurityUtils.passwordEncode(username, password)*/ password);
            this.setDetails(request, token);
            return this.getAuthenticationManager().authenticate(token);
        }
    }

    private RequestAuth createRequestAuth(HttpServletRequest request) {
        String requestBody;
        RequestAuth requestAuth = new RequestAuth();
        try {
            requestBody = IOUtils.toString(request.getReader());
            requestAuth = objectMapper.readValue(requestBody, RequestAuth.class);
        } catch (IOException e) {
            throw new InsufficientAuthenticationException(StatusResponseAuth.BAD_REQUEST.toString());
        }
        return requestAuth;
    }

}

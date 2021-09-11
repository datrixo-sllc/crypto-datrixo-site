package com.datrixo.crypto_datrixo_site.ico_page.conf;

import com.datrixo.crypto_datrixo_site.ico_page.security.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.servlet.Filter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;

/**
 * Created by Yuri Nikiforov.
 * Date: 19.05.2019
 * Time: 7:28
 **/
@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .cors()

                // for h2 console - comment for production
                // .and()
                // .authorizeRequests().antMatchers("/h2-console/**").permitAll()
                // .and()
                // .headers().frameOptions().sameOrigin()
                // -------
                .and()
                .authorizeRequests()
                .antMatchers("/ico/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .addFilter(authenticationFilter())
                .logout().logoutUrl("/logout").logoutSuccessHandler(this::logoutSeccessHandler)
                .and().exceptionHandling().authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
        ;
    }

    @Bean
    public RequestBodyReaderAuthenticationFilter authenticationFilter() throws Exception {
        RequestBodyReaderAuthenticationFilter authenticationFilter
                = new RequestBodyReaderAuthenticationFilter();
        authenticationFilter.setAuthenticationSuccessHandler(this::loginSuccessHandler);
        authenticationFilter.setAuthenticationFailureHandler(this::loginFailureHandler);
        authenticationFilter.setRequiresAuthenticationRequestMatcher(
                new AntPathRequestMatcher("/login", "POST"));
        authenticationFilter.setAuthenticationManager(authenticationManagerBean());
        return authenticationFilter;
    }

    private void loginFailureHandler(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AuthenticationException e)
            throws IOException {
        ResponseAuth resp = new ResponseAuth();
        httpServletResponse.setStatus(HttpStatus.BAD_REQUEST.value());

        resp.setStatusResponseAuth(e.getMessage());
        objectMapper.writeValue(httpServletResponse.getWriter(), resp);
    }

    private void loginSuccessHandler(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Authentication authentication)
            throws IOException {
        ResponseAuth resp = new ResponseAuth();
        httpServletResponse.setStatus(HttpStatus.OK.value());
        resp.setStatusResponseAuth(StatusResponseAuth.OK.toString());
        resp.setRole(((MediUser)authentication.getPrincipal()).getRole().name());
        objectMapper.writeValue(httpServletResponse.getWriter(), resp);
    }

    private void logoutSeccessHandler(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Authentication authentication)
            throws IOException {
        httpServletResponse.setStatus(HttpStatus.OK.value());
        objectMapper.writeValue(httpServletResponse.getWriter(), new HashMap<String, String>() {{
            put("statusResponseAuth", "DONE");
        }});
    }

    @Bean
    public UserDetailsService getUserDetailsService() {
        return new UserDetailsServiceImpl();
    }

    @SuppressWarnings("deprecation")
    @Bean
    public static NoOpPasswordEncoder passwordEncoder() {
        return (NoOpPasswordEncoder) NoOpPasswordEncoder.getInstance();
    }


    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "OPTIONS", "PUT", "DELETE"));
        configuration.setAllowCredentials(true);
        // строка ниже необходима чтобы не было ошибки при авторизации
//        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        configuration.addExposedHeader("Authorization, x-xsrf-token, Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, " +
                "Content-Type, Access-Control-Request-Method, Custom-Filter-Header, Location");
        configuration.setAllowedHeaders(Arrays.asList("*"));
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}

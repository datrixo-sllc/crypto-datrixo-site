package com.datrixo.crypto_datrixo_site.ico_page.conf;

import com.datrixo.crypto_datrixo_site.ico_page.security.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.io.IOException;
import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * Created by Yuri Nikiforov.
 * Date: 19.05.2019
 * Time: 7:28
 **/
@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final JwtTokenProvider jwtTokenProvider;
    // Удалить поле JwtAuthenticationFilter

    public WebSecurityConfig(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @SuppressWarnings("deprecation")
    @Bean
    public PasswordEncoder passwordEncoder() {
        //return Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8();

        /*
        * Для корректной работы пароли в базе должны иметь префикс:
            {argon2} для Argon2
            {bcrypt} для BCrypt
            {noop} для обычного текста
        */
        /*String idForEncode = "argon2";
        Map<String, PasswordEncoder> encoders = new HashMap<>();
        encoders.put(idForEncode, Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8());
        encoders.put("bcrypt", new BCryptPasswordEncoder());
        encoders.put("noop", NoOpPasswordEncoder.getInstance());
        return new DelegatingPasswordEncoder(idForEncode, encoders);*/
        return NoOpPasswordEncoder.getInstance();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return new UserDetailsServiceImpl();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            UserDetailsService userDetailsService,
            PasswordEncoder passwordEncoder) {

        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder);

        return new ProviderManager(provider);
    }

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, AuthenticationManager authenticationManager) throws Exception {
        http
                .headers(headers -> headers
                        .frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin)
                        .xssProtection(HeadersConfigurer.XXssConfig::disable
                        )
                        .contentSecurityPolicy(csp -> csp
                                .policyDirectives(
                                        "default-src 'self' : " +
                                        "script-src 'self' 'unsafe-inline' 'unsave-eval' ; " +
                                        "style-src 'self' 'unsafe-inline' ; " +
                                        "img-src 'self' data:; " +
                                        "frame-ancestors 'self'; " +
                                        "form-action 'self'"

                                )
                        )
                )
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .addFilter(authenticationFilter(authenticationManager))
                .addFilterBefore(jwtAuthenticationFilter(), org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests(auth -> auth
                        // for h2 - comment for production
                        .requestMatchers("/h2-console/**").permitAll()
                        // page for datrixo site
                        .requestMatchers("/ico/**").permitAll()
                        .anyRequest().authenticated()
                )
                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessHandler(this::logoutSuccessHandler))
                .exceptionHandling(exception -> exception
                        .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
                        .accessDeniedHandler(((request, response, ex) -> {
                            response.setStatus(HttpStatus.FORBIDDEN.value());
                            response.setContentType(MediaType.APPLICATION_JSON_VALUE);

                            Map<String, String> errorDetails = new HashMap<>();
                                    errorDetails.put("timestamp", Instant.now().toString());
                                    errorDetails.put("status", String.valueOf(HttpStatus.FORBIDDEN.value()));
                                    errorDetails.put("error", "Forbidden");
                                    errorDetails.put("message", ex.getMessage());
                                    errorDetails.put("path", request.getRequestURI());
                                    objectMapper.writeValue(response.getWriter(), errorDetails);
                        }))
                );
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // Разрешаем доступ с этого источника
        configuration.setAllowedOrigins(List.of("http://localhost:4200"));

        // Разрешаем следующие HTTP-методы
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // Разрешаем заголовки
        configuration.setAllowedHeaders(List.of("Content-Type", "Authorization", "X-Requested-With", "Cache-Control"));
        configuration.addExposedHeader("Authorization, x-xsrf-token, Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, " +
                "Content-Type, Access-Control-Request-Method, Custom-Filter-Header, Location");

        // Разрешаем передачу cookies/токенов
        configuration.setAllowCredentials(true);

        // Устанавливаем максимальное время жизни предварительного запроса (preflight)
        configuration.setMaxAge(3600L);

        // Регистрируем настройки для всех эндпоинтов
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public RequestBodyReaderAuthenticationFilter authenticationFilter(AuthenticationManager authenticationManager) {
        RequestBodyReaderAuthenticationFilter authenticationFilter =
                new RequestBodyReaderAuthenticationFilter();
        authenticationFilter.setAuthenticationSuccessHandler(this::loginSuccessHandler);
        authenticationFilter.setAuthenticationFailureHandler(this::loginFailureHandler);
        authenticationFilter.setRequiresAuthenticationRequestMatcher(
                new AntPathRequestMatcher("/login", "POST"));
        authenticationFilter.setAuthenticationManager(authenticationManager);
        return authenticationFilter;
    }

    private void loginSuccessHandler(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
                                     Authentication authentication) throws IOException {
        String token = jwtTokenProvider.generateToken(authentication);
        Map<String, Object> resp = new HashMap<>();
        resp.put("statusResponseAuth", StatusResponseAuth.OK.toString());
        resp.put("role", ((MediUser)authentication.getPrincipal()).getRole().name());
        resp.put("token", token);
        httpServletResponse.setStatus(HttpStatus.OK.value());
        httpServletResponse.setContentType(MediaType.APPLICATION_JSON_VALUE);
        objectMapper.writeValue(httpServletResponse.getWriter(), resp);
    }

    private void loginFailureHandler(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
                                     AuthenticationException e) throws IOException {
        ResponseAuth resp = new ResponseAuth();
        httpServletResponse.setStatus(HttpStatus.BAD_REQUEST.value());
        resp.setStatusResponseAuth(e.getMessage());
        objectMapper.writeValue(httpServletResponse.getWriter(), resp);
    }

    private void logoutSuccessHandler(HttpServletRequest request,
                                      HttpServletResponse response,
                                      Authentication authentication) throws IOException {
        ResponseAuth resp = new ResponseAuth();
        response.setStatus(HttpStatus.OK.value());
        resp.setStatusResponseAuth(StatusResponseAuth.OK.toString());
        resp.setRole(((MediUser)authentication.getPrincipal()).getRole().name());
        objectMapper.writeValue(response.getWriter(), resp);
    }

}


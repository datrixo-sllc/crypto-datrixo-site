package com.datrixo.crypto_datrixo_site.ico_page.conf;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Created by Yuri Nikiforov.
 * Date: 16.08.2025
 * Time: 15:21
 **/

@Configuration
public class CspConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new HandlerInterceptor() {
            @Override
            public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
                // Добавляем заголовок CSP ко всем ответам
                response.setHeader("Content-Security-Policy",
                        "default-src 'self'; " +
                                "script-src 'self' 'unsafe-inline'; " +
                                "connect-src 'self'; " +
                                "img-src 'self' data:; " +
                                "style-src 'self' 'unsafe-inline'; " +
                                "font-src 'self' https://fonts.gstatic.com;");
                return true;
            }

            @Override
            public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) {
                // Не требуется для нас
            }

            @Override
            public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
                // Не требуется для нас
            }
        });
    }
}
package com.datrixo.crypto_datrixo_site.ico_page.conf;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
<<<<<<< HEAD
=======
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
>>>>>>> 3099b2d1a06eafa6afbfc2bac1a9186c5afb0931

/**
 * Created by Yuri Nikiforov.
 * Date: 05.02.2019
 * Time: 15:49
 */

@Configuration
public class WebMvcConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
<<<<<<< HEAD
                        .allowedMethods("*");
=======
                        .allowedMethods("HEAD", "GET", "PUT", "POST", "DELETE", "PATCH");
>>>>>>> 3099b2d1a06eafa6afbfc2bac1a9186c5afb0931
            }
        };
    }
}

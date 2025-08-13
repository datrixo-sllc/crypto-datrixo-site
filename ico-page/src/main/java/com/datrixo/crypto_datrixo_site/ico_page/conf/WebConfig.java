package com.datrixo.crypto_datrixo_site.ico_page.conf;

/**
 * Created by Yuri Nikiforov.
 * Date: 13.08.2025
 * Time: 18:00
 *
 **/

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        // Перенаправление корня на index.html
        registry.addViewController("/ico/").setViewName("forward:/ico/index.html");
        registry.addViewController("/investors/").setViewName("forward:/investors/index.html");
    }
}

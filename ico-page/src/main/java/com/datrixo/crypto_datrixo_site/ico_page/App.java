package com.datrixo.crypto_datrixo_site.ico_page;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@ComponentScan("com.datrixo.crypto_datrixo_site.ico_page.*")
//@EntityScan("com.datrixo.crypto_datrixo_site.ico_page.h2.model")
//@EnableJpaRepositories("com.datrixo.crypto_datrixo_site.ico_page.h2.repository")
@EnableAsync
@EnableScheduling
public class App {

	public static void main(String[] args) {
		SpringApplication.run(App.class, args);
	}

}


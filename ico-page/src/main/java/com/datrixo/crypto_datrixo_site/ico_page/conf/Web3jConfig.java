package com.datrixo.crypto_datrixo_site.ico_page.conf;

/**
 * Created by Yuri Nikiforov.
 * Date: 29.06.2025
 * Time: 21:22
 **/

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;
import okhttp3.OkHttpClient;
import java.time.Duration;

@Configuration
public class Web3jConfig {

    @Autowired
    private Environment env;

    @Bean
    public Web3j web3j() {
        // Создаем HTTP клиент с увеличенными таймаутами для AWS
        OkHttpClient httpClient = new OkHttpClient.Builder()
                .connectTimeout(Duration.ofSeconds(60))  // Таймаут подключения
                .readTimeout(Duration.ofSeconds(120))    // Таймаут чтения
                .writeTimeout(Duration.ofSeconds(60))    // Таймаут записи
                .retryOnConnectionFailure(true)        // Повторные попытки при ошибках подключения
                .build();

        HttpService httpService = new HttpService(env.getProperty("web3j.client-address"), httpClient, false);
        return Web3j.build(httpService);
    }
}

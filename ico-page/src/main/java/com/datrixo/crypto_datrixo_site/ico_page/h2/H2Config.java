package com.datrixo.crypto_datrixo_site.ico_page.h2;

import jakarta.persistence.EntityManagerFactory;
import org.hibernate.jpa.boot.spi.EntityManagerFactoryBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.context.annotation.Primary;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;
import java.util.Properties;

/**
 * Created by Yuri Nikiforov.
 * Date: 18.05.2019
 * Time: 16:57
 **/
@Configuration
@EntityScan(basePackages = {"com.datrixo.crypto_datrixo_site.ico_page.h2.model"})
@EnableTransactionManagement
@EnableJpaRepositories(
        entityManagerFactoryRef = "h2EntityManagerFactory",
        basePackages = {"com.datrixo.crypto_datrixo_site.ico_page.h2.repository"},
        transactionManagerRef = "h2TransactionManager"
)
public class H2Config {
    @Autowired
    private Environment env;

    @Primary
    @Bean(name = "h2DataSource")
    public DataSource h2DataSource() {
        return DataSourceBuilder
                .create()
                .driverClassName(env.getProperty("h2.jdbc.driverClassName"))
                .url(env.getProperty("h2.jdbc.url"))
                .username(env.getProperty("h2.jdbc.user"))
                .password(env.getProperty("h2.jdbc.pass"))
                .build();
    }

    @Primary
    @DependsOn({"h2DataSource"})
    @Bean(name = "h2EntityManagerFactory")
    public LocalContainerEntityManagerFactoryBean h2EntityManagerFactory() {
        LocalContainerEntityManagerFactoryBean emf = new LocalContainerEntityManagerFactoryBean();
        emf.setDataSource(h2DataSource());
        emf.setPackagesToScan("com.datrixo.crypto_datrixo_site.ico_page.h2.model"); // <-- исправьте если entity в другом пакете
        emf.setPersistenceUnitName("h2");
        emf.setJpaVendorAdapter(new HibernateJpaVendorAdapter());
        emf.setJpaProperties(additionalProperties());
        return emf;
    }

    @Primary
    @Bean(name = "h2TransactionManager")
    public PlatformTransactionManager transactionManager(
            @Qualifier("h2EntityManagerFactory") LocalContainerEntityManagerFactoryBean entityManagerFactory) {
        return new JpaTransactionManager(entityManagerFactory.getObject());
    }

    private Properties additionalProperties() {
        Properties hibernateProperties = new Properties();
        hibernateProperties.setProperty("hibernate.hbm2ddl.auto", env.getProperty("h2.hibernate.hbm2ddl.auto"));
        hibernateProperties.setProperty("hibernate.show_sql", env.getProperty("h2.hibernate.show_sql"));
        return hibernateProperties;
    }
}
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
        emf.setPackagesToScan("com.datrixo.crypto_datrixo_site.ico_page.h2.entity");
        emf.setPersistenceUnitName("h2");

        Properties properties = additionalProperties();
        emf.setJpaProperties(properties);

        return emf;
    }



    /*public EntityManagerFactory entityManagerFactory() {
        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(dataSource());
        em.setPackagesToScan("com.datrixo.crypto_datrixo_site.ico_page.h2.model");
        em.setPersistenceUnitName("h2");

        HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        em.setJpaVendorAdapter(vendorAdapter);
        em.setJpaProperties(additionalProperties());
        return em.getObject();
    }*/

    @Primary
    @Bean(name = "h2TransactionManager")
    public PlatformTransactionManager transactionManager(
            @Qualifier("h2EntityManagerFactory") LocalContainerEntityManagerFactoryBean entityManagerFactory) {
        return new JpaTransactionManager((EntityManagerFactory)entityManagerFactory);
    }

    private Properties additionalProperties() {
        Properties hibernateProperties = new Properties();

        hibernateProperties.setProperty("hibernate.hbm2ddl.auto", env.getProperty("h2.hibernate.hbm2ddl.auto"));
        hibernateProperties.setProperty("hibernate.dialect", "org.hibernate.dialect.H2Dialect");
        hibernateProperties.setProperty("hibernate.show_sql", env.getProperty("h2.hibernate.show_sql"));
        //hibernateProperties.setProperty("hibernate.cache.use_second_level_cache", env.getProperty("hibernate.cache.use_second_level_cache"));
        //hibernateProperties.setProperty("hibernate.cache.use_query_cache", env.getProperty("hibernate.cache.use_query_cache"));
        return hibernateProperties;
    }

//    @Bean
//    public DataSourceInitializer dataSourceInitializer(@Qualifier("h2DataSource") DataSource dataSource) {
//        DataSourceInitializer dataSourceInitializer = new DataSourceInitializer();
//        dataSourceInitializer.setDataSource(dataSource);
//        ResourceDatabasePopulator databasePopulator = new ResourceDatabasePopulator();
//        databasePopulator.addScript(new ClassPathResource("schema-h2.sql"));
//        dataSourceInitializer.setDatabasePopulator(databasePopulator);
//        dataSourceInitializer.setEnabled(Boolean.parseBoolean(String.valueOf(false)));
//        return dataSourceInitializer;
//    }
}

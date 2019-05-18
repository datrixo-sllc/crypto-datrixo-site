package com.datrixo.crypto_datrixo_site.ico_page.h2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import java.util.HashMap;
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

    private LocalContainerEntityManagerFactoryBean entityManagerFactory;

    @Primary
    @Bean(name = "h2DataSource")
    public DataSource dataSource() {
        DataSource dataSource = DataSourceBuilder
                .create()
                .driverClassName(env.getProperty("h2.driverClassName"))
                .url(env.getProperty("h2.url"))
                .username(env.getProperty("h2.user"))
                .password(env.getProperty("h2.pass"))
                .build();
        return dataSource;
    }

    @Primary
    @Bean(name = "h2EntityManagerFactory")
    public LocalContainerEntityManagerFactoryBean entityManagerFactory(
            EntityManagerFactoryBuilder builder,
            @Qualifier("h2DataSource") DataSource dataSource) {
        LocalContainerEntityManagerFactoryBean entityManagerFactoryBean = builder
                .dataSource(dataSource)
                .packages("com.datrixo.crypto_datrixo_site.ico_page.h2.model")
                .persistenceUnit("h2")
                .build();
        HibernateJpaVendorAdapter vendorAdapter
                = new HibernateJpaVendorAdapter();
        entityManagerFactoryBean.setJpaVendorAdapter(vendorAdapter);
        entityManagerFactoryBean.setJpaProperties(additionalProperties());
        this.entityManagerFactory = entityManagerFactoryBean;
        return entityManagerFactoryBean;
    }

    @Primary
    @Bean(name = "h2TransactionManager")
    public PlatformTransactionManager transactionManager(
            @Qualifier("h2EntityManagerFactory") EntityManagerFactory entityManagerFactory) {
        return new JpaTransactionManager(entityManagerFactory);
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


    @Bean(name = "h2TransactionManager")
    public PlatformTransactionManager h2TransactionManager() {

        JpaTransactionManager transactionManager
                = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(entityManagerFactory.getObject());
        return transactionManager;
    }

//    @Bean
//    public DataSourceInitializer dataSourceInitializer(@Qualifier("InMemoryDataSource") DataSource dataSource) {
//        DataSourceInitializer dataSourceInitializer = new DataSourceInitializer();
//        dataSourceInitializer.setDataSource(dataSource);
//        ResourceDatabasePopulator databasePopulator = new ResourceDatabasePopulator();
//        databasePopulator.addScript(new ClassPathResource("schema-h2.sql"));
//        dataSourceInitializer.setDatabasePopulator(databasePopulator);
//        dataSourceInitializer.setEnabled(Boolean.parseBoolean(String.valueOf(false)));
//        return dataSourceInitializer;
//    }
}

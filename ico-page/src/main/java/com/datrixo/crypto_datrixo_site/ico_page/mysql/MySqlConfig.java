package com.datrixo.crypto_datrixo_site.ico_page.mysql;

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

import jakarta.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import java.util.Properties;

/**
 * Created by Yuri Nikiforov.
 * Date: 18.05.2019
 * Time: 19:20
 **/
@Configuration
@EntityScan(basePackages = {"com.datrixo.crypto_datrixo_site.ico_page.mysql.model"})
@EnableTransactionManagement
@EnableJpaRepositories(
        entityManagerFactoryRef = "mySqlEntityManagerFactory",
        basePackages = {"com.datrixo.crypto_datrixo_site.ico_page.mysql.repository"},
        transactionManagerRef = "mySqlTransactionManager"
)
public class MySqlConfig {
    @Autowired
    private Environment env;

    private LocalContainerEntityManagerFactoryBean entityManagerFactory;

    @Bean(name = "mySqlDataSource")
    public DataSource dataSource() {
        DataSource dataSource = DataSourceBuilder
                .create()
                .driverClassName(env.getProperty("mysql.jdbc.driverClassName"))
                .url(env.getProperty("mysql.jdbc.url"))
                .username(env.getProperty("mysql.jdbc.user"))
                .password(env.getProperty("mysql.jdbc.pass"))
                .build();
        return dataSource;
    }

    @Bean(name = "mySqlEntityManagerFactory")
    public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(dataSource());
        em.setPackagesToScan(new String[] {"com.datrixo.crypto_datrixo_site.ico_page.mysql.model"});
        em.setPersistenceUnitName("mysql");

        HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        em.setJpaVendorAdapter(vendorAdapter);
        em.setJpaProperties(additionalProperties());
        return em;
    }

    @Bean(name = "mySqlTransactionManager")
    public PlatformTransactionManager transactionManager(
            @Qualifier("mySqlEntityManagerFactory") EntityManagerFactory entityManagerFactory) {
        return new JpaTransactionManager(entityManagerFactory);
    }

    private Properties additionalProperties() {
        Properties hibernateProperties = new Properties();

        hibernateProperties.setProperty("hibernate.hbm2ddl.auto", env.getProperty("mysql.hibernate.hbm2ddl.auto"));
        hibernateProperties.setProperty("hibernate.dialect", "org.hibernate.dialect.MySQL5Dialect");
        hibernateProperties.setProperty("hibernate.show_sql", env.getProperty("mysql.hibernate.show_sql"));
        //hibernateProperties.setProperty("hibernate.cache.use_second_level_cache", env.getProperty("hibernate.cache.use_second_level_cache"));
        //hibernateProperties.setProperty("hibernate.cache.use_query_cache", env.getProperty("hibernate.cache.use_query_cache"));
        return hibernateProperties;
    }

//    @Bean
//    public DataSourceInitializer dataSourceInitializer(@Qualifier("MysqlDataSource") DataSource dataSource) {
//        DataSourceInitializer dataSourceInitializer = new DataSourceInitializer();
//        dataSourceInitializer.setDataSource(dataSource);
//        ResourceDatabasePopulator databasePopulator = new ResourceDatabasePopulator();
//        databasePopulator.addScript(new ClassPathResource("schema-mysql.sql"));
//        dataSourceInitializer.setDatabasePopulator(databasePopulator);
//        dataSourceInitializer.setEnabled(Boolean.parseBoolean(String.valueOf(false)));
//        return dataSourceInitializer;
//    }
}

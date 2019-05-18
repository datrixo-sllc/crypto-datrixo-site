package com.datrixo.crypto_datrixo_site.ico_page.mysql.model;

import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Created by Yuri Nikiforov.
 * Date: 18.05.2019
 * Time: 19:13
 **/

@Entity
@Table(name="USERS")
public class User extends AbstractPersistable<Long> {
    private String email;
    private String password;
}

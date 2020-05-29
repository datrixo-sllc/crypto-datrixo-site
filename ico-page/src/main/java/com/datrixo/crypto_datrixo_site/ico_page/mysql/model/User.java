package com.datrixo.crypto_datrixo_site.ico_page.mysql.model;

import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.util.Role;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.util.UserTitle;
import org.springframework.data.jpa.domain.AbstractPersistable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

/**
 * Created by Yuri Nikiforov.
 * Date: 18.05.2019
 * Time: 19:13
 **/

@Entity
@Table(name="USERS")
public class User extends AbstractPersistable<Long> {
    @Column(unique = true)
    private String username;
    private String password;
    @Enumerated(EnumType.STRING)
    private Role role;
    @Enumerated(EnumType.STRING)
    private UserTitle title;
    private String firstName;
    private String lastName;
    private String phone;
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "image_content_id")
    private ImageContent imageContent;
    @ManyToOne(fetch = FetchType.EAGER,cascade = {})
    @JoinColumn(name = "organization_id")
    private Organization organization;
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "user", cascade = CascadeType.MERGE, orphanRemoval = true)
    @OrderBy("createDate")
    private List<HolderAccount> accounts;

    public User(){}

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public User(String username, String password, Role role, List<HolderAccount> accounts) {
        this.username = username;
        this.password = password;
        this.role = role;
        this.accounts = accounts;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public UserTitle getTitle() {
        return title;
    }

    public void setTitle(UserTitle title) {
        this.title = title;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public ImageContent getImageContent() {
        return imageContent;
    }

    public void setImageContent(ImageContent imageContent) {
        this.imageContent = imageContent;
    }

    public Organization getOrganization() {
        return organization;
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
    }

    public List<HolderAccount> getAccounts() {
        if (accounts == null) {
            accounts = new ArrayList<>();
        }
        return accounts;
    }

    public void setAccounts(List<HolderAccount> accounts) {
        this.accounts = accounts;
    }
}

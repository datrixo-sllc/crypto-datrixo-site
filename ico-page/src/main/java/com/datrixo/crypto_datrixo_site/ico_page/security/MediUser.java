package com.datrixo.crypto_datrixo_site.ico_page.security;

import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.HolderAccount;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.util.Role;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

/**
 * Created by Yuri Nikiforov.
 * Date: 08.06.2019
 * Time: 11:37
 **/
public class MediUser extends User {
    private Role role;
    private List<HolderAccount> accounts;

    public MediUser(String username, String password, Role role, List<HolderAccount> accounts) {
        super(username, password, true, true, true, true,
                Collections.emptySet());
        this.role = role;
        this.accounts = accounts;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
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

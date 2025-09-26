package com.datrixo.crypto_datrixo_site.ico_page.dto;

import com.datrixo.crypto_datrixo_site.ico_page.dto.HolderAccountDto;
import com.datrixo.crypto_datrixo_site.ico_page.dto.OrganizationDto;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Yuri Nikiforov.
 * Date: 05.09.2021
 * Time: 11:36
 **/
public class UserDataDto {
    private Long id;
    private String username;
    private String password;
    private String role;
    private String userType;
    private String title;
    private String firstName;
    private String lastName;
    private String accountAddress;
    private String email;
    private String phone;
    private Long imageContentId;
    private byte[] imageContent;
    private OrganizationDto organization;
    private List<HolderAccountDto> accounts;

    public UserDataDto() {
    }

    public UserDataDto(Long id, String username, String role, String userType, String title,
                       String firstName, String lastName, String accountAddress, String email,
                       String phone, byte[] imageContent) {
        this.id = id;
        this.username = username;
        this.role = role;
        this.userType = userType;
        this.title = title;
        this.firstName = firstName;
        this.lastName = lastName;
        this.accountAddress = accountAddress;
        this.email = email;
        this.phone = phone;
        this.imageContent = imageContent;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
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

    public String getAccountAddress() {
        return accountAddress;
    }

    public void setAccountAddress(String accountAddress) {
        this.accountAddress = accountAddress;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Long getImageContentId() {
        return imageContentId;
    }

    public void setImageContentId(Long imageContentId) {
        this.imageContentId = imageContentId;
    }

    public byte[] getImageContent() {
        return imageContent;
    }

    public void setImageContent(byte[] imageContent) {
        this.imageContent = imageContent;
    }

    public OrganizationDto getOrganization() {
        return organization;
    }

    public void setOrganization(OrganizationDto organization) {
        this.organization = organization;
    }

    public List<HolderAccountDto> getAccounts() {
        if (accounts == null) {
            accounts = new ArrayList();
        }
        return accounts;
    }

    public void setAccounts(List<HolderAccountDto> accounts) {
        this.accounts = accounts;
    }
}

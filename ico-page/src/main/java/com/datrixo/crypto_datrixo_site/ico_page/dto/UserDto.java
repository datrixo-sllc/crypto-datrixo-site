package com.datrixo.crypto_datrixo_site.ico_page.dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by Yuri Nikiforov.
 * Date: 08.06.2019
 * Time: 19:14
 **/
public class UserDto {
    private Long id;
    private String username;
    private String role;
    private String title;
    private String firstName;
    private String lastName;
    private String phone;
    private String email;
    private String organizationName;
    private Date incorporateDate;
    private String organizationPhone;
    private String streetAddress;
    private String city;
    private String state;
    private String zip;
    private String country;
    private byte[] imageContent;
    private List<HolderAccountDto> holders;

    public UserDto() {
    }

    public UserDto(Long id) {
        this.id = id;
    }

    public UserDto(Long id, String username, String role, String title, String firstName, String lastName, String phone,
                   String email, String organizationName, Date incorporateDate, String organizationPhone,
                   String streetAddress, String city, String state, String zip, String country, byte[] imageContent,
                   List<HolderAccountDto> holders) {
        this.id = id;
        this.username = username;
        this.role = role;
        this.title = title;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
        this.organizationName = organizationName;
        this.incorporateDate = incorporateDate;
        this.organizationPhone = organizationPhone;
        this.streetAddress = streetAddress;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.country = country;
        this.imageContent = imageContent;
        this.holders = holders;
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

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getOrganizationName() {
        return organizationName;
    }

    public void setOrganizationName(String organizationName) {
        this.organizationName = organizationName;
    }

    public Date getIncorporateDate() {
        return incorporateDate;
    }

    public void setIncorporateDate(Date incorporateDate) {
        this.incorporateDate = incorporateDate;
    }

    public String getOrganizationPhone() {
        return organizationPhone;
    }

    public void setOrganizationPhone(String organizationPhone) {
        this.organizationPhone = organizationPhone;
    }

    public String getStreetAddress() {
        return streetAddress;
    }

    public void setStreetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZip() {
        return zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public byte[] getImageContent() {
        return imageContent;
    }

    public void setImageContent(byte[] imageContent) {
        this.imageContent = imageContent;
    }

    public List<HolderAccountDto> getHolders() {
        if(holders == null) {
            holders = new ArrayList<>();
        }
        return holders;
    }

    public void setHolders(List<HolderAccountDto> holders) {
        this.holders = holders;
    }

}

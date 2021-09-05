package com.datrixo.crypto_datrixo_site.ico_page.dto;

import com.datrixo.crypto_datrixo_site.ico_page.dto.CountryDto;

import java.util.Date;

/**
 * Created by Yuri Nikiforov.
 * Date: 05.09.2021
 * Time: 11:42
 **/
public class OrganizationDto {
    private Long id;
    private String companyName;
    private Date incorporateDate;
    private String opencorporatesId;
    private String email;
    private String phone;
    private String streetAddress;
    private String city;
    private String state;
    private String zip;
    private CountryDto country;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public Date getIncorporateDate() {
        return incorporateDate;
    }

    public void setIncorporateDate(Date incorporateDate) {
        this.incorporateDate = incorporateDate;
    }

    public String getOpencorporatesId() {
        return opencorporatesId;
    }

    public void setOpencorporatesId(String opencorporatesId) {
        this.opencorporatesId = opencorporatesId;
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

    public CountryDto getCountry() {
        return country;
    }

    public void setCountry(CountryDto country) {
        this.country = country;
    }
}

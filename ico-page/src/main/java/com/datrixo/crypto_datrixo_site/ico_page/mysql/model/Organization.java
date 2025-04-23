package com.datrixo.crypto_datrixo_site.ico_page.mysql.model;

import org.springframework.data.jpa.domain.AbstractPersistable;

import jakarta.persistence.*;
import java.util.Date;

/**
 * Created by Yuri Nikiforov.
 * Date: 07.06.2019
 * Time: 9:25
 **/
@Entity
@Table(name="organization")
public class Organization extends AbstractPersistable<Long> {
    private String companyName;
    private Date incorporateDate;
    private String opencorporatesId;
    private String email;
    private String phone;
    private String streetAddress;
    private String city;
    private String state;
    private String zip;
    @ManyToOne(fetch = FetchType.EAGER,cascade = {})
    @JoinColumn(name = "country_id")
    private Country country;

    public Organization() {
    }

    public Organization(String companyName, Date incorporateDate, String opencorporatesId, String email, String phone,
                        String streetAddress, String city, String state, String zip, Country country) {
        this.companyName = companyName;
        this.incorporateDate = incorporateDate;
        this.opencorporatesId = opencorporatesId;
        this.email = email;
        this.phone = phone;
        this.streetAddress = streetAddress;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.country = country;
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

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }
}

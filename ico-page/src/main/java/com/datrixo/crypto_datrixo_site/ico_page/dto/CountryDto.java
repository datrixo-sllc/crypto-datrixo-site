package com.datrixo.crypto_datrixo_site.ico_page.dto;

/**
 * Created by Yuri Nikiforov.
 * Date: 05.09.2021
 * Time: 12:03
 **/
public class CountryDto {
    private Long id;
    private String name;
    private String code;

    public CountryDto() {
    }

    public CountryDto(Long id, String name, String code) {
        this.id = id;
        this.name = name;
        this.code = code;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}

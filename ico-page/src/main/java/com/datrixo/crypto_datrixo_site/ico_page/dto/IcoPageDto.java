package com.datrixo.crypto_datrixo_site.ico_page.dto;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Yuri Nikiforov.
 * Date: 05.02.2019
 * Time: 11:10
 */
public class IcoPageDto {
    private String totalSupplyTokens;
    private String soldTokens;
    private String holdersCount;
    private List<HolderDto> holders;

    public String getTotalSupplyTokens() {
        return totalSupplyTokens;
    }

    public void setTotalSupplyTokens(String totalSupplyTokens) {
        this.totalSupplyTokens = totalSupplyTokens;
    }

    public String getSoldTokens() {
        return soldTokens;
    }

    public void setSoldTokens(String soldTokens) {
        this.soldTokens = soldTokens;
    }

    public String getHoldersCount() {
        return holdersCount;
    }

    public void setHoldersCount(String holdersCount) {
        this.holdersCount = holdersCount;
    }

    public List<HolderDto> getHolders() {
        if(holders == null) {
            holders = new ArrayList<>();
        }
        return holders;
    }

    public void setHolders(List<HolderDto> holders) {
        this.holders = holders;
    }
}

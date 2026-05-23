package com.datrixo.crypto_datrixo_site.ico_page.dto;

import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.HolderAccount;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Yuri Nikiforov.
 * Date: 16.12.2025
 * Time: 23:20
 **/
public class HolderAccountListDto {
    private List<HolderAccountDto> holderAccountList;

    public List<HolderAccountDto> getHolderAccountList() {
        if (holderAccountList == null) {
            holderAccountList = new ArrayList<>();
        }
        return holderAccountList;
    }

    public void setHolderAccountList(List<HolderAccountDto> holderAccountList) {
        this.holderAccountList = holderAccountList;
    }

    public void setHolderAccounts(List<HolderAccount> holderAccounts) {
        for (HolderAccount holderAccount : holderAccounts) {
            HolderAccountDto holderAccountDto = new HolderAccountDto();
            holderAccountDto.setHolderAccount(holderAccount);
            getHolderAccountList().add(holderAccountDto);
        }
    }
}

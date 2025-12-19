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
    private List<HolderAccountDto> holderAccountDtoList;

    public List<HolderAccountDto> getHolderAccountDtoList() {
        if (holderAccountDtoList == null) {
            holderAccountDtoList = new ArrayList<>();
        }
        return holderAccountDtoList;
    }

    public void setHolderAccountDtoList(List<HolderAccountDto> holderAccountDtoList) {
        this.holderAccountDtoList = holderAccountDtoList;
    }

    public void setHolderAccounts(List<HolderAccount> holderAccounts) {
        for (HolderAccount holderAccount : holderAccounts) {
            HolderAccountDto holderAccountDto = new HolderAccountDto();
            holderAccountDto.setHolderAccount(holderAccount);
            getHolderAccountDtoList().add(holderAccountDto);
        }
    }
}

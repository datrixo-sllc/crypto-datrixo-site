package com.datrixo.crypto_datrixo_site.ico_page.service;

import com.datrixo.crypto_datrixo_site.ico_page.dto.HolderDto;
import com.datrixo.crypto_datrixo_site.ico_page.dto.IcoPageDto;
import org.springframework.stereotype.Service;

/**
 * Created by Yuri Nikiforov.
 * Date: 05.02.2019
 * Time: 11:26
 */
@Service
public class IcoPageServiceImpl implements IcoPageService {
    @Override
    public IcoPageDto getAllData() {
        IcoPageDto icoPageDto = new IcoPageDto();
        icoPageDto.setTotalSupplyTokens(String.valueOf(200000));
        icoPageDto.setSoldTokens(String.valueOf(100000));
        icoPageDto.setHoldersCount(String.valueOf(16));
        icoPageDto.getHolders().add(new HolderDto("0xe5b25213d2F1cE8a998B632dc9d6c9719Eb993Ee",
                "20 hrs 9 min ago", "100"));

        return icoPageDto;
    }
}

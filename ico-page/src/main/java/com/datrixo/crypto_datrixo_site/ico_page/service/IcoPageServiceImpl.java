package com.datrixo.crypto_datrixo_site.ico_page.service;

import com.datrixo.crypto_datrixo_site.ico_page.dto.HolderDto;
import com.datrixo.crypto_datrixo_site.ico_page.dto.IcoPageDto;
import com.datrixo.crypto_datrixo_site.ico_page.model.Holder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Yuri Nikiforov.
 * Date: 05.02.2019
 * Time: 11:26
 */
@Service
public class IcoPageServiceImpl implements IcoPageService {
    @Autowired
    private HolderService holderService;

    @Override
    public IcoPageDto getAllData() {
        List<Holder> holders = holderService.getAll();
        int totalShareTokens = holders.stream().mapToInt(value -> value.getShareTokens()).sum();
        IcoPageDto icoPageDto = new IcoPageDto();
        icoPageDto.setTotalSupplyTokens(String.valueOf(HolderService.TOTAL_SUPPLY));
        icoPageDto.setSoldTokens(String.valueOf(totalShareTokens));
        icoPageDto.setHoldersCount(String.valueOf(holders.size()));
        List<HolderDto> holderDtoList = new ArrayList<>();
        holders.forEach(holder -> {
            HolderDto holderDto = new HolderDto(holder.getAddress(), holder.getTimeDate().toString(), String.valueOf(holder.getShareTokens()));
            holderDtoList.add(holderDto);
        });
        icoPageDto.setHolders(holderDtoList);

        return icoPageDto;
    }
}

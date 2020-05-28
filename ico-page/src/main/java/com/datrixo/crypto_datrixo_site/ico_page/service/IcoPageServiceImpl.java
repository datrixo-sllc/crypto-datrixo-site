package com.datrixo.crypto_datrixo_site.ico_page.service;

import com.datrixo.crypto_datrixo_site.ico_page.dto.HolderDto;
import com.datrixo.crypto_datrixo_site.ico_page.dto.IcoPageDto;
import com.datrixo.crypto_datrixo_site.ico_page.h2.model.Holder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
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
        BigInteger totalShareTokens = holders.stream()
                .map(Holder::getShareTokens)
                .reduce(BigInteger.ZERO, BigInteger::add);
        double share = holders.stream()
                .map(Holder::getShare)
                .reduce(0d, Double::sum);
        IcoPageDto icoPageDto = new IcoPageDto();
        icoPageDto.setTotalSupplyTokens(String.valueOf(holderService.getTotalSupply()));
        icoPageDto.setSoldEquity(String.valueOf(share));
        icoPageDto.setSoldTokens(String.valueOf(totalShareTokens));
        icoPageDto.setHoldersCount(String.valueOf(holders.size()));
        List<HolderDto> holderDtoList = new ArrayList<>();
        holders.forEach(holder -> {
            HolderDto holderDto = new HolderDto(holder.getAddress(), holder.getTimeDate(),
                    String.valueOf(holder.getShareTokens()), String.valueOf(holder.getShare()));
            holderDtoList.add(holderDto);
        });
        icoPageDto.setHolders(holderDtoList);

        return icoPageDto;
    }
}

package com.datrixo.crypto_datrixo_site.ico_page.service;

import com.datrixo.crypto_datrixo_site.ico_page.dto.HolderDto;
import com.datrixo.crypto_datrixo_site.ico_page.dto.IcoPageDto;
import com.datrixo.crypto_datrixo_site.ico_page.h2.model.Holder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

/**
 * Created by Yuri Nikiforov.
 * Date: 05.02.2019
 * Time: 11:26
 */
@Service
public class IcoPageServiceImpl implements IcoPageService {
    private final Logger LOGGER = LoggerFactory.getLogger(getClass());

    @Autowired
    private HolderService holderService;
    private static DecimalFormatSymbols symbols = new DecimalFormatSymbols(Locale.US);
    private static DecimalFormat df2 = new DecimalFormat("0.00", symbols);
    private static DecimalFormat df1 = new DecimalFormat("0.0", symbols);

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
        icoPageDto.setSoldEquity(df2.format(share));
        icoPageDto.setSoldTokens(String.valueOf(totalShareTokens));
        icoPageDto.setHoldersCount(String.valueOf(holders.size()));
        List<HolderDto> holderDtoList = new ArrayList<>();
        holders.forEach(holder -> {
            HolderDto holderDto = new HolderDto(holder.getAddress(), holder.getTimeDate(),
                    String.valueOf(holder.getShareTokens()), df1.format(holder.getPaidPrice()),
                    df2.format(holder.getShare()));
            holderDtoList.add(holderDto);
        });
        icoPageDto.setHolders(holderDtoList);

        return icoPageDto;
    }
}

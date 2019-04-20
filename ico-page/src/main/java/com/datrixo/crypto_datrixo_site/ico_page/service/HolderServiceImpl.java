package com.datrixo.crypto_datrixo_site.ico_page.service;

import com.datrixo.crypto_datrixo_site.ico_page.contract.DatrixoContract;
import com.datrixo.crypto_datrixo_site.ico_page.model.Holder;
import com.datrixo.crypto_datrixo_site.ico_page.repository.HolderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.WalletUtils;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.request.EthFilter;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.Contract;
import org.web3j.tx.ManagedTransaction;
import org.web3j.tx.gas.ContractGasProvider;
import org.web3j.tx.gas.DefaultGasProvider;

import javax.annotation.PostConstruct;
import java.math.BigInteger;
import java.util.Date;
import java.util.List;

/**
 * Created by Yuri Nikiforov.
 * Date: 05.02.2019
 * Time: 13:05
 */
@Service
public class HolderServiceImpl implements HolderService {
    @Autowired
    private HolderRepository holderRepository;

    @Autowired
    private Web3j web3j;

    private Credentials credentials;

    private ContractGasProvider contractGasProvider;

    @Value("${wallet.private-key}")
    private String walletPrivateKey;

    @Value("${smart-contract.address}")
    private String smartContractAddress;

    private DatrixoContract datrixoContract;

    private BigInteger totalSupply;
    private List<String> hareholders;



    @Override
    public BigInteger getTotalSupply() {
        return totalSupply;
    }

    @Override
    public void addHolder(Holder holder) {
        holderRepository.save(holder);
    }

    @Override
    public List<Holder> getAll() {
        return holderRepository.findAll();
    }

    /*
    @Override
    @Scheduled(fixedRate = 10000)
    @Transactional
    public void demoProcessing() {
        List<Holder> holders = holderRepository.findAll();
        int totalShareTokens = holders.stream().mapToInt(value -> value.getShareTokens()).sum();
        if (totalShareTokens < TOTAL_SUPPLY - 100) {
            holderRepository.save(new Holder("0xe5b25213d2F1cE8a998B632dc9d6c9719Eb993Ee", new Date(), 100));
        } else {
            holderRepository.deleteAll();
            holderRepository.save(new Holder("0xe5b25213d2F1cE8a998B632dc9d6c9719Eb993Ee", new Date(), 100));
        }
    }*/


    @PostConstruct
    private void init() {
        credentials = Credentials.create(walletPrivateKey);
        datrixoContract = DatrixoContract.load(smartContractAddress, web3j, credentials, new DefaultGasProvider());
        dbMemoryUpdate();
    }


    @Override
    @Scheduled(fixedRate = 3600000)
    @Transactional
    public void dbMemoryUpdate() {
        try {
            totalSupply = datrixoContract.totalSupply().send();
            hareholders = datrixoContract.getShareholdersArray().send();
            hareholders.forEach(s -> {
                try {
                    BigInteger balance = datrixoContract.balanceOf(s).send();
                    Date date = new Date(datrixoContract.firstPurchaseTime(s).send().longValue());
                    if (holderRepository.findFirstByAddress(s) == null) {
                        holderRepository.save(new Holder(s, date, balance));
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            });

        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}

/*
package com.datrixo.crypto_datrixo_site.ico_page.service;

import com.datrixo.crypto_datrixo_site.ico_page.contract.DatrixoContract;
import com.datrixo.crypto_datrixo_site.ico_page.h2.model.Holder;
import com.datrixo.crypto_datrixo_site.ico_page.h2.repository.HolderRepository;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.HolderAccount;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.User;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.repository.HolderAccountRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.tx.gas.ContractGasProvider;
import org.web3j.tx.gas.DefaultGasProvider;

import javax.annotation.PostConstruct;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Date;
import java.util.List;
import java.util.Optional;

*/
/**
 * Created by Yuri Nikiforov.
 * Date: 05.02.2019
 * Time: 13:05
 *//*

@Service
public class HolderServiceImpl implements HolderService {
    private final Logger LOGGER = LoggerFactory.getLogger(getClass());

    @Autowired
    private HolderRepository holderRepository;

    @Autowired
    private HolderAccountRepository holderAccountRepository;

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

    */
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
    }*//*



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
            if (totalSupply != null && totalSupply.signum() == 1 ) {
                totalSupply = totalSupply.divide(new BigInteger("100000"));
            }
            hareholders = datrixoContract.getShareholdersArray().send();
            holderRepository.deleteAll();
            hareholders.stream()
                    .filter(s -> !s.equalsIgnoreCase("0x0000000000000000000000000000000000000000"))
                    .forEach(s -> {
                try {
                    BigInteger balance = datrixoContract.balanceOf(s).send();
                    if (balance != null && balance.signum() == 1 ) {
                        balance = balance.divide(new BigInteger("100000"));
                    }
                    double share = 0;
                    if (totalSupply != null && totalSupply.signum() == 1) {
                        share = balance.doubleValue() / totalSupply.doubleValue() * 100d;
                    }
                    Date date = new Date(datrixoContract.firstPurchaseTime(s).send().longValue() * 1000);
                    HolderAccount holderAccount = holderAccountRepository.findFirstByAddress(s);
                    BigDecimal paidPrice = null;
                    if (holderAccount != null) {
                        if (!holderAccount.getInitialInvest()) {
                            paidPrice = holderAccount.getPaidPrice();
                        } else {
                            paidPrice = BigDecimal.ZERO;
                        }
                    }
                    holderRepository.save(new Holder(s, date, balance, paidPrice, share));
                } catch (Exception e) {
                    e.printStackTrace();
                }
            });

        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    @Override
    public Optional<List<HolderAccount>> findHolderAccountsByUser(User user) {
        return holderAccountRepository.findHolderAccountsByUser(user);
    }

    @Override
    public Optional<HolderAccount> findByAddress(String address) {
        return Optional.ofNullable(holderAccountRepository.findFirstByAddress(address));
    }

    @Override
    public Optional<Holder> findHolderByAddress(String address) {
        return Optional.ofNullable(holderRepository.findFirstByAddress(address));
    }
}
*/

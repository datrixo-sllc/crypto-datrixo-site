package com.datrixo.crypto_datrixo_site.ico_page.service;

import com.datrixo.crypto_datrixo_site.ico_page.h2.model.Holder;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.HolderAccount;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.User;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

/**
 * Created by Yuri Nikiforov.
 * Date: 05.02.2019
 * Time: 13:04
 */
public interface HolderService {
    BigInteger getTotalSupply();
    //void demoProcessing();
    void addHolder(Holder holder);
    List<Holder> getAll();
    void dbMemoryUpdate();
    Optional<List<HolderAccount>> findHolderAccountsByUser(User user);
    Optional<HolderAccount> findByAddress(String address);
}

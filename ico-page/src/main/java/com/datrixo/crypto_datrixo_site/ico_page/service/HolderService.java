package com.datrixo.crypto_datrixo_site.ico_page.service;

import com.datrixo.crypto_datrixo_site.ico_page.model.Holder;

import java.util.List;

/**
 * Created by Yuri Nikiforov.
 * Date: 05.02.2019
 * Time: 13:04
 */
public interface HolderService {
    int TOTAL_SUPPLY = 200000;
    void demoProcessing();
    void addHolder(Holder holder);
    List<Holder> getAll();
}

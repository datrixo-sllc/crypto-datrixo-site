package com.datrixo.crypto_datrixo_site.ico_page.service;

import com.datrixo.crypto_datrixo_site.ico_page.model.Holder;
import com.datrixo.crypto_datrixo_site.ico_page.repository.HolderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Override
    public void addHolder(Holder holder) {
        holderRepository.save(holder);
    }

    @Override
    public List<Holder> getAll() {
        return holderRepository.findAll();
    }

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
    }
}

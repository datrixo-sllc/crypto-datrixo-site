package com.datrixo.crypto_datrixo_site.ico_page.mysql.repository;

import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.HolderAccount;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Yuri Nikiforov.
 * Date: 08.06.2020
 * Time: 15:40
 **/
public interface HolderAccountRepository extends JpaRepository<HolderAccount, Long> {
    HolderAccount findFirstByAddress(String address);
}

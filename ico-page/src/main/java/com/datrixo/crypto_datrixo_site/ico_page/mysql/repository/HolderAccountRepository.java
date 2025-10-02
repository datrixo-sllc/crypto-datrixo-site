package com.datrixo.crypto_datrixo_site.ico_page.mysql.repository;

import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.HolderAccount;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Created by Yuri Nikiforov.
 * Date: 08.06.2020
 * Time: 15:40
 **/
@Repository
public interface HolderAccountRepository extends JpaRepository<HolderAccount, Long> {
    HolderAccount findFirstByAddress(String address);
    HolderAccount findFirstByUser(User user);
    Optional<List<HolderAccount>> findHolderAccountsByUser(User user);
}

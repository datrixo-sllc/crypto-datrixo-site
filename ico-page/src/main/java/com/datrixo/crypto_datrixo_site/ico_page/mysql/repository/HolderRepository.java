package com.datrixo.crypto_datrixo_site.ico_page.mysql.repository;


// import com.datrixo.crypto_datrixo_site.ico_page.h2.model.Holder;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.Holder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Yuri Nikiforov.
 * Date: 05.02.2019
 * Time: 13:02
 */
@Repository
public interface HolderRepository extends JpaRepository<Holder, Long> {
    Holder findFirstByAddress(String address);
}

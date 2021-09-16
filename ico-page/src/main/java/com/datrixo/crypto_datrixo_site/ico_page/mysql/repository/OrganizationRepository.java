package com.datrixo.crypto_datrixo_site.ico_page.mysql.repository;

import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.Organization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Created by Yuri Nikiforov.
 * Date: 05.09.2021
 * Time: 11:25
 **/
@Repository
public interface OrganizationRepository extends JpaRepository<Organization, Long> {
    Optional<Organization> findFirstByCompanyName(String companyName);
}

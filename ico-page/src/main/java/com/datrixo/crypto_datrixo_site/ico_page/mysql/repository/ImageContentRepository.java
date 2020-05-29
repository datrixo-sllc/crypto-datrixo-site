package com.datrixo.crypto_datrixo_site.ico_page.mysql.repository;

import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.ImageContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Yuri Nikiforov.
 * Date: 29.05.2020
 * Time: 16:45
 **/
@Repository
public interface ImageContentRepository extends JpaRepository<ImageContent, Long> {
}

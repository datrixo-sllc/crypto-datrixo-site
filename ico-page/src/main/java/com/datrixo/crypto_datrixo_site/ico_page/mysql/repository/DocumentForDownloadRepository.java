package com.datrixo.crypto_datrixo_site.ico_page.mysql.repository;

import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.DocumentForDownload;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.util.DocumentType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Created by Yuri Nikiforov.
 * Date: 05.12.2020
 * Time: 20:01
 **/
@Repository
public interface DocumentForDownloadRepository extends JpaRepository<DocumentForDownload, Long> {
    Optional<DocumentForDownload> findFirstByDocTypeOrderByStartDateDesc(DocumentType documentType);
    Optional<DocumentForDownload> findFirstById(Long id);
    Optional<DocumentForDownload> findFirstByActualTrueAndDocTypeEquals(DocumentType docType);

    // Обновляем actual = false для всех записей с заданным docType, где actual = true
    @Modifying
    @Query("UPDATE DocumentForDownload d SET d.actual = false WHERE d.docType = :docType AND d.actual = true")
    void updateActualToFalseByDocType(DocumentType docType);
}

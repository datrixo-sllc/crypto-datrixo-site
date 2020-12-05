package com.datrixo.crypto_datrixo_site.ico_page.mysql.repository;

import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.SignedDocument;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.jws.soap.SOAPBinding;
import java.util.List;
import java.util.Optional;

/**
 * Created by Yuri Nikiforov.
 * Date: 05.12.2020
 * Time: 20:18
 **/
@Repository
public interface SignedDocumentRepository extends JpaRepository<SignedDocument, Long> {
    Optional<List<SignedDocument>> findAllByUser(User user);
    Optional<SignedDocument> findById(Long id);
}

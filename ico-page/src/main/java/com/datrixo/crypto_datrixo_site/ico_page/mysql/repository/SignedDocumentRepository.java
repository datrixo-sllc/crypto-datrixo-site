package com.datrixo.crypto_datrixo_site.ico_page.mysql.repository;

import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.HolderAccount;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.SignedDocument;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import jakarta.jws.soap.SOAPBinding;
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
    Optional<List<SignedDocument>> findAllByHolderAccount(HolderAccount holderAccount);
    Optional<SignedDocument> findById(Long id);
}

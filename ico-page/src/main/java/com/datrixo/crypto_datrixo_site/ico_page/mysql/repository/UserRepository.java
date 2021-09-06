package com.datrixo.crypto_datrixo_site.ico_page.mysql.repository;

import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Created by Yuri Nikiforov.
 * Date: 18.05.2019
 * Time: 19:18
 **/
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String email);

    @Query("select u from User u " +
            "join fetch u.imageContent im " +
            "join fetch u.organization o " +
            "join fetch o.country c " +
            "join fetch u.accounts a")
    List<User> findAll();
}

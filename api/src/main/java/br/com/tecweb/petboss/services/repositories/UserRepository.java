package br.com.tecweb.petboss.services.repositories;

import br.com.tecweb.petboss.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * @author : Luiz Rodrigues
 * @since : 16/05/2021
 */

@Repository
public interface UserRepository extends BaseRepository<User> {

    User findUserByEmail(String email);

    Optional<User> findByEmail(String email);

    Page<User> findAllByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(String q1, String q2, Pageable pageable);
}

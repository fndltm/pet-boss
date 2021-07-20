package br.com.tecweb.petboss.services.repositories;

import br.com.tecweb.petboss.models.Role;
import org.springframework.stereotype.Repository;

/**
 * @author : Luiz Rodrigues
 * @since : 16/05/2021
 */

@Repository
public interface RoleRepository extends BaseRepository<Role> {
    Role findByName(String name);
}

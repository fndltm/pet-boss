package br.com.tecweb.petboss.services;

import br.com.tecweb.petboss.models.Role;

import java.util.Set;

/**
 * @author : Luiz Rodrigues
 * @since : 16/05/2021
 */

public interface RoleService extends BaseService<Role> {
    Set<Role> createAdminAndUser();

    Set<Role> findUserRole();
}

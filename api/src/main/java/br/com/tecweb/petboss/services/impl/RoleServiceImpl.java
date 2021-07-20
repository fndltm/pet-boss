package br.com.tecweb.petboss.services.impl;

import br.com.tecweb.petboss.models.Role;
import br.com.tecweb.petboss.services.RoleService;
import br.com.tecweb.petboss.services.repositories.RoleRepository;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

/**
 * @author : Luiz Rodrigues
 * @since : 16/05/2021
 */

@Service
@Getter(AccessLevel.PRIVATE)
@Slf4j
public class RoleServiceImpl extends BaseServiceImpl<Role> implements RoleService {

    private final RoleRepository roleRepository;

    @Autowired
    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public Set<Role> createAdminAndUser() {
        final var roles = new HashSet<Role>();

        if (roleRepository.findByName("ADMIN") == null) {
            roles.add(Role.builder().name("ADMIN").build());
        }
        if (roleRepository.findByName("USER") == null) {
            roles.add(Role.builder().name("USER").build());
        }

        return new HashSet<>(roleRepository.saveAll(roles));
    }

    @Override
    public Set<Role> findUserRole() {
        return new HashSet<>(Collections.singletonList(roleRepository.findByName("USER")));
    }
}

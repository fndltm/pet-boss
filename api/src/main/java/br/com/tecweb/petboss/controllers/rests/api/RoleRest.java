package br.com.tecweb.petboss.controllers.rests.api;

import br.com.tecweb.petboss.controllers.rests.api.constants.RoleRoutes;
import br.com.tecweb.petboss.models.Role;
import br.com.tecweb.petboss.services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

/**
 * @author : Luiz Rodrigues
 * @since : 16/05/2021
 */

@RestController
@RequestMapping(RoleRoutes.ROLE_REST_BASE_ROUTE)
public class RoleRest extends BaseRest<Role> {

    private final RoleService roleService;

    @Autowired
    public RoleRest(RoleService roleService) {
        this.roleService = roleService;
    }

    @PostMapping(RoleRoutes.CREATE_ADMIN_AND_USER_ROUTE)
    public ResponseEntity<Set<Role>> createAdminAndUser() {
        return ResponseEntity.ok(roleService.createAdminAndUser());
    }
}

package br.com.tecweb.petboss.controllers.rests.api.constants;

/**
 * @author : Luiz Rodrigues
 * @since : 16/05/2021
 */

public final class RoleRoutes {
    private RoleRoutes() {
        throw new IllegalStateException("This class should not have constructor!");
    }

    public static final String ROLE_REST_BASE_ROUTE = "/api/v1/roles";

    public static final String CREATE_ADMIN_AND_USER_ROUTE = "/admin-and-user";
}

package br.com.tecweb.petboss.controllers.rests.api.constants;

/**
 * @author : Luiz Rodrigues
 * @since : 16/05/2021
 */

public final class UserRoutes {
    private UserRoutes() {
        throw new IllegalStateException("This class should not have constructor!");
    }

    public static final String USER_REST_BASE_ROUTE = "/api/v1/users";

    public static final String CREATE_ADMIN_REST_ROUTE = "/admin";
    public static final String CREATE_SOCIAL_USER_REST_ROUTE = "/social";
    public static final String VALIDATE_EMAIL_USER_REST_ROUTE = "/validate/{id}";
    public static final String VALIDATE_EMAIL_REST_ROUTE = "/validate";
}

package br.com.tecweb.petboss.controllers.rests.api.constants;

/**
 * @author : Luiz Rodrigues
 * @since : 16/05/2021
 */

public final class AuthRoutes {
    private AuthRoutes() {
        throw new IllegalStateException("This class should not have constructor!");
    }

    private static final String AUTH_REST_BASE_ROUTE = "/api/v1";

    public static final class AuthenticationRoutes {
        private AuthenticationRoutes() {
            throw new IllegalStateException("This class should not have constructor!");
        }

        public static final String LOGIN_REST_ROUTE = AUTH_REST_BASE_ROUTE + "/login/token/generate-token";
        public static final String LOGOUT_REST_ROUTE = "/logout";
        public static final String ENCODE_PASSWORD_REST_ROUTE = AUTH_REST_BASE_ROUTE + "/encode-password";
    }
}

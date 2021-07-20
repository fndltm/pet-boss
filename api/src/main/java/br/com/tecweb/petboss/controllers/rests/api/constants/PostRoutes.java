package br.com.tecweb.petboss.controllers.rests.api.constants;

/**
 * @author : Luiz Rodrigues
 * @since : 16/05/2021
 */

public final class PostRoutes {
    private PostRoutes() {
        throw new IllegalStateException("This class should not have constructor!");
    }

    public static final String POST_REST_BASE_ROUTE = "/api/v1/posts";

    public static final String UPLOAD_FILE_REST_BASE_ROUTE = "/upload";
}

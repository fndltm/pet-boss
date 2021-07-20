package br.com.tecweb.petboss.resources.requests;

import lombok.Data;

/**
 * @author : Luiz Rodrigues
 * @since : 16/05/2021
 */

public @Data
class UserTokenRequest {
    private Long id;

    private String email;

    private String password;

    private String name;
}

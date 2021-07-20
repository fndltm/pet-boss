package br.com.tecweb.petboss.resources.responses;

import lombok.*;

/**
 * @author : Luiz Rodrigues
 * @since : 16/05/2021
 */

// Lombok
@AllArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
@ToString
public class AuthTokenResponse {
    private String token;
}

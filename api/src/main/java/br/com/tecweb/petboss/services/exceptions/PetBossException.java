package br.com.tecweb.petboss.services.exceptions;

/**
 * @author : Luiz Rodrigues
 * @since : 16/05/2021
 */

public class PetBossException extends RuntimeException {

    public PetBossException() {
        super();
    }

    public PetBossException(String message) {
        super(message);
    }

    public PetBossException(String message, Throwable cause) {
        super(message, cause);
    }

    public PetBossException(Throwable cause) {
        super(cause);
    }

    public PetBossException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}

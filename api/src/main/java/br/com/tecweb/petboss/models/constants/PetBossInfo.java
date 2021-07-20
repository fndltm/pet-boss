package br.com.tecweb.petboss.models.constants;

/**
 * @author : Luiz Rodrigues
 * @since : 16/05/2021
 */
public final class PetBossInfo {
    private PetBossInfo() {
        throw new IllegalStateException("This class should not have constructor!");
    }

    public static final String DATABASE_NAME = "petboss";
    public static final String SCHEMA = "public";
}

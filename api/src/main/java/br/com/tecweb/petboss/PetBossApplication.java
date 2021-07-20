package br.com.tecweb.petboss;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

/**
 * @author : Luiz Rodrigues
 * @since : 16/05/2021
 */

@SpringBootApplication
@EnableJpaRepositories
@EnableJpaAuditing
public class PetBossApplication {

    public static void main(String[] args) {
        SpringApplication.run(PetBossApplication.class, args);
    }

}

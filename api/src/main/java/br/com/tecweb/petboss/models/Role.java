package br.com.tecweb.petboss.models;

import br.com.tecweb.petboss.models.constants.PetBossInfo;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * @author : Luiz Rodrigues
 * @since : 16/05/2021
 */

// Lombok
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
@EqualsAndHashCode(callSuper = false)
// JPA
@Entity
@Table(name = "role", schema = PetBossInfo.SCHEMA, catalog = PetBossInfo.DATABASE_NAME)
public @Data
class Role extends Base {

    private String name;
}

package br.com.tecweb.petboss.models;

import br.com.tecweb.petboss.models.constants.PetBossInfo;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

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
@Table(name = "usuario", schema = PetBossInfo.SCHEMA, catalog = PetBossInfo.DATABASE_NAME)
public @Data
class User extends Base {

    private String name;

    @Column(unique = true)
    private String email;

    private String password;

    private Boolean active;

    @Enumerated(EnumType.STRING)
    private SocialProvider provider;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinTable(
            name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();
}

package br.com.tecweb.petboss.models;

import br.com.tecweb.petboss.models.constants.PetBossInfo;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

/**
 * @author : Luiz Rodrigues
 * @since : 16/05/2021
 */

// Lombok
@EqualsAndHashCode(callSuper = false)
// JPA
@Entity
@Table(name = "comment", schema = PetBossInfo.SCHEMA, catalog = PetBossInfo.DATABASE_NAME)
public @Data
class Comment extends Base {

    private String description;

    @ManyToOne
    private Post post;

    @ManyToOne
    private User user;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinTable(
            name = "comment_likes",
            joinColumns = @JoinColumn(name = "comment_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<User> users = new HashSet<>();
}

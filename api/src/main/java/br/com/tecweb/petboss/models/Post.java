package br.com.tecweb.petboss.models;

import br.com.tecweb.petboss.models.constants.PetBossInfo;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * @author : Luiz Rodrigues
 * @since : 16/05/2021
 */

// Lombok
@EqualsAndHashCode(callSuper = false)
// JPA
@Entity
@Table(name = "post", schema = PetBossInfo.SCHEMA, catalog = PetBossInfo.DATABASE_NAME)
public @Data
class Post extends Base {

    private String title;

    private String subtitle;

    private String description;

    private String image;

    private Long visualizations;

    @ManyToOne
    private User author;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "post")
    private List<Comment> comments = new ArrayList<>();

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinTable(
            name = "post_likes",
            joinColumns = @JoinColumn(name = "post_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<User> users = new HashSet<>();
}

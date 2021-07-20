package br.com.tecweb.petboss.services;

import br.com.tecweb.petboss.models.User;
import lombok.NonNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;

/**
 * @author : Luiz Rodrigues
 * @since : 16/05/2021
 */

public interface UserService extends BaseService<User> {
    User createAdmin();

    User createSocialUser(User user);

    User findByEmail(String email);

    Boolean isValidEmail(Long userId, String email);

    Page<User> find(@NonNull Integer page, @NonNull Integer size, @NonNull String sort, @NonNull Sort.Direction direction, @NonNull String q);

    Page<User> find(@NonNull Integer page, @NonNull Integer size, @NonNull String q);
}

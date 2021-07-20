package br.com.tecweb.petboss.services.impl;

import br.com.tecweb.petboss.models.User;
import br.com.tecweb.petboss.services.RoleService;
import br.com.tecweb.petboss.services.UserService;
import br.com.tecweb.petboss.services.exceptions.PetBossException;
import br.com.tecweb.petboss.services.repositories.UserRepository;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * @author : Luiz Rodrigues
 * @since : 16/05/2021
 */

@Service
@Getter(AccessLevel.PRIVATE)
@Slf4j
public class UserServiceImpl extends BaseServiceImpl<User> implements UserService {

    private final UserRepository repository;

    private final RoleService roleService;

    @Autowired
    public UserServiceImpl(UserRepository repository, RoleService roleService) {
        this.repository = repository;
        this.roleService = roleService;
    }

    @Override
    public User save(@NonNull User baseEntity) {
        if (baseEntity.getPassword() != null) {
            baseEntity.setPassword(new BCryptPasswordEncoder().encode(baseEntity.getPassword()));
        }
        return super.save(baseEntity);
    }

    @Override
    public User update(@NonNull Long id, @NonNull User baseEntity) {
        return repository.findById(id)
                .map(item -> {
                    if (baseEntity.getPassword() == null) {
                        baseEntity.setPassword(item.getPassword());
                    } else {
                        baseEntity.setPassword(new BCryptPasswordEncoder().encode(baseEntity.getPassword()));
                    }
                    BeanUtils.copyProperties(baseEntity, item);
                    item.setId(id);
                    return repository.save(item);
                }).orElseThrow(() -> new PetBossException("Usuário não encontrado!"));
    }

    @Override
    public User createAdmin() {
        final var user = User.builder()
                .email("admin@petboss.com")
                .password(new BCryptPasswordEncoder().encode("123"))
                .name("Admin Petboss")
                .active(true)
                .roles(roleService.createAdminAndUser())
                .build();

        return repository.save(user);
    }

    @Override
    public User createSocialUser(User user) {
        user.setRoles(roleService.findUserRole());

        final var res = repository.findUserByEmail(user.getEmail());
        if (res == null) {
            return save(user);
        }

        return res;
    }

    @Override
    public User findByEmail(String email) {
        return repository.findUserByEmail(email);
    }

    @Override
    public Boolean isValidEmail(Long userId, String email) {
        var usuario = this.repository.findByEmail(email).orElse(null);
        return usuario == null || usuario.getId().equals(userId);
    }

    @Override
    public Page<User> find(@NonNull Integer page, @NonNull Integer size, @NonNull String sort, Sort.@NonNull Direction direction, @NonNull String q) {
        var directionSort = direction.equals(Sort.Direction.DESC) ? Sort.Direction.DESC : Sort.Direction.ASC;
        return repository.findAllByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(q, q, PageRequest.of(page, size, Sort.by(directionSort, sort)));
    }

    @Override
    public Page<User> find(@NonNull Integer page, @NonNull Integer size, @NonNull String q) {
        return repository.findAllByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(q, q, PageRequest.of(page, size));
    }
}

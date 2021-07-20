package br.com.tecweb.petboss.services;

import br.com.tecweb.petboss.models.Base;
import lombok.NonNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BaseService<T extends Base> {
    List<T> findAll();

    Page<T> findAllPage(@NonNull Integer page, @NonNull Integer size, @NonNull String sort, @NonNull Sort.Direction direction);

    Page<T> findAllPage(@NonNull Integer page, @NonNull Integer size);

    T findById(@NonNull Long id);

    T save(@NonNull T baseEntity);

    T update(@NonNull Long id, @NonNull T baseEntity);

    void delete(Long id);
}

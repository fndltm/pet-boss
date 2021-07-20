package br.com.tecweb.petboss.services.impl;

import br.com.tecweb.petboss.models.Base;
import br.com.tecweb.petboss.services.BaseService;
import br.com.tecweb.petboss.services.exceptions.PetBossException;
import br.com.tecweb.petboss.services.repositories.BaseRepository;
import lombok.NonNull;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BaseServiceImpl<T extends Base> implements BaseService<T> {

    @Autowired
    private BaseRepository<T> baseRepository;

    @Override
    public List<T> findAll() {
        return baseRepository.findAll();
    }

    @Override
    public Page<T> findAllPage(@NonNull Integer page, @NonNull Integer size) {
        return baseRepository.findAll(PageRequest.of(page, size));
    }

    @Override
    public Page<T> findAllPage(@NonNull Integer page, @NonNull Integer size, @NonNull String sort, @NonNull Sort.Direction direction) {
        var directionSort = direction.equals(Sort.Direction.DESC) ? Sort.Direction.DESC : Sort.Direction.ASC;
        return baseRepository.findAll(PageRequest.of(page, size, Sort.by(directionSort, sort)));
    }

    @Override
    public T findById(@NonNull Long id) {
        return baseRepository.findById(id).orElse(null);
    }

    @Override
    public T save(@NonNull T baseEntity) {
        return baseRepository.save(baseEntity);
    }

    @Override
    public T update(@NonNull Long id, @NonNull T baseEntity) {
        return baseRepository.findById(id)
                .map(item -> {
                    BeanUtils.copyProperties(baseEntity, item);
                    item.setId(id);
                    return baseRepository.save(item);
                }).orElseThrow(() -> new PetBossException("Item não encontrado!"));
    }

    @Override
    public void delete(Long id) {
        baseRepository.deleteById(id);
    }
}

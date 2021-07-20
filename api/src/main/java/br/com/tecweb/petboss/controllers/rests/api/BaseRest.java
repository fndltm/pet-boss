package br.com.tecweb.petboss.controllers.rests.api;

import br.com.tecweb.petboss.models.Base;
import br.com.tecweb.petboss.services.BaseService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@ResponseBody
public class BaseRest<T extends Base> {

    @Autowired
    private BaseService<T> baseService;

    @GetMapping
    public ResponseEntity<List<T>> findAll() {
        return ResponseEntity.ok(baseService.findAll());
    }

    @GetMapping(params = {"page", "size"})
    public ResponseEntity<Page<T>> findAllPage(@RequestParam @NonNull Integer page, @RequestParam @NonNull Integer size) {
        return ResponseEntity.ok(baseService.findAllPage(page, size));
    }

    @GetMapping(params = {"page", "size", "sort", "direction"})
    public ResponseEntity<Page<T>> findAllPage(@RequestParam @NonNull Integer page, @RequestParam @NonNull Integer size, @RequestParam @NonNull String sort, @RequestParam @NonNull Sort.Direction direction) {
        return ResponseEntity.ok(baseService.findAllPage(page, size, sort, direction));
    }

    @GetMapping("/{id}")
    public ResponseEntity<T> findById(@PathVariable Long id) {
        return ResponseEntity.ok(baseService.findById(id));
    }

    @PostMapping
    public ResponseEntity<T> save(@RequestBody T baseEntity) {
        return ResponseEntity.ok(baseService.save(baseEntity));
    }

    @PutMapping("/{id}")
    public ResponseEntity<T> update(@PathVariable Long id, @RequestBody T baseEntity) {
        return ResponseEntity.ok(baseService.update(id, baseEntity));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id) {
        baseService.delete(id);
    }
}

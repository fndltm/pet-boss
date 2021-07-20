package br.com.tecweb.petboss.services.repositories;

import br.com.tecweb.petboss.models.Base;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BaseRepository<T extends Base> extends JpaRepository<T, Long> {
}

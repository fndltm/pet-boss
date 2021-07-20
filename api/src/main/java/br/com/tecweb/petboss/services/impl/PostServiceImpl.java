package br.com.tecweb.petboss.services.impl;

import br.com.tecweb.petboss.models.Post;
import br.com.tecweb.petboss.services.PostService;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * @author : Luiz Rodrigues
 * @since : 16/05/2021
 */

@Service
@Getter(AccessLevel.PRIVATE)
@Slf4j
public class PostServiceImpl extends BaseServiceImpl<Post> implements PostService {
}

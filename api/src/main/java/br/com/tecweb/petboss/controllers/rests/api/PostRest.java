package br.com.tecweb.petboss.controllers.rests.api;

import br.com.tecweb.petboss.controllers.rests.api.constants.PostRoutes;
import br.com.tecweb.petboss.models.Post;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author : Luiz Rodrigues
 * @since : 16/05/2021
 */

@RestController
@RequestMapping(PostRoutes.POST_REST_BASE_ROUTE)
public class PostRest extends BaseRest<Post> {

    /*@PostMapping(PostRoutes.UPLOAD_FILE_REST_BASE_ROUTE)
    public ResponseEntity<Post> uploadFile(@RequestParam List<MultipartFile> files, @RequestParam String data) {

    }*/
}

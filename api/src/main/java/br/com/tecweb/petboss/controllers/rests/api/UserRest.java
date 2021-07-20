package br.com.tecweb.petboss.controllers.rests.api;

import br.com.tecweb.petboss.configurations.security.JwtTokenUtil;
import br.com.tecweb.petboss.controllers.rests.api.constants.UserRoutes;
import br.com.tecweb.petboss.models.User;
import br.com.tecweb.petboss.resources.responses.AuthTokenResponse;
import br.com.tecweb.petboss.services.UserService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * @author : Luiz Rodrigues
 * @since : 16/05/2021
 */

@RestController
@RequestMapping(UserRoutes.USER_REST_BASE_ROUTE)
public class UserRest extends BaseRest<User> {

    private final UserService userService;
    private final JwtTokenUtil jwtTokenUtil;

    @Autowired
    public UserRest(UserService userService, JwtTokenUtil jwtTokenUtil) {
        this.userService = userService;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @PostMapping(UserRoutes.CREATE_ADMIN_REST_ROUTE)
    public ResponseEntity<User> createAdmin() {
        return ResponseEntity.ok(userService.createAdmin());
    }

    @PostMapping(UserRoutes.CREATE_SOCIAL_USER_REST_ROUTE)
    public ResponseEntity<AuthTokenResponse> createSocialuser(@RequestBody User user) {
        return ResponseEntity.ok(new AuthTokenResponse(jwtTokenUtil.generateToken(userService.createSocialUser(user))));
    }

    @GetMapping(value = "/search", params = {"page", "size", "sort", "direction", "q"})
    public ResponseEntity<Page<User>> find(@RequestParam @NonNull Integer page, @RequestParam @NonNull Integer size, @RequestParam @NonNull String sort, @RequestParam @NonNull Sort.Direction direction, @RequestParam @NonNull String q) {
        return ResponseEntity.ok(userService.find(page, size, sort, direction, q));
    }

    @GetMapping(value = "/search", params = {"page", "size", "q"})
    public ResponseEntity<Page<User>> find(@RequestParam @NonNull Integer page, @RequestParam @NonNull Integer size, @RequestParam @NonNull String q) {
        return ResponseEntity.ok(userService.find(page, size, q));
    }

    @GetMapping(value = {UserRoutes.VALIDATE_EMAIL_USER_REST_ROUTE, UserRoutes.VALIDATE_EMAIL_REST_ROUTE})
    public ResponseEntity<Boolean> validateUserEmail(@PathVariable(required = false) Long id, @RequestParam String email) {
        return ResponseEntity.ok(userService.isValidEmail(id, email));
    }
}

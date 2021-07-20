package br.com.tecweb.petboss.controllers.rests.api;

import br.com.tecweb.petboss.configurations.security.JwtTokenUtil;
import br.com.tecweb.petboss.controllers.rests.api.constants.AuthRoutes;
import br.com.tecweb.petboss.resources.requests.UserTokenRequest;
import br.com.tecweb.petboss.resources.responses.AuthTokenResponse;
import br.com.tecweb.petboss.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author : Luiz Rodrigues
 * @since : 16/05/2021
 */

@RestController
public class AuthRest {

    private final AuthenticationManager authenticationManager;

    private final JwtTokenUtil jwtTokenUtil;

    private final UserService userService;

    @Autowired
    public AuthRest(AuthenticationManager authenticationManager, JwtTokenUtil jwtTokenUtil, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.userService = userService;
    }

    @PostMapping(AuthRoutes.AuthenticationRoutes.LOGIN_REST_ROUTE)
    public ResponseEntity<AuthTokenResponse> login(@RequestBody UserTokenRequest user) throws AuthenticationException {
        final var userRes = userService.findByEmail(user.getEmail());
        if (Boolean.FALSE.equals(userRes.getActive())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Usuário inativo!");
        }

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
        );
        return ResponseEntity.ok(new AuthTokenResponse(jwtTokenUtil.generateToken(userRes)));
    }

    @PostMapping(AuthRoutes.AuthenticationRoutes.LOGOUT_REST_ROUTE)
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        final var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            new SecurityContextLogoutHandler().logout(request, response, authentication);
        }
        return ResponseEntity.ok("Sucesso ao sair!");
    }

    @GetMapping(AuthRoutes.AuthenticationRoutes.ENCODE_PASSWORD_REST_ROUTE)
    public ResponseEntity<String> encodePassword(@RequestParam String password) {
        return ResponseEntity.ok(new BCryptPasswordEncoder().encode(password));
    }
}

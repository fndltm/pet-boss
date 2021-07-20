package br.com.tecweb.petboss.configurations.security;

import br.com.tecweb.petboss.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * @author : Luiz Rodrigues
 * @since : 16/05/2021
 */

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserService userService;

    @Autowired
    public UserDetailsServiceImpl(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        final var user = userService.findByEmail(username);
        if (user == null)
            throw new UsernameNotFoundException("Invalid email or password.");
        return new UserDetailsCustom(user);
    }
}

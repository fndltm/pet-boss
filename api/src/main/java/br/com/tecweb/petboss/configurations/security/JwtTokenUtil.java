package br.com.tecweb.petboss.configurations.security;

import br.com.tecweb.petboss.models.User;
import br.com.tecweb.petboss.resources.requests.UserTokenRequest;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.BeanUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.function.Function;

/**
 * @author : Luiz Rodrigues
 * @since : 16/05/2021
 */

@Component
public class JwtTokenUtil implements Serializable {

    static final String SIGNING_KEY = "petboss";
    static final String TOKEN_PREFIX = "Bearer ";
    static final String HEADER_STRING = "Authorization";
    @Serial
    private static final long serialVersionUID = 1L;

    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        return claimsResolver.apply(getAllClaimsFromToken(token));
    }

    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(SIGNING_KEY)
                .parseClaimsJws(token)
                .getBody();
    }

    private boolean isTokenExpired(String token) {
        return getExpirationDateFromToken(token).before(new Date());
    }

    public String generateToken(User usuario) {
        return doGenerateToken(usuario);
    }

    private String doGenerateToken(User user) {
        var claims = Jwts.claims().setSubject(user.getEmail());
        var userTokenRequest = new UserTokenRequest();
        BeanUtils.copyProperties(user, userTokenRequest);
        userTokenRequest.setPassword(null);
        claims.put("scopes", userTokenRequest);
        claims.put("roles", user.getRoles());
        return Jwts.builder()
                .setClaims(claims)
                .setIssuer("PetBoss")
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(Date.from(LocalDateTime.now().plusDays(5L).atZone(ZoneId.systemDefault()).toInstant()))
                .signWith(SignatureAlgorithm.HS256, SIGNING_KEY)
                .compact();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        return getUsernameFromToken(token).equals(userDetails.getUsername()) && !isTokenExpired(token);
    }
}

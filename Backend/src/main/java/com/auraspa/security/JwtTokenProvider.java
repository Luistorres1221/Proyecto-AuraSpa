package com.auraspa.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtTokenProvider {
    
    @Value("${jwt.secret}")
    private String JWT_SECRET;
    
    @Value("${jwt.expiration}")
    private Long JWT_EXPIRATION_MS;
    
    @Value("${jwt.refresh-expiration}")
    private Long JWT_REFRESH_EXPIRATION_MS;
    
    /**
     * Generates a JWT access token for the given user email
     */
    public String generateAccessToken(String email) {
        return createToken(email, JWT_EXPIRATION_MS);
    }
    
    /**
     * Generates a JWT refresh token for the given user email
     */
    public String generateRefreshToken(String email) {
        return createToken(email, JWT_REFRESH_EXPIRATION_MS);
    }
    
    /**
     * Creates a JWT token with the specified email and expiration time
     */
    @SuppressWarnings("deprecation")
    private String createToken(String email, Long expirationMs) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expirationMs);
        
        SecretKey key = Keys.hmacShaKeyFor(JWT_SECRET.getBytes());
        
        return Jwts.builder()
                .subject(email)
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }
    
    /**
     * Validates if a JWT token is valid and not expired
     */
    public boolean validateToken(String token) {
        try {
            SecretKey key = Keys.hmacShaKeyFor(JWT_SECRET.getBytes());
            Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    
    /**
     * Extracts the email (subject) from a JWT token
     */
    public String getEmailFromToken(String token) {
        try {
            SecretKey key = Keys.hmacShaKeyFor(JWT_SECRET.getBytes());
            Claims claims = Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
            return claims.getSubject();
        } catch (Exception e) {
            return null;
        }
    }
    
    /**
     * Extracts all claims from a JWT token
     */
    public Claims getClaimsFromToken(String token) {
        try {
            SecretKey key = Keys.hmacShaKeyFor(JWT_SECRET.getBytes());
            return Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
        } catch (Exception e) {
            return null;
        }
    }
    
    /**
     * Checks if a token is expired
     */
    public boolean isTokenExpired(String token) {
        try {
            Claims claims = getClaimsFromToken(token);
            return claims != null && claims.getExpiration().before(new Date());
        } catch (Exception e) {
            return true;
        }
    }
    
    /**
     * Gets the expiration time from a JWT token
     */
    public Long getExpirationTime(String token) {
        try {
            Claims claims = getClaimsFromToken(token);
            if (claims != null) {
                return claims.getExpiration().getTime();
            }
        } catch (Exception e) {
            // Token invalid or expired
        }
        return null;
    }
}

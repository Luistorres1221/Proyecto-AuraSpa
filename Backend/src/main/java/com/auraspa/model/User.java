package com.auraspa.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre es obligatorio")
    @Column(nullable = false)
    private String name;

    @NotBlank(message = "El apellido es obligatorio")
    @Column(nullable = false)
    private String lastname;

    @NotBlank(message = "El correo es obligatorio")
    @Email(message = "El correo debe ser válido")
    @Column(nullable = false, unique = true)
    private String email;

    @NotBlank(message = "La contraseña es obligatoria")
    @Column(nullable = false)
    private String password;

    @NotBlank(message = "El teléfono es obligatorio")
    @Column(nullable = false, unique = true)
    private String phone;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role = UserRole.CLIENT;

    @Column(name = "email_verified", nullable = false)
    private Boolean emailVerified = false;

    @Column(name = "verification_token")
    private String verificationToken;

    @Column(name = "verification_token_expires")
    private LocalDateTime verificationTokenExpires;

    @Column(name = "email_verified_at")
    private LocalDateTime emailVerifiedAt;

    @Column(name = "active", nullable = false)
    private Boolean active = true;

    @Column(name = "blocked", nullable = false)
    private Boolean blocked = false;

    @Column(name = "blocked_until")
    private LocalDateTime blockedUntil;

    @Column(name = "failed_login_attempts")
    private Integer failedLoginAttempts = 0;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "last_login")
    private LocalDateTime lastLogin;

    @Column(name = "last_login_ip")
    private String lastLoginIp;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    // JWT Refresh Tokens
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<RefreshToken> refreshTokens;

    // Login History
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<LoginHistory> loginHistory;

    // Two Factor Authentication
    @Column(name = "two_fa_enabled", nullable = false)
    private Boolean twoFaEnabled = false;

    @Column(name = "two_fa_secret")
    private String twoFaSecret;

    @Column(name = "two_fa_verified")
    private Boolean twoFaVerified = false;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getLastname() { return lastname; }
    public void setLastname(String lastname) { this.lastname = lastname; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public UserRole getRole() { return role; }
    public void setRole(UserRole role) { this.role = role; }

    public Boolean getEmailVerified() { return emailVerified; }
    public void setEmailVerified(Boolean emailVerified) { this.emailVerified = emailVerified; }

    public String getVerificationToken() { return verificationToken; }
    public void setVerificationToken(String verificationToken) { this.verificationToken = verificationToken; }

    public LocalDateTime getVerificationTokenExpires() { return verificationTokenExpires; }
    public void setVerificationTokenExpires(LocalDateTime verificationTokenExpires) { this.verificationTokenExpires = verificationTokenExpires; }

    public LocalDateTime getEmailVerifiedAt() { return emailVerifiedAt; }
    public void setEmailVerifiedAt(LocalDateTime emailVerifiedAt) { this.emailVerifiedAt = emailVerifiedAt; }

    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }

    public Boolean getBlocked() { return blocked; }
    public void setBlocked(Boolean blocked) { this.blocked = blocked; }

    public LocalDateTime getBlockedUntil() { return blockedUntil; }
    public void setBlockedUntil(LocalDateTime blockedUntil) { this.blockedUntil = blockedUntil; }

    public Integer getFailedLoginAttempts() { return failedLoginAttempts; }
    public void setFailedLoginAttempts(Integer failedLoginAttempts) { this.failedLoginAttempts = failedLoginAttempts; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getLastLogin() { return lastLogin; }
    public void setLastLogin(LocalDateTime lastLogin) { this.lastLogin = lastLogin; }

    public String getLastLoginIp() { return lastLoginIp; }
    public void setLastLoginIp(String lastLoginIp) { this.lastLoginIp = lastLoginIp; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public LocalDateTime getDeletedAt() { return deletedAt; }
    public void setDeletedAt(LocalDateTime deletedAt) { this.deletedAt = deletedAt; }

    public Set<RefreshToken> getRefreshTokens() { return refreshTokens; }
    public void setRefreshTokens(Set<RefreshToken> refreshTokens) { this.refreshTokens = refreshTokens; }

    public Set<LoginHistory> getLoginHistory() { return loginHistory; }
    public void setLoginHistory(Set<LoginHistory> loginHistory) { this.loginHistory = loginHistory; }

    public Boolean getTwoFaEnabled() { return twoFaEnabled; }
    public void setTwoFaEnabled(Boolean twoFaEnabled) { this.twoFaEnabled = twoFaEnabled; }

    public String getTwoFaSecret() { return twoFaSecret; }
    public void setTwoFaSecret(String twoFaSecret) { this.twoFaSecret = twoFaSecret; }

    public Boolean getTwoFaVerified() { return twoFaVerified; }
    public void setTwoFaVerified(Boolean twoFaVerified) { this.twoFaVerified = twoFaVerified; }

    // Helper Methods (boolean methods)
    public boolean isActive() {
        return this.active != null && this.active;
    }

    public boolean isEmailVerified() {
        return this.emailVerified != null && this.emailVerified;
    }

    public boolean isTwoFaEnabled() {
        return this.twoFaEnabled != null && this.twoFaEnabled;
    }

    public boolean isBlocked() {
        return this.blocked != null && this.blocked;
    }

    public boolean isAccountLocked() {
        if (this.blockedUntil == null) {
            return false;
        }
        return LocalDateTime.now().isBefore(this.blockedUntil);
    }
}

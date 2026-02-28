package com.auraspa.dto;

import com.auraspa.model.UserRole;

public class AuthResponse {

    private Long userId;
    private String email;
    private String name;
    private String lastname;
    private String phone;
    private UserRole role;
    private String accessToken;
    private String refreshToken;
    private Long expiresIn;
    private Boolean twoFaRequired;
    private String message;

    // Constructores
    public AuthResponse() {}

    public AuthResponse(Long userId, String email, String name, String lastname, 
                       String phone, UserRole role, String accessToken, String refreshToken, Long expiresIn) {
        this.userId = userId;
        this.email = email;
        this.name = name;
        this.lastname = lastname;
        this.phone = phone;
        this.role = role;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.expiresIn = expiresIn;
        this.twoFaRequired = false;
    }

    // Getters and Setters
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getLastname() { return lastname; }
    public void setLastname(String lastname) { this.lastname = lastname; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public UserRole getRole() { return role; }
    public void setRole(UserRole role) { this.role = role; }

    public String getAccessToken() { return accessToken; }
    public void setAccessToken(String accessToken) { this.accessToken = accessToken; }

    public String getRefreshToken() { return refreshToken; }
    public void setRefreshToken(String refreshToken) { this.refreshToken = refreshToken; }

    public Long getExpiresIn() { return expiresIn; }
    public void setExpiresIn(Long expiresIn) { this.expiresIn = expiresIn; }

    public Boolean getTwoFaRequired() { return twoFaRequired; }
    public void setTwoFaRequired(Boolean twoFaRequired) { this.twoFaRequired = twoFaRequired; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    // Helper Methods
    public boolean isTwoFaRequired() {
        return this.twoFaRequired != null && this.twoFaRequired;
    }
}

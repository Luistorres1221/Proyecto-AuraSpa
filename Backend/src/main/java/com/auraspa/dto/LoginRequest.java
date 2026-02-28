package com.auraspa.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class LoginRequest {

    @NotBlank(message = "El correo es obligatorio")
    @Email(message = "El correo debe ser válido")
    private String email;

    @NotBlank(message = "La contraseña es obligatoria")
    @Size(min = 8, message = "La contraseña debe tener almenos 8 caracteres")
    private String password;

    private String twoFaCode; // Opcional, para 2FA

    private Boolean rememberMe = false;

    // Constructores
    public LoginRequest() {}

    public LoginRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }

    // Getters and Setters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getTwoFaCode() { return twoFaCode; }
    public void setTwoFaCode(String twoFaCode) { this.twoFaCode = twoFaCode; }

    public Boolean getRememberMe() { return rememberMe; }
    public void setRememberMe(Boolean rememberMe) { this.rememberMe = rememberMe; }

    // Helper Methods
    public boolean isRememberMe() {
        return this.rememberMe != null && this.rememberMe;
    }

    public boolean hasTwoFaCode() {
        return this.twoFaCode != null && !this.twoFaCode.isEmpty();
    }
}

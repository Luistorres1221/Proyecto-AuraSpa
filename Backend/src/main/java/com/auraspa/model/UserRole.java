package com.auraspa.model;

public enum UserRole {
    ADMIN("ROLE_ADMIN"),
    CLIENT("ROLE_CLIENT"),
    PROFESSIONAL("ROLE_PROFESSIONAL");

    private final String value;

    UserRole(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}

package com.aicyp.domain.user.dto;

public class UserResponse {

  private String id;
  private String email;
  private String role;

  public UserResponse(String id, String email, String role) {
    this.id = id;
    this.email = email;
    this.role = role;
  }

  public String getId() {
    return id;
  }

  public String getEmail() {
    return email;
  }

  public String getRole() {
    return role;
  }
}
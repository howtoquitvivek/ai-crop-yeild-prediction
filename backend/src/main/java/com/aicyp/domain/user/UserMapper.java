package com.aicyp.domain.user;

import com.aicyp.domain.user.dto.UserResponse;

public class UserMapper {

  public static UserResponse toResponse(User user) {
    return new UserResponse(
        user.getId(),
        user.getEmail(),
        user.getRole().name()
    );
  }
}
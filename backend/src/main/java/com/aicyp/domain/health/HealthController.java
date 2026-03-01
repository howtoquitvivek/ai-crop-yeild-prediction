package com.aicyp.domain.health;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.aicyp.domain.user.dto.CreateUserRequest;

@RestController
public class HealthController {

  @GetMapping("/api/health")
  public String health() {
    return "OK";
  }

  @GetMapping("/api/test")
  public String test() {
    return "Authenticated!";
  }

  @PostMapping("/api/users/test")
  public String createUserTest(@Valid @RequestBody CreateUserRequest request) {
      return "Valid!";
  }
}

package com.aicyp.domain.user;

import com.aicyp.domain.user.dto.UserResponse;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.access.prepost.PreAuthorize;

@RestController
public class UserController {

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/api/me")
    public UserResponse me(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return UserMapper.toResponse(user);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/api/admin-only")
    public String adminOnly() {
        return "Admin access granted";
    }
}
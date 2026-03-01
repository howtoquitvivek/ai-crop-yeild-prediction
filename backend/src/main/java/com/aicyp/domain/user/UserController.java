package com.aicyp.domain.user;

import com.aicyp.common.ApiPaths;
import com.aicyp.common.ApiResponse;
import com.aicyp.domain.user.dto.UserResponse;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(ApiPaths.AUTH)
public class UserController {

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/me")
    public ApiResponse<UserResponse> me(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return ApiResponse.success(UserMapper.toResponse(user));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin-only")
    public ApiResponse<String> adminOnly() {
        return ApiResponse.success("Admin access granted");
    }
}
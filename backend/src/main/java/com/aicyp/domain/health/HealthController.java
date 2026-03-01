package com.aicyp.domain.health;

import com.aicyp.common.ApiPaths;
import com.aicyp.common.ApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(ApiPaths.HEALTH)
public class HealthController {

    @GetMapping
    public ApiResponse<String> health() {
        return ApiResponse.success("OK");
    }

    @GetMapping("/ping")
    public ApiResponse<String> ping() {
        return ApiResponse.success("Service reachable");
    }
}
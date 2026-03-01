package com.aicyp.domain.health;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

class HealthControllerTest {

    @Test
    void shouldReturnHealthyMessage() {
        HealthController controller = new HealthController();
        String result = controller.health();
        assertThat(result).isEqualTo("OK");
    }
}
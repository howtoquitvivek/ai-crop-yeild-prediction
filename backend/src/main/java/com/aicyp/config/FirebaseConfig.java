package com.aicyp.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import jakarta.annotation.PostConstruct;
import java.io.FileInputStream;
import org.springframework.context.annotation.Configuration;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;

// @Configuration
// @ConditionalOnProperty(
//     name = "firebase.enabled",
//     havingValue = "true",
//     matchIfMissing = true
// )
// public class FirebaseConfig {

//   @PostConstruct
//   public void initialize() {
//     try {
//       FileInputStream serviceAccount = new FileInputStream("config/firebase-service-account.json");

//       FirebaseOptions options =
//           FirebaseOptions.builder()
//               .setCredentials(GoogleCredentials.fromStream(serviceAccount))
//               .build();

//       if (FirebaseApp.getApps().isEmpty()) {
//         FirebaseApp.initializeApp(options);
//       }

//     } catch (Exception e) {
//       throw new RuntimeException("Failed to initialize Firebase", e);
//     }
//   }
// }
import java.io.ByteArrayInputStream;
import java.util.Base64;
import org.springframework.beans.factory.annotation.Value;

@Configuration
@ConditionalOnProperty(
    name = "firebase.enabled",
    havingValue = "true",
    matchIfMissing = true
)
public class FirebaseConfig {

  @Value("${FIREBASE_CREDENTIALS_BASE64}")
  private String firebaseCredentialsBase64;

  @PostConstruct
  public void initialize() {
    try {
      byte[] decoded = Base64.getDecoder().decode(firebaseCredentialsBase64);
      ByteArrayInputStream serviceAccount = new ByteArrayInputStream(decoded);

      FirebaseOptions options =
          FirebaseOptions.builder()
              .setCredentials(GoogleCredentials.fromStream(serviceAccount))
              .build();

      if (FirebaseApp.getApps().isEmpty()) {
        FirebaseApp.initializeApp(options);
      }

    } catch (Exception e) {
      throw new RuntimeException("Failed to initialize Firebase", e);
    }
  }
}
package com.aicyp.domain.user;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "users")
public class User {

  @Id private String id;

  private String firebaseUid;
  private String email;
  private Role role;
  private boolean active = true;
}

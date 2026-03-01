# Backend Architecture — Detailed Specification

This document defines the internal mechanics of the Spring Boot backend.

It complements `architecture.md`.

---

## 1. Request Lifecycle

1. HTTP Request
2. CORS validation
3. FirebaseAuthFilter executes
4. JWT verified via Firebase
5. User loaded or auto-created
6. SecurityContext populated
7. Method-level authorization evaluated
8. Controller executed
9. DTO returned
10. GlobalExceptionHandler intercepts errors if any

All requests are stateless.

No sessions are used.

---

## 2. Authentication Model

Authentication uses:

Firebase ID Tokens (JWT)

Verification occurs server-side using:

```
FirebaseAuth.verifyIdToken()
```

If token is invalid:

* 401 Unauthorized

If role is insufficient:

* 403 Forbidden

---

## 3. Authorization Model

Authorization is method-level using:

```
@PreAuthorize
```

Example:

```
@PreAuthorize("hasRole('ADMIN')")
```

Roles are stored in MongoDB inside the User entity.

Role resolution happens after token verification.

---

## 4. User Creation Strategy

On first authenticated request:

If Firebase UID does not exist in database:

* User is auto-created
* Default role = FARMER
* active = true

This ensures zero manual provisioning for farmers.

---

## 5. DTO Strategy

All controllers must:

* Accept Request DTOs
* Return Response DTOs

Entities must never leave domain layer.

Mapping is explicit via mapper classes.

No automatic mapping libraries are used.

---

## 6. Validation Model

Validation uses:

```
spring-boot-starter-validation
```

Rules:

* All request bodies must use `@Valid`
* Constraint annotations must be used
* Validation errors return structured 400 JSON

No silent validation allowed.

---

## 7. Exception Model

GlobalExceptionHandler handles:

* ApiException → 400
* AccessDeniedException → 403
* MethodArgumentNotValidException → 400
* Generic Exception → 500

Error responses must contain:

* timestamp
* error
* message or details

---

## 8. Persistence Model

Database: MongoDB Atlas

Collections are feature-scoped.

Repositories must not be injected across features.

No cross-feature persistence leakage allowed.

---

## 9. Security Hardening Principles

* Stateless API
* No server sessions
* No password handling
* Token-based identity only
* Role-based enforcement
* Explicit endpoint protection

---

## 10. Quality Gates

The build enforces:

* Checkstyle
* Spotless
* SpotBugs
* JaCoCo

Future:

* CI enforcement
* Dependency scanning
* Integration tests
* Production profile hardening

---

## 11. Production Readiness Plan (Next Phase)

Planned additions:

* Separate prod profile secrets
* Structured logging strategy
* Integration testcontainers
* CI pipeline
* Rate limiting
* Audit logging

---

End of backend architecture specification.
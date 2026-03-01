# Canonical Project Structure

This section defines the complete and authoritative directory structure of the aicyp repository.

The structure is mandatory and must be preserved to ensure:

* Separation of concerns
* Service isolation
* Clean architecture
* Feature modularity
* Testability
* CI/CD compatibility
* Production readiness

The structure enforces architectural boundaries and must not be modified casually.

---

## Root Structure

```
aicyp/
├── backend/
├── ml-service/
├── frontend/
├── infra/
├── config/
├── docs/
├── .editorconfig
├── .gitignore
├── README.md
└── LICENSE
```

Each top-level folder represents an isolated system component.

---

# Backend — Spring Boot Service (Feature-Based Packaging)

The backend follows **feature-based packaging**, not layer-based packaging.

This ensures scalability, domain isolation, and long-term maintainability.

In addition to structural rules, the backend enforces:

* Stateless authentication (Firebase)
* Role-based authorization
* DTO separation
* Global exception handling
* Request validation
* Strict visibility discipline
* Automated quality enforcement

Detailed backend architecture is defined in: [backend-architecture.md](backend-architecture.md)

This document is authoritative for internal backend mechanics.

---

## Backend Structure

```
backend/
├── src/main/java/com/aicyp/
│   ├── AicypApplication.java
│   │
│   ├── common/
│   │   ├── ApiException.java
│   │   ├── GlobalExceptionHandler.java
│   │   └── ...
│   │
│   ├── config/
│   │   ├── SecurityConfig.java
│   │   ├── FirebaseConfig.java
│   │   └── ...
│   │
│   ├── security/
│   │   └── FirebaseAuthFilter.java
│   │
│   └── domain/
│       ├── admin/
│       ├── analytics/
│       ├── farm/
│       ├── health/
│       ├── meta/
│       ├── prediction/
│       │   └── client/
│       ├── recommendation/
│       └── user/
│           ├── User.java
│           ├── Role.java
│           ├── UserRepository.java
│           ├── UserController.java
│           ├── UserMapper.java
│           └── dto/
│               ├── CreateUserRequest.java
│               └── UserResponse.java
│
├── src/main/resources/
│   ├── application.yml
│   ├── application-dev.yml
│   ├── application-prod.yml
│   └── logback-spring.xml
│
├── src/test/java/com/aicyp/domain/
│   └── ...
│
├── checkstyle.xml
├── Dockerfile
└── pom.xml
```

---

## Backend Architectural Rules

### 1. Feature-Based Packaging (Mandatory)

Each feature inside `domain/` must contain:

* Controller
* Service (package-private)
* Repository (package-private)
* Entity (package-private)
* DTOs
* Mapper (package-private)
* Optional internal helpers

Everything related to a feature must live inside that feature folder.

No cross-feature scattering is allowed.

---

### 2. Infrastructure Packages

Remain outside `domain/`:

* `config/` — Application configuration
* `security/` — Authentication and authorization filters
* `common/` — Exceptions and cross-cutting logic

These contain shared infrastructure components.

---

### 3. Security Model (Mandatory)

The backend enforces:

* Firebase JWT verification
* Stateless authentication
* Role-based authorization
* Method-level access control (`@PreAuthorize`)

All protected endpoints require valid Bearer tokens.

Roles currently supported:

* FARMER
* ADMIN

Unauthorized access must return HTTP 403.

---

### 4. DTO Separation Rule (Strict)

Entities must never be returned directly.

Controllers must return DTOs only.

Mapping must be explicit via mappers.

This prevents:

* Internal field leakage
* Accidental schema exposure
* Tight API coupling to persistence

---

### 5. Validation Layer (Mandatory)

All request bodies must use:

```
jakarta.validation
```

Validation failures must return structured 400 responses.

Controllers must use:

```
@Valid
```

No manual null-check validation is allowed.

---

### 6. Exception Handling Policy

All exceptions must be handled globally via:

```
@RestControllerAdvice
```

Responses must be structured JSON.

No stack traces must leak to clients.

---

### 7. Visibility Discipline

Inside each feature:

* Controllers → `public`
* DTOs → `public`
* Services → package-private
* Repositories → package-private
* Mappers → package-private
* Entities → package-private (unless required by framework)

No unnecessary `public` classes allowed.

---

### 8. Quality Enforcement

The backend enforces:

* Checkstyle (code style)
* Spotless (formatting)
* SpotBugs (static analysis)
* JaCoCo (coverage reporting)

Build failures must block violations.

---

### 9. Test Symmetry Rule

Test structure must mirror production structure:

```
src/test/java/com/aicyp/domain/<feature>/
```

Each feature owns its test namespace.

---

### 10. No Layer-Based Reintroduction

The following are forbidden at top level:

* controller/
* service/
* repository/
* model/
* dto/

All functionality must live inside feature folders.

---

# ML Service — Python Microservice

```
ml-service/
├── app/
│   ├── main.py
│   ├── config.py
│   ├── api/
│   ├── models/
│   ├── preprocessing/
│   ├── optimization/
│   └── registry/
├── tests/
├── requirements.txt
├── pyproject.toml
├── .flake8
└── Dockerfile
```

Design rules:

* API layer must not contain ML logic
* Models must be modular and swappable
* Preprocessing must be isolated
* Optimization logic must be independent
* Model registry manages version control

ML service must remain independently deployable.

---

# Frontend

```
frontend/
├── web/
├── admin/
└── mobile/
```

Rules:

* Web is Phase 1 farmer interface
* Admin is system management interface
* Mobile is future Expo application
* Each frontend module must remain isolated

---

# Infrastructure

```
infra/
├── docker/
├── nginx/
├── k8s/
└── scripts/
```

Rules:

* All deployment logic resides in `infra/`
* Docker compose files must support local development
* Production configuration must not mix with development config
* Kubernetes manifests are future-ready

---

# Architectural Governance Rules

1. No structural changes without documentation update.
2. No cross-feature direct dependency unless explicitly justified.
3. All features must follow visibility discipline.
4. No business logic inside controllers.
5. Entities must never be exposed directly in API responses.
6. OpenAPI specification remains the authoritative API contract.
7. Refactoring structure after stabilization should be minimized.

---

End of architectural structure definition.

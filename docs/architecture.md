# AICYP — Canonical Architecture Specification

This document defines the authoritative structure and architectural rules of the AICYP repository.

The structure is mandatory and must not be modified casually.

The goal is to enforce:

* Service isolation
* Feature-based modularity
* Clean architecture boundaries
* Stateless security
* Contract-first API governance
* Long-term maintainability

---

# 1. Repository Structure

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

No cross-service coupling is allowed.

---

# 2. Backend — Spring Boot Service

The backend follows **feature-based packaging**.

Layer-based top-level folders are forbidden.

## 2.1 Backend Structure

```
backend/
├── src/main/java/com/aicyp/
│   ├── AicypApplication.java
│   │
│   ├── common/
│   ├── config/
│   ├── security/
│   │
│   └── domain/
│       ├── health/
│       ├── user/
│       ├── farm/
│       ├── prediction/
│       │   └── client/
│       ├── recommendation/
│       ├── analytics/
│       ├── admin/
│       └── meta/
│
├── src/main/resources/
│   ├── application.yml
│   └── application-local.yml
│
├── src/test/java/com/aicyp/
│
├── Dockerfile
└── pom.xml
```

---

## 2.2 Feature-Based Packaging Rule (Mandatory)

Each feature inside `domain/` must contain:

* Controller (public)
* Service (package-private)
* Repository (package-private)
* Entity (package-private)
* DTOs (public)
* Mapper (package-private)

Everything related to a feature must live inside that feature folder.

No cross-feature scattering.

The following are forbidden at top level:

```
controller/
service/
repository/
model/
dto/
```

---

## 2.3 Infrastructure Packages

Outside `domain/`:

* `config/` → Spring configuration (Security, Firebase, etc.)
* `security/` → Authentication filter logic
* `common/` → ApiResponse, exceptions, shared utilities

---

# 3. Backend Runtime Model

## 3.1 Stateless Security

* Authentication via Firebase ID Tokens
* No sessions
* No server-side login state
* JWT verified on every request

All API routes are versioned under:

```
/api/v1
```

Security configuration enforces:

* `/api/v1/health/**` → public
* `/api/v1/**` → authenticated
* Everything else → denied

Method-level authorization is enforced via:

```
@PreAuthorize
```

Supported roles:

* FARMER
* ADMIN

Unauthorized access → 403

---

## 3.2 Firebase Credential Handling

Firebase service account credentials must be supplied via environment variable:

```
FIREBASE_CREDENTIALS_BASE64
```

The backend decodes this at startup.

Service account JSON files must never be committed.

Firebase can be disabled using:

```
firebase.enabled=false
```

Primarily for test environments.

---

## 3.3 Request Lifecycle

1. HTTP Request
2. CORS validation
3. FirebaseAuthFilter executes
4. JWT verified
5. User loaded or auto-created
6. SecurityContext populated
7. Method-level authorization evaluated
8. Controller executed
9. DTO returned
10. GlobalExceptionHandler handles errors

All requests are stateless.

---

# 4. API Contract Governance

The authoritative API contract is:

```
docs/api/aicyp-openapi.yaml
```

Rules:

* All endpoints must match the OpenAPI specification.
* Controllers must return `ApiResponse<T>`.
* Entities must never be exposed directly.
* Contract changes must be reflected in YAML before implementation.

API versioning strategy:

```
/api/v1
/api/v2 (future)
```

Breaking changes require a new version.

---

# 5. DTO and Validation Rules

* Controllers must return DTOs only.
* Entities must never leave the domain layer.
* Mapping must be explicit.
* No automatic mapping libraries.

Validation uses:

```
spring-boot-starter-validation
```

All request bodies must use:

```
@Valid
```

Validation errors return structured 400 responses via `GlobalExceptionHandler`.

---

# 6. Exception Handling Policy

All exceptions are handled centrally via:

```
@RestControllerAdvice
```

Responses use `ApiResponse<T>`.

Stack traces must never leak to clients.

Handled cases:

* ApiException → 400
* Validation errors → 400
* AccessDeniedException → 403
* Generic exception → 500

---

# 7. Persistence Model

Database: MongoDB Atlas.

Collections are feature-scoped.

Repositories must not be injected across features.

No cross-feature persistence leakage.

---

# 8. CI and Quality Enforcement

The backend CI pipeline enforces:

* Successful Maven build
* Test compilation
* Test execution (if present)
* Static compilation integrity

Pull requests to `develop` and `main` must pass CI before merge.

Future enhancements may include:

* Dependency scanning
* Integration testing
* Coverage enforcement

---

# 9. ML Service — Python Microservice

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
└── Dockerfile
```

Rules:

* API layer must not contain ML logic
* Models must be modular
* Preprocessing must be isolated
* ML service must be independently deployable

No direct client access to ML service is allowed.

---

# 10. Frontend

```
frontend/
├── web/
├── admin/
└── mobile/
```

Currently active:

* `frontend/web`

All frontend modules must remain isolated.

Frontend must consume backend via `/api/v1`.

---

# 11. Infrastructure

```
infra/
├── docker/
├── nginx/
├── k8s/
└── scripts/
```

Rules:

* All deployment logic resides in `infra/`
* Production config must not mix with development config
* Secrets must never be committed

---

# 12. Architectural Governance Rules

1. No structural changes without documentation update.
2. No cross-feature direct dependency.
3. Controllers must remain thin.
4. No business logic inside controllers.
5. Entities must never be exposed in API responses.
6. OpenAPI YAML is the authoritative API contract.
7. Refactoring structure after stabilization must be minimized.

---

End of Architecture Specification.
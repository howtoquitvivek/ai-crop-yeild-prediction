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

This ensures scalability and clear domain ownership.

```
backend/
├── src/main/java/com/aicyp/
│   ├── AicypApplication.java
│   │
│   ├── common/
│   │   ├── exception/
│   │   └── util/
│   │
│   ├── config/
│   ├── security/
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
│
├── src/main/resources/
│   ├── application.yml
│   ├── application-dev.yml
│   ├── application-prod.yml
│   └── logback-spring.xml
│
├── src/test/java/com/aicyp/domain/
│   ├── farm/
│   ├── prediction/
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
* Service
* Repository (if required)
* Entity (if required)
* DTOs
* Optional internal helpers

Everything related to a feature must live inside that feature folder.

No cross-feature scattering is allowed.

---

### 2. Global Packages

The following remain outside `domain/`:

* `config/` — Application configuration
* `security/` — Authentication and authorization logic
* `common/` — Cross-cutting concerns (exceptions, utilities)

These are shared infrastructure components.

---

### 3. Visibility Rules (Very Important)

Feature boundaries must be enforced using Java visibility.

Inside each feature:

* Controllers → `public`
* DTOs used externally → `public`
* Services → package-private (no modifier)
* Repositories → package-private
* Mappers and helpers → package-private

Example:

```java
@Service
class FarmService {
}
```

Do not use `public` unless required.

This prevents accidental cross-feature coupling.

---

### 4. Cross-Feature Communication

Features must not directly access other feature internals.

If interaction is required:

* Expose minimal public interfaces
* Avoid injecting repositories across features
* Maintain clear domain boundaries

The compiler should enforce modularity.

---

### 5. ML Client Placement

External ML communication must reside in:

```
domain/prediction/client/
```

This isolates infrastructure-facing logic from domain logic.

---

### 6. Test Symmetry Rule

Test structure must mirror production structure:

```
src/test/java/com/aicyp/domain/farm/
src/test/java/com/aicyp/domain/prediction/
```

Every feature must have its own test namespace.

---

### 7. No Layer-Based Reintroduction

The following top-level layer folders are forbidden:

* controller/
* service/
* repository/
* model/
* dto/

All functionality must live under feature folders.

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

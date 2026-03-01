# Backend Development Guide

This document defines how backend contributors must implement features inside the Spring Boot service.

The rules below are mandatory and enforce:

* Architectural consistency
* Feature isolation
* Security correctness
* DTO safety
* Testability
* Long-term scalability

All contributors must follow this guide when writing backend code.

---

# Core Principles

1. Feature-based packaging is mandatory.
2. Entities must never be exposed in API responses.
3. Business logic must not exist in controllers.
4. Role-based access must be declarative.
5. Ownership must be enforced at the service layer.
6. Tests must mirror production structure.

---

# Feature Implementation Structure

Every new feature must live inside:

```
src/main/java/com/aicyp/domain/<feature>/
```

Example for a `farm` feature:

```
domain/farm/
├── FarmController.java
├── FarmService.java
├── FarmRepository.java
├── Farm.java
├── FarmMapper.java
└── dto/
    ├── CreateFarmRequest.java
    └── FarmResponse.java
```

No files may be placed outside the feature folder unless they are shared infrastructure.

---

# Visibility Rules

Inside a feature:

* Controller → public
* External DTOs → public
* Service → package-private
* Repository → package-private
* Entity → package-private
* Mapper → package-private

Example:

```java
@Service
class FarmService {
}
```

Do not use `public` unless required.

---

# Controller Rules

Controllers must:

* Be thin
* Contain no business logic
* Use DTOs only
* Use `@Valid` for request validation
* Use `@PreAuthorize` for access control

Example:

```java
@RestController
@RequestMapping("/api/farms")
class FarmController {

    private final FarmService service;

    FarmController(FarmService service) {
        this.service = service;
    }

    @PostMapping
    @PreAuthorize("hasRole('FARMER')")
    public FarmResponse create(@Valid @RequestBody CreateFarmRequest request,
                               Authentication authentication) {

        User user = (User) authentication.getPrincipal();
        return service.create(request, user);
    }
}
```

Controllers must never:

* Access repositories directly
* Contain role logic
* Contain ownership checks

---

# Service Rules

Services contain business logic.

Responsibilities:

* Enforce ownership
* Apply domain rules
* Call repositories
* Map entity to DTO

Example:

```java
@Service
class FarmService {

    private final FarmRepository repository;

    FarmService(FarmRepository repository) {
        this.repository = repository;
    }

    FarmResponse create(CreateFarmRequest request, User user) {

        Farm farm = new Farm();
        farm.setName(request.name());
        farm.setOwnerId(user.getId());

        repository.save(farm);

        return FarmMapper.toResponse(farm);
    }
}
```

Ownership must be enforced here — not in controllers.

---

# Repository Rules

Repositories:

* Must extend Spring Data MongoRepository
* Must remain package-private
* Must not be injected into other features

Example:

```java
interface FarmRepository extends MongoRepository<Farm, String> {
    List<Farm> findByOwnerId(String ownerId);
}
```

---

# Entity Rules

Entities represent database state only.

Rules:

* No business logic
* No validation annotations for request use
* Never returned in API responses

Example:

```java
@Document(collection = "farms")
class Farm {

    @Id
    private String id;

    private String name;

    private String ownerId;
}
```

---

# DTO Rules

Request DTOs must use validation annotations.

Example:

```java
public record CreateFarmRequest(
    @NotBlank String name
) {}
```

Response DTOs must never expose internal fields.

Example:

```java
public record FarmResponse(
    String id,
    String name
) {}
```

---

# Role-Based Access Control

Use declarative annotations only:

```
@PreAuthorize("hasRole('ADMIN')")
@PreAuthorize("hasRole('FARMER')")
@PreAuthorize("hasAnyRole('ADMIN','FARMER')")
```

Never manually check roles inside controller or service.

---

# Ownership Enforcement

Role does not imply ownership.

Services must enforce ownership:

```java
if (!farm.getOwnerId().equals(user.getId())) {
    throw new AccessDeniedException("Not allowed");
}
```

Ownership logic must not be skipped.

---

# Exception Handling

Use centralized exception handling.

Do not return raw exceptions.

Use:

* Custom exceptions (e.g., ApiException)
* AccessDeniedException
* Validation errors

All errors must be consistent JSON responses.

---

# Writing Tests

Test structure must mirror production structure.

Example:

```
src/test/java/com/aicyp/domain/farm/
```

---

## Unit Tests (Service Layer)

Test:

* Business logic
* Ownership rules
* Edge cases
* Error conditions

Use:

* JUnit
* Mockito (if needed)

Example test targets:

* Creating entity
* Rejecting invalid ownership
* Role-specific behavior

Services must be tested independently of controllers.

---

## Controller Tests

Use:

* @WebMvcTest for controller layer
* Mock service dependencies

Test:

* Request validation
* Role restrictions
* Response structure

---

## Integration Tests (Optional for Now)

Later phase:

* @SpringBootTest
* Test with embedded Mongo or test container
* Test full security + persistence flow

---

# Security Rules

1. All endpoints are secured by default.
2. No endpoint may be left public unless explicitly permitted.
3. No bypassing Firebase authentication.
4. No temporary disabling of filters.

---

# Mongo Rules

* One aggregate per collection
* Avoid cross-feature data writes
* Keep schema simple
* No business joins across features

---

# Prohibited Practices

The following are forbidden:

* Returning entities directly
* Creating global controller/service folders
* Cross-feature repository injection
* Business logic in controllers
* Disabling security for testing
* Hardcoding user IDs or roles
* Exposing internal fields in DTOs

---

# Pull Request Expectations

Every PR must:

* Follow feature-based structure
* Respect visibility rules
* Include appropriate tests
* Pass linting and build
* Contain a clear description of scope

---

End of Backend Development Guide.
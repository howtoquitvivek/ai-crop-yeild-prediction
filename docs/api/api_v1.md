# AICYP API DOCUMENTATION

Version 1
Base URL: `/api/v1`

---

## Overview

This document defines the complete REST API specification for **aicyp** (AI-based Crop Yield Prediction system). The API is versioned, stateless, Firebase JWT secured, mobile-ready, and production-scalable. All endpoints use a standardized response wrapper and support future extensibility.

---

## Standard Response Format

All endpoints return the following structure:

```json
{
  "success": true,
  "data": {},
  "message": null,
  "timestamp": "ISO-8601 string"
}
```

---

## Authentication

Authentication is handled using Firebase Authentication.

Clients must send a valid Firebase ID token in every protected request.

**Header:**

```
Authorization: Bearer <firebase-id-token>
```

The backend verifies the token and attaches user identity and role to the security context.

### Roles

* FARMER
* ADMIN

---

## Authentication Endpoints

### • GET /auth/me

**Description:** Returns the currently authenticated user profile.
**Authentication:** Required

**Response:**

```json
{
  "success": true,
  "data": {
    "uid": "firebaseUid",
    "role": "FARMER or ADMIN",
    "createdAt": "ISO-8601 timestamp"
  },
  "message": null,
  "timestamp": "ISO-8601 timestamp"
}
```

---

## Farm Management Endpoints

### • POST /farms

**Description:** Create a new farm for the authenticated user.
**Authentication:** FARMER

**Request Body:**

```json
{
  "name": "string",
  "district": "string",
  "crop": "string",
  "landSize": number,
  "irrigationType": "string",
  "soilType": "string"
}
```

---

### • GET /farms

**Description:** Retrieve paginated list of farms belonging to the authenticated user.
**Authentication:** FARMER

**Query Parameters:**

* page (default 0)
* size (default 10)
* sort (field,direction)

**Example:**

```
/farms?page=0&size=10&sort=createdAt,desc
```

**Paginated Response:**

```json
{
  "success": true,
  "data": {
    "content": [],
    "page": 0,
    "size": 10,
    "totalElements": 0,
    "totalPages": 0,
    "last": false
  },
  "message": null,
  "timestamp": "ISO-8601"
}
```

---

### • GET /farms/{farmId}

**Description:** Retrieve specific farm by ID.
**Authentication:** FARMER

---

### • PUT /farms/{farmId}

**Description:** Update farm details.
**Authentication:** FARMER

---

### • DELETE /farms/{farmId}

**Description:** Soft delete farm (sets `isActive` to false).
**Authentication:** FARMER

---

## Prediction Endpoints

### • POST /predictions/generate

**Description:** Generate yield prediction for a farm.
**Authentication:** FARMER

**Request Body:**

```json
{
  "farmId": "string"
}
```

**Backend Flow:**

* Fetch farm
* Enrich soil baseline
* Fetch weather data
* Call ML microservice
* Store prediction
* Return response

**Response:**

```json
{
  "success": true,
  "data": {
    "predictionId": "string",
    "predictedYield": number,
    "confidence": number,
    "modelVersion": "string"
  },
  "message": null,
  "timestamp": "ISO-8601"
}
```

---

### • GET /predictions/{predictionId}

**Description:** Retrieve specific prediction by ID.
**Authentication:** FARMER

---

### • GET /predictions

**Description:** Retrieve paginated predictions for authenticated user.
**Authentication:** FARMER

**Query Parameters:**

* farmId (optional)
* riskLevel (optional)
* page
* size
* sort

---

### • GET /farms/{farmId}/predictions

**Description:** Retrieve paginated prediction history for a specific farm.
**Authentication:** FARMER

---

## Prediction Feedback Endpoint

### • POST /predictions/{predictionId}/feedback

**Description:** Submit actual yield and feedback for ML improvement and retraining.
**Authentication:** FARMER

**Request Body:**

```json
{
  "actualYield": number,
  "notes": "string"
}
```

---

## Recommendation Endpoints

### • POST /recommendations/generate

**Description:** Generate irrigation, fertilizer, and pest management recommendations.
**Authentication:** FARMER

**Request Body:**

```json
{
  "farmId": "string"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "irrigationPlan": [],
    "fertilizerPlan": [],
    "pestRisk": "LOW | MEDIUM | HIGH"
  },
  "message": null,
  "timestamp": "ISO-8601"
}
```

---

## Metadata Endpoints

### • GET /meta/crops

Retrieve list of supported crops.

### • GET /meta/districts

Retrieve list of supported districts.

### • GET /meta/soil-types

Retrieve soil type options.

### • GET /meta/irrigation-types

Retrieve irrigation type options.

Authentication required for all metadata endpoints.

---

## Weather Endpoints

### • GET /weather/{district}

Retrieve cached weather data for a district.
Authentication required.

---

## Analytics Endpoints

### • GET /analytics/overview

Retrieve dashboard-level statistics.
Authentication: FARMER

### • GET /analytics/yield-trend

Retrieve yield trend data for charts.
Authentication: FARMER

Query Parameters:

* farmId (optional)
* year (optional)

### • GET /analytics/risk-distribution

Retrieve distribution of risk levels across predictions.
Authentication: FARMER

---

## Health and Monitoring Endpoints

### • GET /health

Returns overall system health including backend, database, and ML service status.

### • GET /health/ml

Checks ML service connectivity.

### • GET /health/database

Checks MongoDB connectivity.

Authentication not required for health endpoints.

---

## Admin Endpoints

All endpoints under `/admin` require ADMIN role.

### • GET /admin/models

Retrieve available ML model versions.

### • PUT /admin/models/activate/{version}

Activate specific ML model version.

### • GET /admin/users

Retrieve paginated list of users.

### • PUT /admin/users/{uid}/role

Update user role (FARMER or ADMIN).

### • GET /admin/system/stats

Retrieve system-wide statistics including total users, farms, and predictions.

---

## Pagination Strategy

All list endpoints must support:

* page
* size
* sort

Format example:

```
?page=0&size=10&sort=createdAt,desc
```

Page-based pagination is mandatory.
Raw arrays are not allowed in responses.

---

## DTO Policy

* No Mongo entity is exposed directly.
* All responses must use DTOs.
* Internal schema changes must not break API contracts.

---

## Error Handling

Errors use appropriate HTTP status codes:

* 400 Bad Request
* 401 Unauthorized
* 403 Forbidden
* 404 Not Found
* 500 Internal Server Error

Error responses still follow the standard response wrapper.

---

Below is the exact `.md` section you can paste into `api_v1.md`.

---

## API Versioning and Evolution Policy

The aicyp API is designed to evolve safely without breaking existing clients. All changes must follow a structured versioning and contract governance process.

### Versioning Strategy

All endpoints are versioned using URL versioning:

`/api/v1`

If a breaking change is required, a new version will be introduced:

`/api/v2`

Previous versions will remain supported for a defined transition period before deprecation.

---

### Non-Breaking Changes

The following changes are allowed within the same API version:

* Adding new endpoints
* Adding optional request fields
* Adding optional response fields
* Adding optional query parameters
* Adding new enum values without altering existing ones

These changes do not require a version bump.

---

### Breaking Changes

The following changes require a new major version:

* Removing fields from responses
* Renaming fields
* Changing response structure
* Changing required request fields
* Modifying authentication or authorization behavior
* Changing endpoint paths

Breaking changes must never be introduced into an existing API version.

---

### Deprecation Policy

When introducing a new API version:

* The previous version must remain functional for a defined period.
* Deprecation must be clearly documented.
* Migration guidance must be provided when necessary.

---

### Contract Governance

The OpenAPI specification located at:

`docs/api/aicyp-openapi.yaml`

is the authoritative API contract.

Rules:

* All API changes must be reflected in the OpenAPI file before implementation.
* Pull requests modifying endpoints must include contract updates.
* Backend DTOs must strictly match schema definitions.
* Contract drift between implementation and specification is not allowed.

This ensures predictable evolution, safe scaling, and long-term maintainability.

---

## Non-Goals

The following are not included:

* GraphQL
* WebSockets
* Batch prediction APIs
* Public ML endpoints
* Direct ML access from clients

---

This document defines the complete API surface for aicyp version 1.

---

## Using OpenAPI YAML as the API Contract

The file `docs/api/aicyp-openapi.yaml` is the formal API contract for aicyp.

The contract-first approach means:

1. Define the API structure in OpenAPI YAML first.
2. Review and approve the contract.
3. Implement backend controllers to match the contract.
4. Validate implementation against the specification.

The YAML file is the single source of truth for:

* Endpoints
* Request bodies
* Query parameters
* Response schemas
* Authentication requirements
* Pagination structure

---

## Contract-First Development Workflow

### Step 1: Define or Update the Endpoint in YAML

When adding a new API:

1. Open `aicyp-openapi.yaml`.
2. Add the new path under `paths:`.
3. Define:

   * HTTP method
   * Parameters
   * Request body schema
   * Response schema
   * Security requirement

Example structure:

```yaml
paths:
  /farms:
    post:
      summary: Create farm
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateFarmRequest'
      responses:
        '200':
          description: Farm created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/FarmResponse'
```

---

### Step 2: Define Schemas Under components

All request and response bodies must reference schemas under:

```yaml
components:
  schemas:
```

Example:

```yaml
CreateFarmRequest:
  type: object
  required:
    - name
    - district
    - crop
  properties:
    name:
      type: string
    district:
      type: string
    crop:
      type: string
```

This ensures:

* Reusability
* Consistency
* Validation
* Strong documentation

---

### Step 3: Review in Swagger Editor

To validate the contract:

1. Open [https://editor.swagger.io](https://editor.swagger.io)
2. Paste the YAML content
3. Validate syntax and structure
4. Confirm schemas and paths render correctly

Only after validation should backend implementation begin.

---

## Implementing Backend to Match the Contract

Backend controllers must strictly follow:

* Path names
* HTTP methods
* Parameter names
* Request structures
* Response wrapper format

Example mapping in Spring Boot:

```java
@PostMapping("/farms")
public ApiResponse<FarmResponse> createFarm(@RequestBody CreateFarmRequest request) {
    // implementation
}
```

The Java DTO classes must match the YAML schema definitions.

If the contract changes, both:

* YAML file
* DTO classes

must be updated together.

---
## When changing an API:

Step 1 — Update YAML
Step 2 — Review change
Step 3 — Decide: breaking or non-breaking
Step 4 — Implement

The YAML becomes the governance layer.

## Using OpenAPI with Spring Boot

When backend is ready, integrate Springdoc OpenAPI.

Add dependency:

```
org.springdoc:springdoc-openapi-starter-webmvc-ui
```

Then access:

```
http://localhost:8080/swagger-ui.html
```

Spring will auto-generate API documentation from controller annotations.

The generated documentation must match the YAML contract.

---

## Contract Validation Strategy

To prevent drift between contract and implementation:

* YAML must be updated before backend code
* Pull requests must include YAML changes
* Reviewers must validate endpoint consistency
* DTO fields must mirror schema definitions

Future enhancement:

* Add contract testing in CI
* Compare implementation against OpenAPI specification

---

## Contract-First APIs

* Prevents ambiguous APIs
* Enables frontend development before backend is complete
* Allows parallel team collaboration
* Reduces breaking changes
* Provides clear API governance

In aicyp, the OpenAPI YAML is the authoritative API contract.

All backend development must conform to it.
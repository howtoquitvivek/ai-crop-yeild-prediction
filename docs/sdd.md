# AICYP System Design Document (SDD)

Version: 1.0
Status: Initial System Architecture
Audience: Engineers, System Architects

---

# 1. System Overview

AICYP is a distributed system designed to provide crop yield predictions and agricultural recommendations using machine learning models.

The system is composed of three primary services:

1. Backend API (Spring Boot)
2. Machine Learning Service (FastAPI)
3. Frontend Client (React)

Supporting infrastructure includes MongoDB for persistence and Firebase Authentication for identity management.

The architecture emphasizes:

* modularity
* scalability
* clear service boundaries
* contract-first APIs

---

# 2. High-Level Architecture

The system follows a **service-oriented architecture**.

```
Frontend (React)
       │
       │ HTTPS API
       ▼
Backend API (Spring Boot)
       │
       │ HTTP request
       ▼
ML Service (FastAPI)
       │
       ▼
Prediction Model
```

Supporting systems:

```
Firebase Authentication → Identity provider
MongoDB Atlas → Data persistence
```

Responsibilities are divided across services to ensure scalability and maintainability.

---

# 3. Component Overview

## 3.1 Frontend (Web Client)

Technology:

* React
* Vite

Responsibilities:

* User authentication using Firebase
* Farm management UI
* Prediction request interface
* Visualization of predictions and analytics

The frontend communicates exclusively with the backend API.

It does not interact directly with the ML service.

---

## 3.2 Backend API

Technology:

* Spring Boot
* MongoDB
* Firebase Admin SDK

Responsibilities:

* API gateway for the system
* Authentication and authorization
* Business logic orchestration
* Data persistence
* ML service coordination

The backend implements a **feature-based architecture**.

---

### Backend Feature Modules

Each domain feature exists inside:

```
backend/src/main/java/com/aicyp/domain/
```

Examples:

```
farm/
prediction/
recommendation/
analytics/
user/
meta/
```

Each feature contains:

```
Controller
Service
Repository
Entity
DTO
Mapper
```

This ensures strong modular boundaries.

---

## 3.3 ML Service

Technology:

* Python
* FastAPI

Responsibilities:

* Load machine learning models
* Process prediction requests
* Perform inference
* Manage model versions

The ML service is independent and horizontally scalable.

---

# 4. Authentication Flow

Authentication is handled using Firebase.

### Flow

1. User logs in through Firebase on frontend.
2. Firebase returns an ID token.
3. Frontend sends token in request header.

```
Authorization: Bearer <firebase-id-token>
```

4. Backend verifies the token using Firebase Admin SDK.
5. Backend extracts the Firebase UID.
6. Backend loads or creates the user in MongoDB.
7. User is attached to Spring Security context.

This results in stateless authentication.

No sessions are stored on the server.

---

# 5. Authorization Model

Authorization is implemented using Spring Security.

Access control is enforced using:

```
@PreAuthorize
```

Example:

```
@PreAuthorize("hasRole('ADMIN')")
```

Supported roles:

```
FARMER
ADMIN
```

Role information is stored in the User collection in MongoDB.

---

# 6. Database Design

Database: MongoDB Atlas

Collections are feature-scoped.

---

## 6.1 Users Collection

Stores authenticated users.

Fields:

```
uid
role
createdAt
active
```

Users are automatically created on first login.

---

## 6.2 Farms Collection

Stores farm information.

Fields:

```
id
ownerId
name
district
crop
soilType
irrigationType
landSize
active
createdAt
```

Each farm belongs to a user.

---

## 6.3 Predictions Collection

Stores prediction history.

Fields:

```
id
farmId
userId
predictedYield
confidence
modelVersion
createdAt
```

Prediction records are immutable.

---

## 6.4 Feedback Collection

Stores actual yield results for model improvement.

Fields:

```
predictionId
actualYield
notes
submittedAt
```

Used for ML model evaluation.

---

# 7. Prediction Pipeline

The prediction process involves multiple system components.

### Prediction Request Flow

1. Farmer submits prediction request
2. Backend validates farm ownership
3. Backend collects farm data
4. Backend enriches data with metadata
5. Backend fetches weather data
6. Backend sends request to ML service
7. ML service performs inference
8. Prediction returned to backend
9. Backend stores prediction
10. Backend returns response to client

---

# 8. Backend ↔ ML Communication

The backend communicates with the ML service via HTTP.

Example endpoint:

```
POST /api/v1/predictions/generate
```

Backend request to ML service:

```
POST http://ml-service:8000/api/v1/predict
```

Request payload includes:

* farm features
* weather features
* crop parameters

Response includes:

```
predictedYield
confidence
modelVersion
```

---

# 9. API Design Principles

The API follows strict design rules.

Base path:

```
/api/v1
```

All responses follow a standard wrapper:

```
{
  success: true,
  data: {},
  message: null,
  timestamp: ISO8601
}
```

This wrapper ensures consistent client behavior.

---

# 10. API Contract Governance

The OpenAPI specification is the authoritative contract.

File location:

```
docs/api/aicyp-openapi.yaml
```

All API changes must follow:

1. Update OpenAPI contract
2. Review schema
3. Implement backend controller
4. Validate DTO compatibility

This ensures contract-first development.

---

# 11. Error Handling

Errors are handled globally using:

```
@RestControllerAdvice
```

Common error types:

```
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
500 Internal Server Error
```

Error responses include:

```
timestamp
error
message
details
```

No stack traces are returned to clients.

---

# 12. Service Health Monitoring

Health endpoints are provided to monitor system components.

Backend endpoints:

```
/api/v1/health
/api/v1/health/database
/api/v1/health/ml
```

ML service endpoint:

```
/api/v1/health
```

These endpoints enable monitoring and orchestration systems to detect failures.

---

# 13. Deployment Architecture

The system supports containerized deployment.

Components are packaged as Docker containers.

```
Frontend
Backend
ML Service
MongoDB
```

Future production deployments may use Kubernetes.

Infrastructure configurations are stored in:

```
infra/
```

---

# 14. Development Environment

Local development uses a unified startup script.

```
dev.sh
```

This script launches:

* backend
* ML service
* frontend

Environment variables must be configured before execution.

---

# 15. Scalability Considerations

The architecture supports scaling through service separation.

ML service can scale horizontally to support higher prediction load.

Backend remains stateless and can scale behind load balancers.

MongoDB Atlas provides managed scaling.

---

# 16. Security Considerations

Security principles include:

* stateless authentication
* JWT verification
* strict role enforcement
* environment-based secret management
* no credentials stored in repository

Firebase service account credentials are provided via environment variables.

---

# 17. Observability (Future)

Planned improvements include:

* structured logging
* distributed tracing
* performance monitoring
* rate limiting
* audit logging

These features will improve system reliability and debugging.

---

# 18. Future System Enhancements

Planned architectural improvements include:

* model retraining pipelines
* dataset versioning
* experiment tracking
* satellite data integration
* automated recommendation models

---

# 19. Summary

The AICYP system is designed as a modular, scalable platform for AI-assisted agriculture.

Key characteristics include:

* feature-based backend architecture
* contract-first API governance
* stateless authentication
* modular ML service
* scalable microservice design

This architecture allows the system to evolve as prediction models and agricultural datasets grow.

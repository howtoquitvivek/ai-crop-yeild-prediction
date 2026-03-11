# AICYP User Flow Document

Version: 1.0
Audience: Product, Design, Frontend, Backend Engineers

---

# 1. Overview

This document describes the primary user flows within the AICYP system.

User flows represent the step-by-step journey a user takes while interacting with the platform.

The system currently supports two user roles:

FARMER
ADMIN

The majority of flows are designed around the **farmer experience**.

---

# 2. Primary Farmer Flow

The main farmer journey consists of:

1. Authentication
2. Farm creation
3. Prediction generation
4. Viewing prediction results
5. Submitting yield feedback
6. Viewing analytics

---

# 3. Farmer Login Flow

### Goal

Allow users to authenticate securely using Firebase.

### Flow

1. User opens web application.
2. User clicks **Login**.
3. Firebase authentication UI appears.
4. User logs in using supported provider.
5. Firebase returns ID token.
6. Frontend stores token in memory.
7. Frontend sends token with API requests.

Header format:

```
Authorization: Bearer <firebase-id-token>
```

Backend flow:

1. FirebaseAuthFilter verifies token.
2. Firebase UID extracted.
3. Backend loads or creates user record.
4. User role attached to security context.
5. Request proceeds.

User is now authenticated.

---

# 4. First-Time User Flow

### Goal

Automatically register new users.

### Flow

1. User logs in for the first time.
2. Backend checks if Firebase UID exists in database.
3. If user does not exist:

System automatically creates user record.

Fields:

```
uid
role = FARMER
active = true
createdAt
```

4. User continues normally.

No manual user registration is required.

---

# 5. Farm Creation Flow

### Goal

Allow farmers to register farms.

### Flow

1. User navigates to **Farm Management**.
2. User clicks **Add Farm**.
3. Form appears requesting:

```
Farm name
District
Crop type
Soil type
Irrigation type
Land size
```

4. User submits form.

Frontend request:

```
POST /api/v1/farms
```

Backend process:

1. Validate request.
2. Retrieve authenticated user.
3. Create Farm entity.
4. Assign farm owner to user.
5. Store farm in database.
6. Return FarmResponse DTO.

User now sees the farm in their dashboard.

---

# 6. Farm Management Flow

### Goal

Allow users to manage their farms.

Available actions:

* View farms
* Update farm details
* Delete farm

### Retrieve farms

```
GET /api/v1/farms
```

Backend:

1. Extract user ID.
2. Query farms belonging to user.
3. Return list of FarmResponse DTOs.

---

### Update farm

```
PUT /api/v1/farms/{farmId}
```

Backend:

1. Validate ownership.
2. Update farm fields.
3. Save updated farm.

---

### Delete farm

Soft deletion is used.

```
DELETE /api/v1/farms/{farmId}
```

Backend:

```
active = false
```

Farm remains in database but hidden from queries.

---

# 7. Prediction Generation Flow

### Goal

Allow farmers to generate yield predictions.

### User Flow

1. User selects a farm.
2. User clicks **Generate Prediction**.

Frontend request:

```
POST /api/v1/predictions/generate
```

Request body:

```
farmId
```

---

### Backend Prediction Pipeline

1. Validate farm ownership.
2. Retrieve farm data.
3. Enrich with metadata.
4. Fetch weather data.
5. Construct prediction request.
6. Send request to ML service.

Example:

```
POST ml-service/api/v1/predict
```

Payload includes:

```
crop
district
soilType
landSize
weather features
```

---

### ML Service Flow

1. Receive request.
2. Load prediction model.
3. Preprocess input data.
4. Run inference.
5. Return prediction result.

Response:

```
predictedYield
confidence
modelVersion
```

---

### Backend Response

Backend stores prediction record.

Fields stored:

```
predictionId
farmId
userId
predictedYield
confidence
modelVersion
timestamp
```

Response returned to frontend.

User sees prediction result.

---

# 8. Prediction History Flow

### Goal

Allow farmers to view historical predictions.

Frontend request:

```
GET /api/v1/predictions
```

Query options:

```
farmId
page
size
sort
```

Backend returns paginated prediction history.

User can view prediction timeline.

---

# 9. Feedback Submission Flow

### Goal

Collect actual yield for ML model improvement.

User flow:

1. User harvests crop.
2. User navigates to prediction record.
3. User clicks **Submit Actual Yield**.
4. User enters:

```
actualYield
notes
```

Frontend request:

```
POST /api/v1/predictions/{predictionId}/feedback
```

Backend:

1. Validate ownership.
2. Store feedback record.
3. Link feedback to prediction.

This data will be used for:

* model evaluation
* retraining pipelines

---

# 10. Analytics Flow

### Goal

Provide insights into farming performance.

Users can access analytics dashboard.

Available analytics:

### Yield trend

```
GET /api/v1/analytics/yield-trend
```

Displays prediction vs actual yield.

---

### Risk distribution

```
GET /api/v1/analytics/risk-distribution
```

Shows risk levels across predictions.

---

### Overview statistics

```
GET /api/v1/analytics/overview
```

Includes:

```
total farms
total predictions
average yield
```

---

# 11. Metadata Retrieval Flow

The frontend retrieves metadata used in forms.

Example endpoints:

```
GET /api/v1/meta/crops
GET /api/v1/meta/districts
GET /api/v1/meta/soil-types
GET /api/v1/meta/irrigation-types
```

These endpoints populate dropdown selections.

---

# 12. Admin Flow

Admin users have elevated privileges.

Admin endpoints:

```
/api/v1/admin/*
```

Capabilities:

### View users

```
GET /api/v1/admin/users
```

---

### Update user role

```
PUT /api/v1/admin/users/{uid}/role
```

---

### Model management

```
GET /api/v1/admin/models
PUT /api/v1/admin/models/activate/{version}
```

Allows switching ML models.

---

# 13. Error Handling Flow

Errors follow standardized response format.

Example:

```
{
  success: false,
  message: "Validation failed",
  timestamp: "..."
}
```

Error categories:

```
400 validation error
401 authentication error
403 authorization error
404 resource not found
500 server error
```

---

# 14. System Health Flow

Health endpoints monitor system state.

Available endpoints:

```
/api/v1/health
/api/v1/health/database
/api/v1/health/ml
```

These endpoints allow monitoring tools to detect failures.

---

# 15. Future User Flows

Planned flows include:

Mobile application onboarding

Satellite imagery analysis

Automated crop advisory notifications

Multi-season farm performance analysis

Model retraining feedback dashboards

---

# 16. Summary

The AICYP user experience is built around a simple loop:

```
Login
Create Farm
Generate Prediction
View Results
Submit Feedback
Improve Model
```

This feedback-driven design ensures the system improves over time while providing useful insights to farmers.
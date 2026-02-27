# Canonical Project Structure

This section defines the complete and authoritative directory structure of the aicyp repository.

The structure is mandatory and must be preserved to ensure:

* Separation of concerns
* Service isolation
* Clean architecture
* Testability
* CI/CD compatibility
* Production readiness

---

## Root Structure

```
aicyp/
├── backend/
├── ml-service/
├── frontend/
├── infra/
├── .editorconfig
├── .gitignore
```

---

## Backend — Spring Boot Service

```
backend/
├── src/main/java/com/aicyp/
│   ├── AicypApplication.java
│   ├── config/
│   ├── security/
│   ├── controller/
│   ├── service/
│   ├── repository/
│   ├── model/
│   ├── dto/request/
│   ├── dto/response/
│   ├── mapper/
│   ├── exception/
│   └── util/
├── src/main/resources/
│   ├── application.yml
│   ├── application-dev.yml
│   ├── application-prod.yml
│   └── logback-spring.xml
├── src/test/java/com/aicyp/
│   ├── controller/
│   ├── service/
│   └── integration/
├── checkstyle.xml
├── Dockerfile
└── pom.xml
```

Design rules:

* Controllers must contain no business logic.
* Services must contain domain logic.
* Repositories must only contain data access.
* Entities must never be exposed directly.
* DTOs define API contracts.
* GlobalExceptionHandler handles all errors centrally.

---

## ML Service — Python Microservice

```
ml-service/
├── app/
│   ├── main.py
│   ├── config.py
│   ├── api/
│   │   ├── predict.py
│   │   ├── recommend.py
│   │   └── health.py
│   ├── models/
│   │   ├── baseline_model.py
│   │   ├── pretrained_model.py
│   │   ├── ensemble_model.py
│   │   └── model_loader.py
│   ├── preprocessing/
│   │   ├── feature_engineering.py
│   │   └── validators.py
│   ├── optimization/
│   │   ├── irrigation_optimizer.py
│   │   └── fertilizer_optimizer.py
│   └── registry/
│       └── model_registry.py
├── tests/
│   ├── test_predict.py
│   ├── test_models.py
│   └── test_preprocessing.py
├── requirements.txt
├── pyproject.toml
├── .flake8
└── Dockerfile
```

Design rules:

* API layer must not contain ML logic.
* Models must be swappable.
* Preprocessing must be isolated.
* Model versioning handled via registry.

---

## Frontend

```
frontend/
├── web/
│   ├── src/
│   │   ├── api/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── types/
│   │   └── App.tsx
│   ├── tests/
│   │   ├── unit/
│   │   └── integration/
│   ├── tsconfig.json
│   ├── package.json
│   └── Dockerfile
├── admin/
│   ├── src/
│   └── package.json
└── mobile/
    ├── src/
    └── package.json
```

---

## Infrastructure

```
infra/
├── docker/
│   ├── docker-compose.dev.yml
│   ├── docker-compose.prod.yml
│   └── .env.example
├── nginx/
│   └── nginx.conf
├── k8s/
└── scripts/
    ├── bootstrap.sh
    └── deploy.sh
```

All deployment logic must reside under infra/.

---

End of architectural structure definition.
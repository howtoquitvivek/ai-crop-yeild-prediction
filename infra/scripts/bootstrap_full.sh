#!/bin/bash

echo "Creating full aicyp structure..."

create_dir() {
  [ -d "$1" ] || mkdir -p "$1"
}

create_file() {
  [ -f "$1" ] || touch "$1"
}

# =========================
# BACKEND
# =========================

create_dir backend/src/main/java/com/aicyp/config
create_dir backend/src/main/java/com/aicyp/security
create_dir backend/src/main/java/com/aicyp/controller
create_dir backend/src/main/java/com/aicyp/service
create_dir backend/src/main/java/com/aicyp/repository
create_dir backend/src/main/java/com/aicyp/model
create_dir backend/src/main/java/com/aicyp/dto/request
create_dir backend/src/main/java/com/aicyp/dto/response
create_dir backend/src/main/java/com/aicyp/mapper
create_dir backend/src/main/java/com/aicyp/exception
create_dir backend/src/main/java/com/aicyp/util

create_dir backend/src/main/resources
create_dir backend/src/test/java/com/aicyp/controller
create_dir backend/src/test/java/com/aicyp/service
create_dir backend/src/test/java/com/aicyp/integration

create_file backend/src/main/java/com/aicyp/AicypApplication.java
create_file backend/src/main/java/com/aicyp/config/SecurityConfig.java
create_file backend/src/main/java/com/aicyp/config/CorsConfig.java
create_file backend/src/main/java/com/aicyp/config/WebClientConfig.java
create_file backend/src/main/java/com/aicyp/config/OpenApiConfig.java

create_file backend/src/main/java/com/aicyp/security/FirebaseAuthFilter.java
create_file backend/src/main/java/com/aicyp/security/CustomAuthenticationEntryPoint.java

create_file backend/src/main/java/com/aicyp/controller/AuthController.java
create_file backend/src/main/java/com/aicyp/controller/FarmController.java
create_file backend/src/main/java/com/aicyp/controller/PredictionController.java
create_file backend/src/main/java/com/aicyp/controller/RecommendationController.java
create_file backend/src/main/java/com/aicyp/controller/MetaController.java
create_file backend/src/main/java/com/aicyp/controller/HealthController.java
create_file backend/src/main/java/com/aicyp/controller/AdminController.java

create_file backend/src/main/java/com/aicyp/service/FarmService.java
create_file backend/src/main/java/com/aicyp/service/PredictionService.java
create_file backend/src/main/java/com/aicyp/service/RecommendationService.java
create_file backend/src/main/java/com/aicyp/service/MlClientService.java
create_file backend/src/main/java/com/aicyp/service/MetaService.java
create_file backend/src/main/java/com/aicyp/service/AnalyticsService.java

create_file backend/src/main/java/com/aicyp/repository/UserRepository.java
create_file backend/src/main/java/com/aicyp/repository/FarmRepository.java
create_file backend/src/main/java/com/aicyp/repository/PredictionRepository.java
create_file backend/src/main/java/com/aicyp/repository/ModelVersionRepository.java

create_file backend/src/main/java/com/aicyp/model/User.java
create_file backend/src/main/java/com/aicyp/model/Farm.java
create_file backend/src/main/java/com/aicyp/model/Prediction.java
create_file backend/src/main/java/com/aicyp/model/ModelVersion.java

create_file backend/src/main/java/com/aicyp/exception/GlobalExceptionHandler.java

create_file backend/src/main/resources/application.yml
create_file backend/src/main/resources/application-dev.yml
create_file backend/src/main/resources/application-prod.yml
create_file backend/src/main/resources/logback-spring.xml

create_file backend/checkstyle.xml
create_file backend/.editorconfig
create_file backend/Dockerfile
create_file backend/pom.xml
create_file backend/README.md

# =========================
# ML SERVICE
# =========================

create_dir ml-service/app/api
create_dir ml-service/app/models
create_dir ml-service/app/preprocessing
create_dir ml-service/app/optimization
create_dir ml-service/app/registry
create_dir ml-service/tests

create_file ml-service/app/main.py
create_file ml-service/app/config.py

create_file ml-service/app/api/predict.py
create_file ml-service/app/api/recommend.py
create_file ml-service/app/api/health.py

create_file ml-service/app/models/baseline_model.py
create_file ml-service/app/models/pretrained_model.py
create_file ml-service/app/models/ensemble_model.py
create_file ml-service/app/models/model_loader.py

create_file ml-service/app/preprocessing/feature_engineering.py
create_file ml-service/app/preprocessing/validators.py

create_file ml-service/app/optimization/irrigation_optimizer.py
create_file ml-service/app/optimization/fertilizer_optimizer.py

create_file ml-service/app/registry/model_registry.py

create_file ml-service/tests/test_predict.py
create_file ml-service/tests/test_models.py
create_file ml-service/tests/test_preprocessing.py

create_file ml-service/.flake8
create_file ml-service/pyproject.toml
create_file ml-service/requirements.txt
create_file ml-service/Dockerfile
create_file ml-service/README.md

# =========================
# FRONTEND
# =========================

create_dir frontend/web/src/api
create_dir frontend/web/src/pages
create_dir frontend/web/src/components
create_dir frontend/web/src/hooks
create_dir frontend/web/src/context
create_dir frontend/web/src/types
create_dir frontend/web/tests/unit
create_dir frontend/web/tests/integration

create_file frontend/web/src/context/AuthContext.tsx
create_file frontend/web/src/App.tsx

create_file frontend/web/.eslintrc.js
create_file frontend/web/.prettierrc
create_file frontend/web/jest.config.js
create_file frontend/web/tsconfig.json
create_file frontend/web/Dockerfile
create_file frontend/web/package.json

create_dir frontend/admin/src
create_dir frontend/admin/tests
create_file frontend/admin/package.json

create_dir frontend/mobile/src
create_dir frontend/mobile/tests
create_file frontend/mobile/package.json

# =========================
# INFRA
# =========================

create_dir infra/docker
create_dir infra/nginx
create_dir infra/k8s
create_dir infra/scripts

create_file infra/docker/docker-compose.dev.yml
create_file infra/docker/docker-compose.prod.yml
create_file infra/docker/.env.example

create_file infra/nginx/nginx.conf

create_file infra/scripts/start-dev.sh
create_file infra/scripts/deploy.sh

# =========================
# GITHUB
# =========================

create_dir .github/workflows

create_file .github/workflows/backend-ci.yml
create_file .github/workflows/ml-ci.yml
create_file .github/workflows/frontend-ci.yml
create_file .github/workflows/deploy.yml

# =========================
# DOCS
# =========================

# create_dir docs
# create_file docs/srs.md
# create_file docs/architecture.md
# create_file docs/api-spec.md
# create_file docs/experimentation.md

# =========================
# ROOT
# =========================

create_file .editorconfig
create_file .gitignore
# create_file README.md
# create_file LICENSE

echo "Full aicyp structure created safely."
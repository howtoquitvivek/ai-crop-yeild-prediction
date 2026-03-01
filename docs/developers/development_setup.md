# Development Setup

This document explains how to run the project locally for development.

---

## Prerequisites

Required:

* Java 17+
* Node.js 18+
* npm
* Git
* MongoDB Atlas access
* Firebase project access

---

# Repository Setup

Clone the repository:

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

---

# Backend Setup (Spring Boot)

## 1. Environment Configuration

Navigate to backend:

```bash
cd backend
```

Copy the example file:

```bash
cp .env.example .env
```

Open `.env` and configure:

```
MONGO_URI=<your-mongodb-uri>
FIREBASE_CREDENTIALS_BASE64=<base64-encoded-service-account>
```

### Firebase Credential Setup

1. Download the Firebase service account JSON from Firebase Console.
2. Encode it as Base64:

Linux / WSL:

```bash
base64 firebase-service-account.json -w 0
```

Copy the output into the FIREBASE_CREDENTIALS_BASE64 environment variable.

Important:

* Do NOT commit `.env`
* Do NOT commit service account JSON

---

## 2. Run Backend

Using Maven Wrapper:

```bash
./mvnw spring-boot:run
```

Application runs on:

```
http://localhost:8080
```

---

## Test Execution 9 (Later Phase)

Run tests:

```bash
./mvnw test
```

CI will also run tests automatically on Pull Requests.

---

# Frontend Setup (Web)

Navigate to web frontend:

```bash
cd frontend/web
```

Copy example env:

```bash
cp .env.example .env
```

Configure:

```
VITE_API_BASE_URL=http://localhost:8080
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

These values are found in Firebase Console → Project Settings → Web App.

---

## Install Dependencies

```bash
npm install
```

---

## Run Frontend

```bash
npm run dev
```

App runs on:

```
http://localhost:5173
```

---

# ML Service Setup

Navigate to ml-service:

```bash
cd ml-service
```

Create virtual environment:

```bash
python -m venv venv
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run service:

```bash
uvicorn app.main:app --reload
```

---

# Important Rules

* Never commit `.env`
* Never commit service account JSON
* Always develop on feature branches
* Ensure backend builds successfully before creating PR
* PR must pass CI before merge

---

End of development setup guide.

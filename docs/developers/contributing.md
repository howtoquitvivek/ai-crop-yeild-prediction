# Contributing Guide

We follow a *Pull Request workflow* with protected branches.

Direct pushes to `main` are strictly prohibited.

---

## Clone the Repository

Internal contributors should clone the main repository directly:

```bash
git clone https://github.com/<original-owner>/<repo-name>.git
cd <repo-name>
```

External contributors may fork if required.

---

## Add Upstream Remote (If Forking)

```bash
git remote add upstream https://github.com/<original-owner>/<repo-name>.git
git fetch upstream
```

Verify remotes:

```bash
git remote -v
```

---

## Branching Rules

Protected branches:

- `main` → Production-ready only
- `develop` → Integration branch

All work must be done on feature branches.

Never commit directly to `main`.

Refer to [Branching Strategy](branching_strategy.md) for naming conventions.

---

## Create a Feature Branch

```bash
git checkout develop
git pull origin develop
git checkout -b feature/short-description
```

Examples:

```bash
git checkout -b feature/add-login-flow
```

---

## Module Responsibility

Contributors must only modify their assigned module:

- Backend → `backend/`
- ML Service → `ml-service/`
- Frontend → `frontend/`

Cross-module changes require discussion and approval.

---

## Make Changes

* Keep changes focused
* Avoid unrelated refactors
* Follow architecture rules in `docs/architecture.md`
* Update documentation when necessary

---

## Commit Changes

Follow commit guidelines.

```bash
git add .
git commit -m "feat(module): short description"
```

Refer to [Commit Guidelines](commit_guidelines.md) for commit format conventions.

---

## Sync With Upstream (Recommended)

```bash
git fetch origin
git checkout develop
git pull origin develop
git checkout feature/short-description
git rebase develop
```

---

## Before Opening a Pull Request

CI will enforce build and test checks. Contributors are encouraged to verify locally before pushing.

Backend:

```bash
cd backend
./mvnw clean install
```

ML Service:

```bash
cd ml-service
pytest
```

Frontend:

```bash
cd frontend/web
npm run lint
npm run build
```

---

## Push Branch

```bash
git push origin feature/short-description
```

---

## Create Pull Request

1. Open repository on GitHub
2. Click *Compare & Pull Request*
3. Target branch: `develop`
4. Fill the PR template
5. Submit the PR

---

## Pull Request Rules

* PR must target `develop`
* At least 1 approval required
* CI must pass before merge
* Do not merge your own PR without review

---

## Contribution Expectations

* Code builds successfully
* No linting errors
* Tests pass (if applicable)
* Commit messages follow guidelines
* PR scope is clear and limited
* Entities must not be exposed directly in API responses

---

End of contributing guide.
# Branching Strategy

This document defines how branches should be created, named, and managed within this repository.

## Primary Branches

### main

The `main` branch contains stable, production-ready code.

Rules:

* Changes must come through Pull Requests
* Must always remain buildable
* No direct feature branches should target `main`

---

### develop

The `develop` branch serves as an integration branch for ongoing development.

Rules:

* Feature branches must branch from `develop`
* Feature branches merge into `develop`
* Periodically merged into `main` when stable

---

## Supporting Branches

### Feature Branches

Used for new functionality.

Naming convention:

```
feature/short-description
```

Examples:

```
feature/add-login-flow
```

---

### Fix Branches

Used for bug fixes.

Naming convention:

```
fix/short-description
```

Examples:

```
fix/api-timeout
```

---

### Refactor Branches

Used for internal improvements without changing behavior.

Naming convention:

```
refactor/module-name
```

Example:

```
refactor/sw-service
```

---

## Branch Creation Workflow

1. Ensure local `develop` is updated

```bash
git checkout develop
git pull origin develop
```

2. Create a new branch

```bash
git checkout -b feature/short-description
```

---

## Merging Rules

* All merges must occur via Pull Requests
* Feature branches must target `develop`
* Only `develop` may be merged into `main`
* CI/build checks must pass before merge

---

## Rebase vs Merge

Preferred:

* Rebase feature branches onto `develop` to keep history clean

```bash
git checkout feature/branch-name
git rebase develop
```

Acceptable:

* Merge when rebase is not practical

---

## Branch Lifetime

* Keep branches short-lived
* Delete branches after merge

---

## Best Practices

* One concern per branch
* Small, focused Pull Requests
* Descriptive branch names
* Regularly sync with `develop`
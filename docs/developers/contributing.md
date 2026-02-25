# Contributing Guide

We follow a *Fork and Pull Request* workflow.

## Fork the Repository

1. Navigate to the project on GitHub
2. Click *Fork*
3. A copy will be created under your GitHub account

## Clone Your Fork

**Windows (PowerShell / CMD)**

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

**Linux (Terminal)**

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

## Add Upstream Remote

```bash
git remote add upstream https://github.com/<original-owner>/<repo-name>.git
git fetch upstream
```

Verify remotes:

```bash
git remote -v
```

## Create a Feature Branch

```bash
git checkout -b feature/short-description
```

Examples:

```bash
git checkout -b feature/add-login-flow
```

Refer to [Branching Strategy](branching_strategy.md) for naming conventions.

## Make Changes

* Keep changes focused
* Avoid unrelated refactors
* Update documentation when necessary

## Commit Changes

Follow commit guidelines.

```bash
git add .
git commit -m "feat(module): short description"
```

Refer to [*Commit Guidelines*](commit_guidelines.md) for commit format conventions.

## Sync With Upstream (Recommended)

```bash
git fetch upstream
git checkout main
git merge upstream/main
git checkout feature/short-description
git rebase main
```

## Push Branch

```bash
git push origin feature/short-description
```

## Create Pull Request

1. Open your fork on GitHub
2. Click *Compare & Pull Request*
3. Fill the PR template
4. Submit the PR

## Contribution Expectations

* Code builds successfully
* No linting errors
* Tests pass (if applicable)
* Commit messages follow guidelines
* PR scope is clear and limited
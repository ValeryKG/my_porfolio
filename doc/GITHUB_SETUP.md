# GitHub Setup Guide

> Reference for connecting local git repos to GitHub with correct privacy settings.

---

## One-Time Global Setup (do this once on any new machine)

This configures git globally so **every project** on this machine uses the right email automatically.

```bash
git config --global user.name "ValeryKG"
git config --global user.email "170970395+ValeryKG@users.noreply.github.com"
```

Verify it worked:
```bash
git config --global user.name
git config --global user.email
```

> **Where to find your no-reply email:**
> GitHub → Settings → Emails → look for `xxxxxxx+username@users.noreply.github.com`

---

## New Project — Full Setup from Scratch

```bash
# 1. Initialize git in your project folder
git init

# 2. Stage all files
git add .

# 3. First commit
git commit -m "Initial commit"

# 4. Rename default branch to main (GitHub default)
git branch -M main

# 5. Connect to your GitHub repo (create the repo on GitHub first)
git remote add origin https://github.com/ValeryKG/YOUR-REPO-NAME.git

# 6. Push
git push -u origin main
```

---

## Existing Local-Only Project — Push to GitHub

### Step 1 — Create the GitHub repo
Go to [github.com/new](https://github.com/new), create an **empty** repo (no README, no .gitignore).

### Step 2 — Connect and push
```bash
# Connect to GitHub
git remote add origin https://github.com/ValeryKG/YOUR-REPO-NAME.git

# Push
git push -u origin main
```

---

## Problem: "remote origin already exists"

```bash
# Check what the current remote points to
git remote -v

# Update it to a new URL
git remote set-url origin https://github.com/ValeryKG/YOUR-REPO-NAME.git

# Then push
git push -u origin main
```

---

## Problem: Push rejected — email privacy (GH007)

This happens when commits were made with your real email before the global config was set.

```bash
# Step 1 — Make sure global config is set correctly (see top of this file)

# Step 2 — Rewrite all commit history to use the no-reply email
git stash   # stash any uncommitted changes first

FILTER_BRANCH_SQUELCH_WARNING=1 git filter-branch -f --env-filter '
OLD_EMAIL="myisramail@gmail.com"
NEW_EMAIL="170970395+ValeryKG@users.noreply.github.com"
NEW_NAME="ValeryKG"
if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]; then
  export GIT_COMMITTER_EMAIL="$NEW_EMAIL"
  export GIT_COMMITTER_NAME="$NEW_NAME"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]; then
  export GIT_AUTHOR_EMAIL="$NEW_EMAIL"
  export GIT_AUTHOR_NAME="$NEW_NAME"
fi
' --tag-name-filter cat -- --branches --tags

# Step 3 — Force push the rewritten history
git push -u origin main --force

# Step 4 — Restore stashed changes
git stash pop
```

> **Replace** `OLD_EMAIL` with your real email and `NEW_EMAIL`/`NEW_NAME` with your GitHub values.

---

## Problem: Push rejected — remote has work you don't have locally

This happens when you uploaded files to GitHub manually before pushing from your local machine.

```bash
# Option A: Force push (overwrites GitHub with your local version — use when local is correct)
git push -u origin main --force

# Option B: Pull first (merges GitHub content into local — use when you want to keep both)
git pull origin main --allow-unrelated-histories
git push -u origin main
```

---

## Everyday Workflow

```bash
# Check what changed
git status

# Stage changes
git add .
# or stage a specific file:
git add src/components/MyComponent.tsx

# Commit
git commit -m "Describe what you changed"

# Push to GitHub
git push
```

---

## Useful Commands

| Command | What it does |
|---|---|
| `git remote -v` | Show where origin points |
| `git log --oneline` | Show commit history (short) |
| `git log --format="%H %ae %s"` | Show commits with author email |
| `git status` | Show staged/unstaged changes |
| `git stash` | Temporarily save uncommitted changes |
| `git stash pop` | Restore stashed changes |
| `git config --global --list` | Show all global git settings |

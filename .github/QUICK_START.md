# 🚀 Quick Start - Activate CI/CD in 5 Minutes

## TL;DR - Super Fast Setup

### 1️⃣ Get Vercel IDs (2 minutes)

```bash
# Run the helper script
cd /home/user/MI-LearntoDiscuss
./scripts/setup-vercel-secrets.sh
```

This script will:
- ✅ Login to Vercel
- ✅ Link your project
- ✅ Show you your Organization ID and Project ID

### 2️⃣ Create Vercel Token (1 minute)

1. Go to: https://vercel.com/account/tokens
2. Click **"Create Token"**
3. Name: `GitHub Actions CI/CD`
4. **Copy the token** (save it temporarily)

### 3️⃣ Add to GitHub (2 minutes)

**Option A: GitHub CLI (Fastest)**
```bash
gh secret set VERCEL_TOKEN
# Paste your token

gh secret set VERCEL_ORG_ID -b "your-org-id-here"
gh secret set VERCEL_PROJECT_ID -b "your-project-id-here"
```

**Option B: GitHub Web**
1. Go to: https://github.com/aibymlorg/MI-LearntoDiscuss/settings/secrets/actions
2. Click **"New repository secret"** for each:
   - `VERCEL_TOKEN` = [your token]
   - `VERCEL_ORG_ID` = [from step 1]
   - `VERCEL_PROJECT_ID` = [from step 1]

### 4️⃣ Test It! (30 seconds)

```bash
# Create test PR
git checkout -b test-pipeline
echo "# CI/CD test" >> README.md
git add README.md
git commit -m "Test: CI/CD pipeline"
git push origin test-pipeline
```

Go to GitHub and create a PR. Watch the magic happen! ✨

---

## What You Get

After setup, **every time you push code**:

```
Your Code → GitHub → Tests Run → Preview Deploy → Bot Comments URL
```

When you **merge a PR**:

```
Merge PR → Tests Run → Production Deploy → Live! 🎉
```

## Need More Details?

- **Step-by-step guide:** [SETUP_SECRETS.md](./SETUP_SECRETS.md)
- **Full CI/CD docs:** [CICD_SETUP.md](./CICD_SETUP.md)

---

That's it! You now have enterprise-grade DevOps automation! 🚀

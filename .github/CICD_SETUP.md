# CI/CD Setup Guide

Complete guide for setting up the automated CI/CD pipeline integrating **Claude Code**, **GitHub Actions**, and **Vercel**.

## 🎯 Overview

This project uses a modern CI/CD pipeline that automatically:
- ✅ Checks code quality (linting, type checking)
- ✅ Builds the application
- ✅ Audits dependencies for security issues
- ✅ Deploys to Vercel on every push to main
- ✅ Creates preview deployments for pull requests
- ✅ Comments deployment URLs on PRs

## 🔄 How It All Works Together

```
┌─────────────────┐
│  Claude Code    │
│  (You write     │
│   features)     │
└────────┬────────┘
         │
         │ git push
         ▼
┌─────────────────┐
│    GitHub       │
│  (Version       │
│   Control)      │
└────────┬────────┘
         │
         │ Triggers
         ▼
┌─────────────────┐
│ GitHub Actions  │
│  (CI/CD         │
│   Pipeline)     │
└────────┬────────┘
         │
         ├─── Run Tests
         ├─── Lint Code
         ├─── Type Check
         └─── Build App
         │
         │ If all pass
         ▼
┌─────────────────┐
│    Vercel       │
│  (Hosting &     │
│   Deployment)   │
└────────┬────────┘
         │
         ▼
    🌐 Live App
```

## 📋 Prerequisites

Before setting up the CI/CD pipeline, you need:

1. **GitHub Repository** - Your code must be in a GitHub repo
2. **Vercel Account** - Free account at [vercel.com](https://vercel.com)
3. **GitHub Secrets** - API keys and tokens (we'll set these up below)

## 🚀 Step-by-Step Setup

### Step 1: Link GitHub to Vercel

1. Go to [vercel.com](https://vercel.com) and login
2. Click **"Add New Project"**
3. Select **"Import Git Repository"**
4. Choose your GitHub repository: `aibymlorg/MI-LearntoDiscuss`
5. Configure project settings:
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`

6. **Add Environment Variables** in Vercel:
   - `NEXT_PUBLIC_OPENAI_API_KEY`
   - `NEXT_PUBLIC_ANTHROPIC_API_KEY`
   - `NEXT_PUBLIC_GEMINI_API_KEY`
   - `NEXT_PUBLIC_OLLAMA_API_KEY`
   - `NEXT_PUBLIC_OLLAMA_URL` = `https://api.ollama.ai`
   - `NEXT_PUBLIC_OLLAMA_MODEL` = `llama3.3:latest`

7. Click **"Deploy"**

### Step 2: Get Vercel Tokens

1. Go to **Vercel Dashboard** → **Settings** → **Tokens**
2. Click **"Create Token"**
3. Name it: `GitHub Actions CI/CD`
4. Set expiration: Never (or your preference)
5. Copy the token (you'll need it in Step 3)

6. Get your **Organization ID** and **Project ID**:
   ```bash
   # Install Vercel CLI if not installed
   npm install -g vercel

   # Link to your project
   vercel link

   # Get IDs
   vercel project ls
   ```

   Or find them in `.vercel/project.json` after running `vercel link`

### Step 3: Add GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Add these secrets one by one:

   | Secret Name | Value | Description |
   |-------------|-------|-------------|
   | `VERCEL_TOKEN` | Your Vercel token from Step 2 | Allows GitHub Actions to deploy to Vercel |
   | `VERCEL_ORG_ID` | Your organization ID | Found in `.vercel/project.json` |
   | `VERCEL_PROJECT_ID` | Your project ID | Found in `.vercel/project.json` |
   | `NEXT_PUBLIC_OPENAI_API_KEY` | Your OpenAI API key | (Optional) For build testing |
   | `NEXT_PUBLIC_ANTHROPIC_API_KEY` | Your Anthropic key | (Optional) For build testing |
   | `NEXT_PUBLIC_GEMINI_API_KEY` | Your Gemini key | (Optional) For build testing |
   | `NEXT_PUBLIC_OLLAMA_API_KEY` | Your Ollama Cloud key | (Optional) For build testing |

   **Note:** The API keys in GitHub Secrets are optional and only used for build testing. Your actual production keys should be in Vercel's environment variables.

### Step 4: Enable GitHub Actions

1. Go to your repository's **Actions** tab
2. If prompted, click **"I understand my workflows, go ahead and enable them"**
3. You should see 3 workflows:
   - ✅ **CI - Code Quality & Build**
   - ✅ **Deploy to Vercel**
   - ✅ **Preview Deployment**

### Step 5: Test the Pipeline

1. **Make a change** using Claude Code:
   ```bash
   # Create a feature branch
   git checkout -b test-ci-cd

   # Make a small change (e.g., update README)
   echo "# Testing CI/CD" >> README.md

   # Commit and push
   git add .
   git commit -m "Test CI/CD pipeline"
   git push origin test-ci-cd
   ```

2. **Create a Pull Request** on GitHub

3. **Watch the magic happen:**
   - ✅ CI workflow runs automatically
   - ✅ Preview deployment is created
   - ✅ Bot comments the preview URL on your PR
   - ✅ Code quality checks pass

4. **Merge the PR:**
   - ✅ Production deployment triggers automatically
   - ✅ Changes go live on your Vercel URL

## 📊 Workflows Explained

### 1. CI - Code Quality & Build (`ci.yml`)

**Triggers:** Push to `main` or `develop`, Pull Requests

**What it does:**
- Installs dependencies
- Runs ESLint to check code quality
- Runs TypeScript type checking
- Builds the Next.js application
- Runs security audit on dependencies
- Uploads build artifacts

**Why it matters:** Catches errors before they reach production

### 2. Deploy to Vercel (`deploy-vercel.yml`)

**Triggers:** Push to `main` branch

**What it does:**
- Pulls Vercel environment configuration
- Builds the project with Vercel CLI
- Deploys to production
- Posts deployment URL to GitHub

**Why it matters:** Automatic production deployments on every merge

### 3. Preview Deployment (`preview-deployment.yml`)

**Triggers:** Pull Requests (opened, synchronized, reopened)

**What it does:**
- Creates a preview deployment for the PR
- Comments the preview URL on the PR
- Updates comment on new commits
- Provides testing checklist

**Why it matters:** Test changes before merging to production

## 🎨 The Complete Workflow in Action

### Scenario: Adding a new AI provider

1. **You (via Claude Code):**
   ```bash
   git checkout -b feature/add-cohere-provider
   # Claude helps you implement Cohere provider
   git add .
   git commit -m "Add Cohere AI provider support"
   git push origin feature/add-cohere-provider
   ```

2. **GitHub automatically:**
   - Creates PR from your branch
   - Triggers CI workflow
   - Runs linting, type checking, build

3. **GitHub Actions:**
   - ✅ Linting passes
   - ✅ Type checking passes
   - ✅ Build succeeds
   - ✅ Creates preview deployment

4. **Bot comments on PR:**
   ```
   🔍 Preview Deployment Ready!

   Preview URL: https://mi-learntodicuss-xyz123.vercel.app

   What to test:
   - ✅ All AI providers work correctly
   - ✅ New Cohere provider functions
   - ✅ Multi-AI conversations work
   ```

5. **You test the preview:**
   - Click the URL
   - Test the new Cohere provider
   - Verify everything works

6. **You merge the PR:**
   - Click "Merge pull request"

7. **GitHub Actions automatically:**
   - Triggers production deployment
   - Deploys to your main Vercel URL
   - Posts success message

8. **Result:**
   - 🎉 New feature is live in production!
   - 📊 All quality checks passed
   - 🚀 Zero manual deployment steps

## 🔍 Monitoring and Debugging

### Check Workflow Status

1. Go to **Actions** tab in your GitHub repo
2. Click on any workflow run
3. View logs for each step
4. See what passed or failed

### Common Issues

**Issue: Vercel deployment fails**
- Check that `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` secrets are set correctly
- Verify your Vercel token hasn't expired

**Issue: Build fails in CI**
- Check the build logs in GitHub Actions
- Ensure all dependencies are in `package.json`
- Fix TypeScript errors or linting issues

**Issue: Preview deployment not created**
- Ensure the workflow file exists: `.github/workflows/preview-deployment.yml`
- Check that GitHub Actions is enabled in your repository

## 🎓 Best Practices

1. **Always create feature branches**
   ```bash
   git checkout -b feature/my-new-feature
   ```

2. **Write descriptive commit messages**
   ```bash
   git commit -m "Add Cohere AI provider with streaming support"
   ```

3. **Test preview deployments before merging**
   - Click the preview URL in PR comments
   - Test all functionality
   - Verify no regressions

4. **Keep dependencies updated**
   - The CI workflow audits dependencies
   - Fix security vulnerabilities promptly

5. **Use environment-specific configs**
   - Development: Use `.env.local`
   - Production: Use Vercel environment variables
   - CI: Use GitHub Secrets (if needed)

## 🔐 Security Considerations

- ✅ API keys are stored as encrypted secrets
- ✅ Never commit `.env.local` to git
- ✅ Vercel environments are isolated
- ✅ Preview deployments use separate environment variables
- ✅ Dependency audits run automatically
- ✅ Type checking catches potential runtime errors

## 📈 Advanced: Custom Workflow Triggers

You can manually trigger workflows:

```bash
# Trigger production deployment manually
gh workflow run deploy-vercel.yml

# Or via GitHub UI:
# Actions → Deploy to Vercel → Run workflow
```

## 🎉 Summary

With this CI/CD setup, your workflow becomes:

1. **Claude Code** helps you write features
2. **Git** versions your code
3. **GitHub** hosts your repository
4. **GitHub Actions** tests and validates
5. **Vercel** deploys automatically
6. **You** relax and sip coffee ☕

**No manual deployments. No forgetting to test. No broken production.**

Everything is automated, monitored, and reliable! 🚀

---

**Questions or issues?** Open an issue in the repository!

# GitHub Secrets Setup - Step-by-Step Guide

This guide will help you set up the required GitHub Secrets to activate your CI/CD pipeline.

## 📋 What You'll Need

You need to add 3 secrets to your GitHub repository:
1. `VERCEL_TOKEN` - Authentication token for Vercel
2. `VERCEL_ORG_ID` - Your Vercel organization/team ID
3. `VERCEL_PROJECT_ID` - Your specific project ID

## 🔑 Step 1: Get Your Vercel Token

### Option A: Via Vercel Dashboard (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/account/tokens)
2. Click **"Create Token"**
3. Configure the token:
   - **Name:** `GitHub Actions CI/CD`
   - **Scope:** Full Account (or select specific teams)
   - **Expiration:** Choose based on your preference (Never/1 year/6 months)
4. Click **"Create"**
5. **COPY THE TOKEN IMMEDIATELY** - you won't see it again!
6. Save it somewhere safe temporarily (you'll add it to GitHub soon)

### Option B: Via Vercel CLI

```bash
# This will open browser for authentication
vercel login

# After login, create a token
# Note: CLI doesn't create tokens, use dashboard instead
```

## 🆔 Step 2: Get Your Organization ID and Project ID

### Method 1: Deploy First, Then Get IDs

If you haven't deployed to Vercel yet:

```bash
# Navigate to your project
cd /home/user/MI-LearntoDiscuss

# Login to Vercel
vercel login

# Link your project (or create new one)
vercel link

# This creates .vercel directory with project.json
```

After running `vercel link`, check the created file:

```bash
cat .vercel/project.json
```

You'll see something like:
```json
{
  "orgId": "team_xxxxxxxxxxxxxxxx",
  "projectId": "prj_xxxxxxxxxxxxxxxx"
}
```

**Copy these values!**

### Method 2: Get IDs from Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your project
3. Go to **Settings** → **General**
4. Scroll down to find:
   - **Organization ID** (under Team/Account section)
   - **Project ID** (in the URL or Settings)

### Method 3: Via Vercel API

```bash
# Get organization ID
vercel teams ls

# Deploy once to get project ID
vercel --prod
# The project ID will be shown in the output
```

## 🔐 Step 3: Add Secrets to GitHub

### Via GitHub Web Interface:

1. Go to your repository: https://github.com/aibymlorg/MI-LearntoDiscuss

2. Click **Settings** (top right of repo page)

3. In left sidebar, click **Secrets and variables** → **Actions**

4. Click **"New repository secret"** button

5. Add the following secrets one by one:

   **Secret 1:**
   - Name: `VERCEL_TOKEN`
   - Value: [Paste your Vercel token from Step 1]
   - Click **"Add secret"**

   **Secret 2:**
   - Name: `VERCEL_ORG_ID`
   - Value: [Paste your org ID from Step 2, e.g., `team_xxxxxxxx`]
   - Click **"Add secret"**

   **Secret 3:**
   - Name: `VERCEL_PROJECT_ID`
   - Value: [Paste your project ID from Step 2, e.g., `prj_xxxxxxxx`]
   - Click **"Add secret"**

### Via GitHub CLI (if you have `gh` installed):

```bash
# Install GitHub CLI if needed
# https://cli.github.com/

# Login
gh auth login

# Add secrets
gh secret set VERCEL_TOKEN
# Paste your token when prompted

gh secret set VERCEL_ORG_ID
# Paste your org ID when prompted

gh secret set VERCEL_PROJECT_ID
# Paste your project ID when prompted
```

## ✅ Step 4: Verify Secrets Are Added

### Via GitHub Web:
1. Go to **Settings** → **Secrets and variables** → **Actions**
2. You should see 3 secrets:
   - ✅ `VERCEL_TOKEN`
   - ✅ `VERCEL_ORG_ID`
   - ✅ `VERCEL_PROJECT_ID`

### Via GitHub CLI:
```bash
gh secret list
```

## 🧪 Step 5: Test the Pipeline

Now that secrets are set up, let's test the CI/CD pipeline!

### Test 1: Create a Pull Request

```bash
# Create a test branch
git checkout -b test-cicd-pipeline

# Make a small change
echo "" >> README.md
echo "Testing CI/CD pipeline 🚀" >> README.md

# Commit and push
git add README.md
git commit -m "Test: Verify CI/CD pipeline works"
git push origin test-cicd-pipeline
```

### Test 2: Create PR on GitHub

1. Go to your repo: https://github.com/aibymlorg/MI-LearntoDiscuss
2. Click **"Pull requests"** tab
3. Click **"New pull request"**
4. Select: `base: main` ← `compare: test-cicd-pipeline`
5. Click **"Create pull request"**

### Test 3: Watch the Magic! ✨

After creating the PR, you should see:

1. **GitHub Actions starts running** (yellow circle icon)
2. **Check the "Actions" tab** to see workflows running
3. **CI workflow runs:**
   - ✅ Linting
   - ✅ Type checking
   - ✅ Build
   - ✅ Dependency audit
4. **Preview Deployment workflow:**
   - ✅ Deploys to Vercel preview
   - ✅ Bot comments preview URL on your PR

**Expected PR Comment from Bot:**
```
🔍 Preview Deployment Ready!

Preview URL: https://mi-learntodicuss-git-test-cicd-pipeline-yourname.vercel.app

This preview deployment will be automatically updated with new commits.

### What to test:
- ✅ All AI providers work correctly
- ✅ Multi-AI conversations function properly
- ✅ Memory system stores and retrieves context
- ✅ UI/UX improvements look good

Note: Ollama Local won't work in preview (use Ollama Cloud instead)
```

### Test 4: Merge to Trigger Production Deployment

1. Click **"Merge pull request"** on your PR
2. Confirm the merge
3. Go to **Actions** tab
4. Watch **"Deploy to Vercel"** workflow run
5. Your changes are now LIVE in production! 🎉

## 🔍 Troubleshooting

### "Error: No Vercel token found"

**Solution:**
- Verify `VERCEL_TOKEN` secret is added correctly in GitHub
- Make sure you copied the entire token (they're long!)
- Try creating a new token

### "Error: Project not found"

**Solution:**
- Check `VERCEL_PROJECT_ID` matches your actual project
- Run `vercel link` locally first
- Verify the project exists in Vercel dashboard

### "Error: Unauthorized"

**Solution:**
- Ensure `VERCEL_ORG_ID` is correct
- Check token has correct permissions
- Token might have expired - create a new one

### Workflow doesn't trigger

**Solution:**
- Check `.github/workflows/` files are in your main branch
- Verify GitHub Actions is enabled: Settings → Actions → "Allow all actions"
- Check branch protection rules aren't blocking workflows

### Build fails with environment variable errors

**Solution:**
- Add your API keys to Vercel's environment variables (not GitHub Secrets)
- Go to Vercel Dashboard → Your Project → Settings → Environment Variables
- Add all `NEXT_PUBLIC_*` variables

## 📊 What Should Be Where?

| Secret/Variable | Location | Purpose |
|----------------|----------|---------|
| `VERCEL_TOKEN` | GitHub Secrets | Allows GitHub Actions to deploy |
| `VERCEL_ORG_ID` | GitHub Secrets | Identifies your Vercel team/org |
| `VERCEL_PROJECT_ID` | GitHub Secrets | Identifies your specific project |
| `NEXT_PUBLIC_OPENAI_API_KEY` | Vercel Env Vars | Used by your app at runtime |
| `NEXT_PUBLIC_ANTHROPIC_API_KEY` | Vercel Env Vars | Used by your app at runtime |
| `NEXT_PUBLIC_GEMINI_API_KEY` | Vercel Env Vars | Used by your app at runtime |
| `NEXT_PUBLIC_OLLAMA_API_KEY` | Vercel Env Vars | Used by your app at runtime |
| `NEXT_PUBLIC_OLLAMA_URL` | Vercel Env Vars | Used by your app at runtime |
| `NEXT_PUBLIC_OLLAMA_MODEL` | Vercel Env Vars | Used by your app at runtime |

## 🎯 Quick Checklist

- [ ] Created Vercel token
- [ ] Got Organization ID
- [ ] Got Project ID
- [ ] Added `VERCEL_TOKEN` to GitHub Secrets
- [ ] Added `VERCEL_ORG_ID` to GitHub Secrets
- [ ] Added `VERCEL_PROJECT_ID` to GitHub Secrets
- [ ] Added all `NEXT_PUBLIC_*` variables to Vercel
- [ ] Tested with a PR
- [ ] Verified preview deployment works
- [ ] Tested production deployment
- [ ] Celebrated! 🎉

## 🚀 You're All Set!

Once all secrets are added, your CI/CD pipeline is **fully active**!

Every time you push code:
- ✅ CI runs automatically
- ✅ Preview deployments for PRs
- ✅ Production deploys on merge
- ✅ Zero manual steps needed

Welcome to the future of automated DevOps! 🌟

---

**Need help?** Check the main guide: [CICD_SETUP.md](./CICD_SETUP.md)
